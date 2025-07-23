import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const highlevelClientId = Deno.env.get('HIGHLEVEL_CLIENT_ID')!;
const highlevelClientSecret = Deno.env.get('HIGHLEVEL_CLIENT_SECRET')!;
const highlevelRedirectUri = Deno.env.get('HIGHLEVEL_REDIRECT_URI')!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      return new Response(JSON.stringify({ error: 'OAuth authorization failed' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!code) {
      return new Response(JSON.stringify({ error: 'Authorization code not found' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://services.leadconnectorhq.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: highlevelClientId,
        client_secret: highlevelClientSecret,
        code: code,
        redirect_uri: highlevelRedirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token exchange failed:', errorText);
      return new Response(JSON.stringify({ error: 'Token exchange failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const tokenData = await tokenResponse.json();
    console.log('Token exchange successful');

    // Calculate expiration time
    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);

    // Store tokens in database
    const { error: dbError } = await supabase
      .from('oauth_tokens')
      .upsert({
        provider: 'highlevel',
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_at: expiresAt.toISOString(),
        token_type: tokenData.token_type || 'Bearer',
        scope: tokenData.scope,
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(JSON.stringify({ error: 'Failed to store tokens' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize automation settings
    const { error: settingsError } = await supabase
      .from('automation_settings')
      .upsert({
        automation_type: 'low_stock_reorder',
        enabled: true,
        settings: {
          default_email_template: 'We need to reorder {product_name}. Current stock: {current_stock}, Threshold: {threshold}',
          default_sms_template: 'REORDER ALERT: {product_name} - Stock: {current_stock}/{threshold}'
        }
      });

    if (settingsError) {
      console.error('Settings error:', settingsError);
    }

    // Return success response with redirect
    return new Response(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>OAuth Success</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .success { color: green; }
          .button { background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1 class="success">✅ HighLevel Integration Successful!</h1>
        <p>Your HighLevel account has been connected successfully.</p>
        <p>Low stock automation is now enabled.</p>
        <a href="/" class="button">Return to App</a>
        <script>
          // Auto-close if opened in popup
          if (window.opener) {
            window.opener.postMessage({ type: 'oauth_success' }, '*');
            window.close();
          } else {
            // Redirect after 3 seconds
            setTimeout(() => {
              window.location.href = '/';
            }, 3000);
          }
        </script>
      </body>
      </html>
    `, {
      headers: { ...corsHeaders, 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});