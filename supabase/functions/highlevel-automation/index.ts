import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

interface HighLevelContact {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
}

interface AutomationRequest {
  product_id: string;
  product_name: string;
  current_stock: number;
  threshold: number;
  supplier_id: string;
  supplier_name: string;
  contact_email?: string;
  contact_phone?: string;
  purchase_method: 'email' | 'sms';
  default_order_quantity?: number;
}

async function getValidToken(): Promise<string | null> {
  const { data: tokenData, error } = await supabase
    .from('oauth_tokens')
    .select('*')
    .eq('provider', 'highlevel')
    .single();

  if (error || !tokenData) {
    console.error('No HighLevel token found:', error);
    return null;
  }

  // Check if token is expired
  const now = new Date();
  const expiresAt = new Date(tokenData.expires_at);
  
  if (now >= expiresAt && tokenData.refresh_token) {
    // Token is expired, refresh it
    console.log('Token expired, refreshing...');
    
    const refreshResponse = await fetch('https://services.leadconnectorhq.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: Deno.env.get('HIGHLEVEL_CLIENT_ID')!,
        client_secret: Deno.env.get('HIGHLEVEL_CLIENT_SECRET')!,
        refresh_token: tokenData.refresh_token,
      }),
    });

    if (!refreshResponse.ok) {
      console.error('Token refresh failed');
      return null;
    }

    const newTokenData = await refreshResponse.json();
    const newExpiresAt = new Date(Date.now() + newTokenData.expires_in * 1000);

    // Update token in database
    await supabase
      .from('oauth_tokens')
      .update({
        access_token: newTokenData.access_token,
        refresh_token: newTokenData.refresh_token || tokenData.refresh_token,
        expires_at: newExpiresAt.toISOString(),
      })
      .eq('id', tokenData.id);

    return newTokenData.access_token;
  }

  return tokenData.access_token;
}

async function createOrUpdateContact(contactInfo: HighLevelContact, accessToken: string): Promise<string | null> {
  try {
    // First, try to find existing contact by email or phone
    let contactId = null;
    
    if (contactInfo.email) {
      const searchResponse = await fetch(`https://services.leadconnectorhq.com/contacts/search/duplicate?email=${encodeURIComponent(contactInfo.email)}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        if (searchData.contact) {
          contactId = searchData.contact.id;
        }
      }
    }

    if (!contactId && contactInfo.phone) {
      const searchResponse = await fetch(`https://services.leadconnectorhq.com/contacts/search/duplicate?phone=${encodeURIComponent(contactInfo.phone)}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        if (searchData.contact) {
          contactId = searchData.contact.id;
        }
      }
    }

    if (contactId) {
      // Update existing contact
      const updateResponse = await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactInfo),
      });

      if (updateResponse.ok) {
        return contactId;
      }
    } else {
      // Create new contact
      const createResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactInfo),
      });

      if (createResponse.ok) {
        const createData = await createResponse.json();
        return createData.contact.id;
      }
    }

    return null;
  } catch (error) {
    console.error('Error managing contact:', error);
    return null;
  }
}

async function sendEmail(contactId: string, subject: string, message: string, accessToken: string): Promise<boolean> {
  try {
    const response = await fetch('https://services.leadconnectorhq.com/conversations/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'Email',
        contactId: contactId,
        subject: subject,
        message: message,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

async function sendSMS(contactId: string, message: string, accessToken: string): Promise<boolean> {
  try {
    const response = await fetch('https://services.leadconnectorhq.com/conversations/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'SMS',
        contactId: contactId,
        message: message,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const automationData: AutomationRequest = await req.json();
    console.log('Processing automation request:', automationData);

    // Check if automation is enabled
    const { data: settings } = await supabase
      .from('automation_settings')
      .select('*')
      .eq('automation_type', 'low_stock_reorder')
      .single();

    if (!settings || !settings.enabled) {
      console.log('Automation is disabled');
      return new Response(JSON.stringify({ message: 'Automation is disabled' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get valid access token
    const accessToken = await getValidToken();
    if (!accessToken) {
      console.error('No valid HighLevel token available');
      return new Response(JSON.stringify({ error: 'HighLevel integration not configured' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prepare contact information
    const contactInfo: HighLevelContact = {
      firstName: automationData.supplier_name.split(' ')[0],
      lastName: automationData.supplier_name.split(' ').slice(1).join(' ') || '',
      email: automationData.contact_email,
      phone: automationData.contact_phone,
      companyName: automationData.supplier_name,
    };

    // Create or update contact in HighLevel
    const contactId = await createOrUpdateContact(contactInfo, accessToken);
    if (!contactId) {
      console.error('Failed to create/update contact in HighLevel');
      return new Response(JSON.stringify({ error: 'Failed to manage contact' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prepare message content
    const templates = settings.settings || {};
    let success = false;

    if (automationData.purchase_method === 'email' && automationData.contact_email) {
      const emailTemplate = templates.default_email_template || 'We need to reorder {product_name}. Current stock: {current_stock}, Threshold: {threshold}';
      const subject = `Stock Reorder Request - ${automationData.product_name}`;
      const message = emailTemplate
        .replace('{product_name}', automationData.product_name)
        .replace('{current_stock}', automationData.current_stock.toString())
        .replace('{threshold}', automationData.threshold.toString())
        .replace('{supplier_name}', automationData.supplier_name)
        .replace('{default_order_quantity}', (automationData.default_order_quantity || 10).toString());

      success = await sendEmail(contactId, subject, message, accessToken);
      console.log('Email sent:', success);

    } else if (automationData.purchase_method === 'sms' && automationData.contact_phone) {
      const smsTemplate = templates.default_sms_template || 'REORDER ALERT: {product_name} - Stock: {current_stock}/{threshold}';
      const message = smsTemplate
        .replace('{product_name}', automationData.product_name)
        .replace('{current_stock}', automationData.current_stock.toString())
        .replace('{threshold}', automationData.threshold.toString())
        .replace('{supplier_name}', automationData.supplier_name)
        .replace('{default_order_quantity}', (automationData.default_order_quantity || 10).toString());

      success = await sendSMS(contactId, message, accessToken);
      console.log('SMS sent:', success);
    }

    if (success) {
      // Update automation log
      await supabase
        .from('automation_log_entries')
        .update({ status: 'completed' })
        .match({
          description: `Product ${automationData.product_name} is low on stock (${automationData.current_stock} remaining, threshold: ${automationData.threshold})`,
          status: 'pending'
        });

      return new Response(JSON.stringify({ message: 'Automation completed successfully' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      // Update automation log with error
      await supabase
        .from('automation_log_entries')
        .update({ status: 'failed' })
        .match({
          description: `Product ${automationData.product_name} is low on stock (${automationData.current_stock} remaining, threshold: ${automationData.threshold})`,
          status: 'pending'
        });

      return new Response(JSON.stringify({ error: 'Failed to send notification' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});