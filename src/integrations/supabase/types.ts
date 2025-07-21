export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          address_status: string | null
          assigned_customer_id: string | null
          clean_shift_days: number | null
          council: Database["public"]["Enums"]["council_enum"] | null
          created_at: string | null
          geocode_required: boolean | null
          id: string
          lat: number | null
          lng: number | null
          next_clean_date: string | null
          notes: string | null
          postcode: string
          potential_next_clean_date: string | null
          recycling_day: Database["public"]["Enums"]["weekday_enum"] | null
          recycling_week: number | null
          routing_zone_id: string | null
          state: string
          street_name: string
          street_number: string
          suburb: string
          unit_number: string | null
          updated_at: string | null
        }
        Insert: {
          address_status?: string | null
          assigned_customer_id?: string | null
          clean_shift_days?: number | null
          council?: Database["public"]["Enums"]["council_enum"] | null
          created_at?: string | null
          geocode_required?: boolean | null
          id?: string
          lat?: number | null
          lng?: number | null
          next_clean_date?: string | null
          notes?: string | null
          postcode: string
          potential_next_clean_date?: string | null
          recycling_day?: Database["public"]["Enums"]["weekday_enum"] | null
          recycling_week?: number | null
          routing_zone_id?: string | null
          state: string
          street_name: string
          street_number: string
          suburb: string
          unit_number?: string | null
          updated_at?: string | null
        }
        Update: {
          address_status?: string | null
          assigned_customer_id?: string | null
          clean_shift_days?: number | null
          council?: Database["public"]["Enums"]["council_enum"] | null
          created_at?: string | null
          geocode_required?: boolean | null
          id?: string
          lat?: number | null
          lng?: number | null
          next_clean_date?: string | null
          notes?: string | null
          postcode?: string
          potential_next_clean_date?: string | null
          recycling_day?: Database["public"]["Enums"]["weekday_enum"] | null
          recycling_week?: number | null
          routing_zone_id?: string | null
          state?: string
          street_name?: string
          street_number?: string
          suburb?: string
          unit_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_routing_zone_id_fkey"
            columns: ["routing_zone_id"]
            isOneToOne: false
            referencedRelation: "routing_zones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assigned_customer"
            columns: ["assigned_customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_log_entries: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          status: string | null
          tables_involved: string[] | null
          trigger_type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          status?: string | null
          tables_involved?: string[] | null
          trigger_type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: string | null
          tables_involved?: string[] | null
          trigger_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      bin_sizes: {
        Row: {
          bin_type: Database["public"]["Enums"]["bin_type_enum"]
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          bin_type?: Database["public"]["Enums"]["bin_type_enum"]
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          bin_type?: Database["public"]["Enums"]["bin_type_enum"]
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      communication_preferences: {
        Row: {
          customer_id: string
          failed_payment_email: boolean | null
          failed_payment_push: boolean | null
          failed_payment_sms: boolean | null
          invoice_email: boolean | null
          invoice_opt_out: boolean | null
          invoice_push: boolean | null
          invoice_sms: boolean | null
          missed_clean_email: boolean | null
          missed_clean_push: boolean | null
          missed_clean_sms: boolean | null
          overdue_invoice_email: boolean | null
          overdue_invoice_push: boolean | null
          overdue_invoice_sms: boolean | null
          reminder_email: boolean | null
          reminder_push: boolean | null
          reminder_sms: boolean | null
          rescheduled_clean_email: boolean | null
          rescheduled_clean_push: boolean | null
          rescheduled_clean_sms: boolean | null
          updated_at: string | null
        }
        Insert: {
          customer_id: string
          failed_payment_email?: boolean | null
          failed_payment_push?: boolean | null
          failed_payment_sms?: boolean | null
          invoice_email?: boolean | null
          invoice_opt_out?: boolean | null
          invoice_push?: boolean | null
          invoice_sms?: boolean | null
          missed_clean_email?: boolean | null
          missed_clean_push?: boolean | null
          missed_clean_sms?: boolean | null
          overdue_invoice_email?: boolean | null
          overdue_invoice_push?: boolean | null
          overdue_invoice_sms?: boolean | null
          reminder_email?: boolean | null
          reminder_push?: boolean | null
          reminder_sms?: boolean | null
          rescheduled_clean_email?: boolean | null
          rescheduled_clean_push?: boolean | null
          rescheduled_clean_sms?: boolean | null
          updated_at?: string | null
        }
        Update: {
          customer_id?: string
          failed_payment_email?: boolean | null
          failed_payment_push?: boolean | null
          failed_payment_sms?: boolean | null
          invoice_email?: boolean | null
          invoice_opt_out?: boolean | null
          invoice_push?: boolean | null
          invoice_sms?: boolean | null
          missed_clean_email?: boolean | null
          missed_clean_push?: boolean | null
          missed_clean_sms?: boolean | null
          overdue_invoice_email?: boolean | null
          overdue_invoice_push?: boolean | null
          overdue_invoice_sms?: boolean | null
          reminder_email?: boolean | null
          reminder_push?: boolean | null
          reminder_sms?: boolean | null
          rescheduled_clean_email?: boolean | null
          rescheduled_clean_push?: boolean | null
          rescheduled_clean_sms?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communication_preferences_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: true
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_complaints: {
        Row: {
          complaint_date: string | null
          created_at: string | null
          customer_id: string
          description: string
          employee_id: string | null
          id: string
          resolution_notes: string | null
          resolved: boolean | null
          service_history_id: string | null
        }
        Insert: {
          complaint_date?: string | null
          created_at?: string | null
          customer_id: string
          description: string
          employee_id?: string | null
          id?: string
          resolution_notes?: string | null
          resolved?: boolean | null
          service_history_id?: string | null
        }
        Update: {
          complaint_date?: string | null
          created_at?: string | null
          customer_id?: string
          description?: string
          employee_id?: string | null
          id?: string
          resolution_notes?: string | null
          resolved?: boolean | null
          service_history_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_complaints_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_complaints_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_feedback_photos: {
        Row: {
          caption: string | null
          complaint_id: string | null
          created_at: string | null
          id: string
          photo_url: string
          service_history_id: string | null
          uploaded_by: string | null
        }
        Insert: {
          caption?: string | null
          complaint_id?: string | null
          created_at?: string | null
          id?: string
          photo_url: string
          service_history_id?: string | null
          uploaded_by?: string | null
        }
        Update: {
          caption?: string | null
          complaint_id?: string | null
          created_at?: string | null
          id?: string
          photo_url?: string
          service_history_id?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_feedback_photos_complaint_id_fkey"
            columns: ["complaint_id"]
            isOneToOne: false
            referencedRelation: "customer_complaints"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          abn: string | null
          balance: number | null
          billing_address_id: string | null
          birthday: string | null
          business_name: string | null
          created_at: string | null
          credit_balance: number | null
          email: string | null
          first_clean_date: string | null
          first_name: string
          gocardless_id: string | null
          highlevel_contact_id: string | null
          id: string
          joined_date: string | null
          last_clean_date: string | null
          last_name: string
          lifetime_invoice_total: number | null
          lifetime_jobs: number | null
          lifetime_paid_total: number | null
          lifetime_value: number | null
          notes: string | null
          payment_method: string | null
          phone: string | null
          portal_link: string | null
          source: string | null
          status: Database["public"]["Enums"]["customer_status_enum"]
          stripe_id: string | null
          tags: Json | null
          updated_at: string | null
        }
        Insert: {
          abn?: string | null
          balance?: number | null
          billing_address_id?: string | null
          birthday?: string | null
          business_name?: string | null
          created_at?: string | null
          credit_balance?: number | null
          email?: string | null
          first_clean_date?: string | null
          first_name: string
          gocardless_id?: string | null
          highlevel_contact_id?: string | null
          id?: string
          joined_date?: string | null
          last_clean_date?: string | null
          last_name: string
          lifetime_invoice_total?: number | null
          lifetime_jobs?: number | null
          lifetime_paid_total?: number | null
          lifetime_value?: number | null
          notes?: string | null
          payment_method?: string | null
          phone?: string | null
          portal_link?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["customer_status_enum"]
          stripe_id?: string | null
          tags?: Json | null
          updated_at?: string | null
        }
        Update: {
          abn?: string | null
          balance?: number | null
          billing_address_id?: string | null
          birthday?: string | null
          business_name?: string | null
          created_at?: string | null
          credit_balance?: number | null
          email?: string | null
          first_clean_date?: string | null
          first_name?: string
          gocardless_id?: string | null
          highlevel_contact_id?: string | null
          id?: string
          joined_date?: string | null
          last_clean_date?: string | null
          last_name?: string
          lifetime_invoice_total?: number | null
          lifetime_jobs?: number | null
          lifetime_paid_total?: number | null
          lifetime_value?: number | null
          notes?: string | null
          payment_method?: string | null
          phone?: string | null
          portal_link?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["customer_status_enum"]
          stripe_id?: string | null
          tags?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      depots: {
        Row: {
          address: string | null
          created_at: string | null
          id: string
          lat: number
          lng: number
          name: string
          notes: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          id?: string
          lat: number
          lng: number
          name: string
          notes?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          id?: string
          lat?: number
          lng?: number
          name?: string
          notes?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      employee_commissions: {
        Row: {
          amount: number
          bin_count: number | null
          earned_date: string | null
          employee_id: string
          id: string
          notes: string | null
          paid: boolean | null
          pay_cycle_end: string
          pay_cycle_start: string
          payout_date: string | null
          referred_customer_id: string | null
          service_id: string | null
          type: string
        }
        Insert: {
          amount: number
          bin_count?: number | null
          earned_date?: string | null
          employee_id: string
          id?: string
          notes?: string | null
          paid?: boolean | null
          pay_cycle_end: string
          pay_cycle_start: string
          payout_date?: string | null
          referred_customer_id?: string | null
          service_id?: string | null
          type: string
        }
        Update: {
          amount?: number
          bin_count?: number | null
          earned_date?: string | null
          employee_id?: string
          id?: string
          notes?: string | null
          paid?: boolean | null
          pay_cycle_end?: string
          pay_cycle_start?: string
          payout_date?: string | null
          referred_customer_id?: string | null
          service_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_commissions_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_commissions_referred_customer_id_fkey"
            columns: ["referred_customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_commissions_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          active: boolean | null
          average_rating: number | null
          birthday: string | null
          created_at: string | null
          depot_id: string | null
          email: string | null
          employment_start_date: string | null
          employment_type: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          referral_code: string | null
          role: string | null
        }
        Insert: {
          active?: boolean | null
          average_rating?: number | null
          birthday?: string | null
          created_at?: string | null
          depot_id?: string | null
          email?: string | null
          employment_start_date?: string | null
          employment_type?: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          referral_code?: string | null
          role?: string | null
        }
        Update: {
          active?: boolean | null
          average_rating?: number | null
          birthday?: string | null
          created_at?: string | null
          depot_id?: string | null
          email?: string | null
          employment_start_date?: string | null
          employment_type?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          referral_code?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_depot_id_fkey"
            columns: ["depot_id"]
            isOneToOne: false
            referencedRelation: "depots"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string | null
          customer_id: string
          due_date: string | null
          external_invoice_id: string | null
          id: string
          issue_date: string
          notes: string | null
          payment_method_id: string | null
          reference: string | null
          service_id: string | null
          status: string | null
          total_amount: number
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          due_date?: string | null
          external_invoice_id?: string | null
          id?: string
          issue_date: string
          notes?: string | null
          payment_method_id?: string | null
          reference?: string | null
          service_id?: string | null
          status?: string | null
          total_amount: number
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          due_date?: string | null
          external_invoice_id?: string | null
          id?: string
          issue_date?: string
          notes?: string | null
          payment_method_id?: string | null
          reference?: string | null
          service_id?: string | null
          status?: string | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      known_addresses: {
        Row: {
          clean_shift_days: number | null
          council: Database["public"]["Enums"]["council_enum"] | null
          created_at: string | null
          id: string
          lat: number | null
          lng: number | null
          next_recycling_date: string | null
          postcode: string
          recycling_day: string | null
          recycling_week: number | null
          state: string
          street_name: string
          street_number: string
          suburb: string
          updated_at: string | null
        }
        Insert: {
          clean_shift_days?: number | null
          council?: Database["public"]["Enums"]["council_enum"] | null
          created_at?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          next_recycling_date?: string | null
          postcode: string
          recycling_day?: string | null
          recycling_week?: number | null
          state?: string
          street_name: string
          street_number: string
          suburb: string
          updated_at?: string | null
        }
        Update: {
          clean_shift_days?: number | null
          council?: Database["public"]["Enums"]["council_enum"] | null
          created_at?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          next_recycling_date?: string | null
          postcode?: string
          recycling_day?: string | null
          recycling_week?: number | null
          state?: string
          street_name?: string
          street_number?: string
          suburb?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string | null
          id: string
          method: string | null
          notes: string | null
          product_id: string
          quantity: number | null
          status: string
          supplier_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          method?: string | null
          notes?: string | null
          product_id: string
          quantity?: number | null
          status?: string
          supplier_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          method?: string | null
          notes?: string | null
          product_id?: string
          quantity?: number | null
          status?: string
          supplier_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          active: boolean | null
          created_at: string | null
          customer_id: string
          external_method_id: string | null
          id: string
          is_default: boolean | null
          label: string | null
          method_type: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          customer_id: string
          external_method_id?: string | null
          id?: string
          is_default?: boolean | null
          label?: string | null
          method_type: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          customer_id?: string
          external_method_id?: string | null
          id?: string
          is_default?: boolean | null
          label?: string | null
          method_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_methods_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          external_payment_id: string | null
          id: string
          invoice_id: string
          method: string | null
          payment_date: string | null
          reference: string | null
          status: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          external_payment_id?: string | null
          id?: string
          invoice_id: string
          method?: string | null
          payment_date?: string | null
          reference?: string | null
          status?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          external_payment_id?: string | null
          id?: string
          invoice_id?: string
          method?: string | null
          payment_date?: string | null
          reference?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_matrix: {
        Row: {
          bin_size_id: string | null
          created_at: string | null
          frequency_weeks: number
          id: string
          max_quantity: number | null
          min_quantity: number
          price_per_bin: number
        }
        Insert: {
          bin_size_id?: string | null
          created_at?: string | null
          frequency_weeks: number
          id?: string
          max_quantity?: number | null
          min_quantity: number
          price_per_bin: number
        }
        Update: {
          bin_size_id?: string | null
          created_at?: string | null
          frequency_weeks?: number
          id?: string
          max_quantity?: number | null
          min_quantity?: number
          price_per_bin?: number
        }
        Relationships: [
          {
            foreignKeyName: "pricing_matrix_bin_size_id_fkey"
            columns: ["bin_size_id"]
            isOneToOne: false
            referencedRelation: "bin_sizes"
            referencedColumns: ["id"]
          },
        ]
      }
      product_suppliers: {
        Row: {
          cost: number | null
          created_at: string | null
          id: string
          product_id: string
          purchase_method: Database["public"]["Enums"]["purchase_method"]
          supplier_id: string
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          id?: string
          product_id: string
          purchase_method: Database["public"]["Enums"]["purchase_method"]
          supplier_id: string
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          id?: string
          product_id?: string
          purchase_method?: Database["public"]["Enums"]["purchase_method"]
          supplier_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_suppliers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_suppliers_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          current_stock: number | null
          default_order_quantity: number | null
          id: string
          is_common: boolean | null
          name: string
          notes: string | null
          reorder_threshold: number | null
          sku: string | null
          stock_status: Database["public"]["Enums"]["stock_status"]
          unit_type: Database["public"]["Enums"]["unit_type_enum"] | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          current_stock?: number | null
          default_order_quantity?: number | null
          id?: string
          is_common?: boolean | null
          name: string
          notes?: string | null
          reorder_threshold?: number | null
          sku?: string | null
          stock_status?: Database["public"]["Enums"]["stock_status"]
          unit_type?: Database["public"]["Enums"]["unit_type_enum"] | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          current_stock?: number | null
          default_order_quantity?: number | null
          id?: string
          is_common?: boolean | null
          name?: string
          notes?: string | null
          reorder_threshold?: number | null
          sku?: string | null
          stock_status?: Database["public"]["Enums"]["stock_status"]
          unit_type?: Database["public"]["Enums"]["unit_type_enum"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      quotes: {
        Row: {
          bin_size_id: string
          created_at: string
          email: string
          frequency_weeks: number
          id: string
          name: string
          phone: string
          postcode: string
          price_per_bin: number
          quantity: number
          street_address: string
          suburb: string
          total_price: number
          updated_at: string
        }
        Insert: {
          bin_size_id: string
          created_at?: string
          email: string
          frequency_weeks: number
          id?: string
          name: string
          phone: string
          postcode: string
          price_per_bin: number
          quantity: number
          street_address: string
          suburb: string
          total_price: number
          updated_at?: string
        }
        Update: {
          bin_size_id?: string
          created_at?: string
          email?: string
          frequency_weeks?: number
          id?: string
          name?: string
          phone?: string
          postcode?: string
          price_per_bin?: number
          quantity?: number
          street_address?: string
          suburb?: string
          total_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quotes_bin_size_id_fkey"
            columns: ["bin_size_id"]
            isOneToOne: false
            referencedRelation: "bin_sizes"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          created_at: string | null
          id: string
          referral_code: string | null
          referred_id: string
          referrer_id: string
          reward_amount: number | null
          status: Database["public"]["Enums"]["referral_status_enum"] | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          referral_code?: string | null
          referred_id: string
          referrer_id: string
          reward_amount?: number | null
          status?: Database["public"]["Enums"]["referral_status_enum"] | null
        }
        Update: {
          created_at?: string | null
          id?: string
          referral_code?: string | null
          referred_id?: string
          referrer_id?: string
          reward_amount?: number | null
          status?: Database["public"]["Enums"]["referral_status_enum"] | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      refunds: {
        Row: {
          amount: number
          created_at: string | null
          external_refund_id: string | null
          id: string
          payment_id: string
          reason: string | null
          refund_date: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          external_refund_id?: string | null
          id?: string
          payment_id: string
          reason?: string | null
          refund_date?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          external_refund_id?: string | null
          id?: string
          payment_id?: string
          reason?: string | null
          refund_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "refunds_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      routing_zones: {
        Row: {
          active: boolean | null
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          active?: boolean | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          active?: boolean | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      scheduled_service_dates: {
        Row: {
          actual_date: string | null
          assigned_employee_id: string | null
          chargeable_skip: boolean | null
          created_at: string | null
          employee_id: string | null
          id: string
          invoice_id: string | null
          notes: string | null
          original_scheduled_date: string | null
          original_time_window:
            | Database["public"]["Enums"]["time_window_enum"]
            | null
          payment_status:
            | Database["public"]["Enums"]["payment_status_enum"]
            | null
          photo_url: string | null
          rating: number | null
          rating_comment: string | null
          requires_review: boolean | null
          reschedule_reason: string | null
          scheduled_date: string
          service_id: string
          skip_fault: Database["public"]["Enums"]["skip_fault_type_enum"] | null
          skip_reason_id: string | null
          status: Database["public"]["Enums"]["scheduled_status_enum"] | null
          time_window: Database["public"]["Enums"]["time_window_enum"] | null
          updated_at: string | null
        }
        Insert: {
          actual_date?: string | null
          assigned_employee_id?: string | null
          chargeable_skip?: boolean | null
          created_at?: string | null
          employee_id?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          original_scheduled_date?: string | null
          original_time_window?:
            | Database["public"]["Enums"]["time_window_enum"]
            | null
          payment_status?:
            | Database["public"]["Enums"]["payment_status_enum"]
            | null
          photo_url?: string | null
          rating?: number | null
          rating_comment?: string | null
          requires_review?: boolean | null
          reschedule_reason?: string | null
          scheduled_date: string
          service_id: string
          skip_fault?:
            | Database["public"]["Enums"]["skip_fault_type_enum"]
            | null
          skip_reason_id?: string | null
          status?: Database["public"]["Enums"]["scheduled_status_enum"] | null
          time_window?: Database["public"]["Enums"]["time_window_enum"] | null
          updated_at?: string | null
        }
        Update: {
          actual_date?: string | null
          assigned_employee_id?: string | null
          chargeable_skip?: boolean | null
          created_at?: string | null
          employee_id?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          original_scheduled_date?: string | null
          original_time_window?:
            | Database["public"]["Enums"]["time_window_enum"]
            | null
          payment_status?:
            | Database["public"]["Enums"]["payment_status_enum"]
            | null
          photo_url?: string | null
          rating?: number | null
          rating_comment?: string | null
          requires_review?: boolean | null
          reschedule_reason?: string | null
          scheduled_date?: string
          service_id?: string
          skip_fault?:
            | Database["public"]["Enums"]["skip_fault_type_enum"]
            | null
          skip_reason_id?: string | null
          status?: Database["public"]["Enums"]["scheduled_status_enum"] | null
          time_window?: Database["public"]["Enums"]["time_window_enum"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_service_dates_assigned_employee_id_fkey"
            columns: ["assigned_employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_service_dates_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_service_dates_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_service_dates_skip_reason_id_fkey"
            columns: ["skip_reason_id"]
            isOneToOne: false
            referencedRelation: "skip_reasons"
            referencedColumns: ["id"]
          },
        ]
      }
      service_bins: {
        Row: {
          bin_quantity: number
          bin_size_id: string
          created_at: string | null
          custom_price_per_bin: number | null
          id: string
          price_per_bin: number
          service_id: string
          timing_profile_id: string | null
          total_price: number | null
          updated_at: string | null
        }
        Insert: {
          bin_quantity: number
          bin_size_id: string
          created_at?: string | null
          custom_price_per_bin?: number | null
          id?: string
          price_per_bin: number
          service_id: string
          timing_profile_id?: string | null
          total_price?: number | null
          updated_at?: string | null
        }
        Update: {
          bin_quantity?: number
          bin_size_id?: string
          created_at?: string | null
          custom_price_per_bin?: number | null
          id?: string
          price_per_bin?: number
          service_id?: string
          timing_profile_id?: string | null
          total_price?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_bins_bin_size_id_fkey"
            columns: ["bin_size_id"]
            isOneToOne: false
            referencedRelation: "bin_sizes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_bins_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_bins_timing_profile_id_fkey"
            columns: ["timing_profile_id"]
            isOneToOne: false
            referencedRelation: "timing_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          active: boolean | null
          created_at: string | null
          customer_id: string
          frequency_weeks: number
          id: string
          last_clean_date: string | null
          last_clean_photo_url: string | null
          last_clean_reason: string | null
          last_clean_status: string | null
          next_clean_date: string | null
          potential_next_clean_date: string | null
          service_address_id: string
          special_notes: string | null
          start_date: string | null
          time_window: Database["public"]["Enums"]["time_window_enum"]
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          customer_id: string
          frequency_weeks: number
          id?: string
          last_clean_date?: string | null
          last_clean_photo_url?: string | null
          last_clean_reason?: string | null
          last_clean_status?: string | null
          next_clean_date?: string | null
          potential_next_clean_date?: string | null
          service_address_id: string
          special_notes?: string | null
          start_date?: string | null
          time_window?: Database["public"]["Enums"]["time_window_enum"]
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          customer_id?: string
          frequency_weeks?: number
          id?: string
          last_clean_date?: string | null
          last_clean_photo_url?: string | null
          last_clean_reason?: string | null
          last_clean_status?: string | null
          next_clean_date?: string | null
          potential_next_clean_date?: string | null
          service_address_id?: string
          special_notes?: string | null
          start_date?: string | null
          time_window?: Database["public"]["Enums"]["time_window_enum"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_service_address_id_fkey"
            columns: ["service_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
        ]
      }
      skip_reasons: {
        Row: {
          chargeable: boolean | null
          created_at: string | null
          fault_type: Database["public"]["Enums"]["skip_fault_type_enum"] | null
          id: string
          label: string
        }
        Insert: {
          chargeable?: boolean | null
          created_at?: string | null
          fault_type?:
            | Database["public"]["Enums"]["skip_fault_type_enum"]
            | null
          id?: string
          label: string
        }
        Update: {
          chargeable?: boolean | null
          created_at?: string | null
          fault_type?:
            | Database["public"]["Enums"]["skip_fault_type_enum"]
            | null
          id?: string
          label?: string
        }
        Relationships: []
      }
      sops: {
        Row: {
          content: string | null
          department: string | null
          id: string
          last_updated: string | null
          link_to_video: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_by_employee_id: string | null
        }
        Insert: {
          content?: string | null
          department?: string | null
          id?: string
          last_updated?: string | null
          link_to_video?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_by_employee_id?: string | null
        }
        Update: {
          content?: string | null
          department?: string | null
          id?: string
          last_updated?: string | null
          link_to_video?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_by_employee_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sops_updated_by_employee_id_fkey"
            columns: ["updated_by_employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
      stock_movements: {
        Row: {
          created_at: string | null
          id: string
          movement_type: string
          notes: string | null
          product_id: string
          quantity: number
          unit_cost: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          movement_type: string
          notes?: string | null
          product_id: string
          quantity: number
          unit_cost?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          movement_type?: string
          notes?: string | null
          product_id?: string
          quantity?: number
          unit_cost?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          cost: number | null
          created_at: string | null
          id: string
          purchase_method: Database["public"]["Enums"]["purchase_method"]
          store_address: string | null
          supplier_name: string
        }
        Insert: {
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: number | null
          created_at?: string | null
          id?: string
          purchase_method: Database["public"]["Enums"]["purchase_method"]
          store_address?: string | null
          supplier_name: string
        }
        Update: {
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          cost?: number | null
          created_at?: string | null
          id?: string
          purchase_method?: Database["public"]["Enums"]["purchase_method"]
          store_address?: string | null
          supplier_name?: string
        }
        Relationships: []
      }
      timing_profiles: {
        Row: {
          active: boolean | null
          base_time_minutes: number
          created_at: string | null
          id: string
          label: string
          notes: string | null
          time_per_bin_minutes: number
        }
        Insert: {
          active?: boolean | null
          base_time_minutes: number
          created_at?: string | null
          id?: string
          label: string
          notes?: string | null
          time_per_bin_minutes: number
        }
        Update: {
          active?: boolean | null
          base_time_minutes?: number
          created_at?: string | null
          id?: string
          label?: string
          notes?: string | null
          time_per_bin_minutes?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicle_maintenance_logs: {
        Row: {
          cost: number | null
          created_at: string | null
          description: string | null
          id: string
          maintenance_date: string
          next_due_date: string | null
          performed_by: string | null
          type: string | null
          vehicle_id: string
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          maintenance_date: string
          next_due_date?: string | null
          performed_by?: string | null
          type?: string | null
          vehicle_id: string
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          maintenance_date?: string
          next_due_date?: string | null
          performed_by?: string | null
          type?: string | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_maintenance_logs_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          make: string | null
          model: string | null
          name: string
          notes: string | null
          owned: boolean | null
          purchase_date: string | null
          purchase_price: number | null
          registration_number: string | null
          repayment_amount: number | null
          repayment_frequency: string | null
          vin: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          make?: string | null
          model?: string | null
          name: string
          notes?: string | null
          owned?: boolean | null
          purchase_date?: string | null
          purchase_price?: number | null
          registration_number?: string | null
          repayment_amount?: number | null
          repayment_frequency?: string | null
          vin?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          make?: string | null
          model?: string | null
          name?: string
          notes?: string | null
          owned?: boolean | null
          purchase_date?: string | null
          purchase_price?: number | null
          registration_number?: string | null
          repayment_amount?: number | null
          repayment_frequency?: string | null
          vin?: string | null
        }
        Relationships: []
      }
      webhook_test: {
        Row: {
          created_at: string | null
          id: string
          message: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
        }
        Relationships: []
      }
    }
    Views: {
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown | null
          f_table_catalog: unknown | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown | null
          f_table_catalog: string | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
      service_bins_with_estimates: {
        Row: {
          base_time_minutes: number | null
          bin_quantity: number | null
          bin_size_id: string | null
          created_at: string | null
          estimated_minutes: number | null
          service_bin_id: string | null
          service_id: string | null
          time_per_bin_minutes: number | null
          timing_profile_id: string | null
          timing_profile_label: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_bins_bin_size_id_fkey"
            columns: ["bin_size_id"]
            isOneToOne: false
            referencedRelation: "bin_sizes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_bins_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_bins_timing_profile_id_fkey"
            columns: ["timing_profile_id"]
            isOneToOne: false
            referencedRelation: "timing_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      view_user_roles: {
        Row: {
          role: Database["public"]["Enums"]["app_role"] | null
          user_id: string | null
        }
        Insert: {
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id?: string | null
        }
        Update: {
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: { oldname: string; newname: string; version: string }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: { tbl: unknown; col: string }
        Returns: unknown
      }
      _postgis_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_scripts_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_selectivity: {
        Args: { tbl: unknown; att_name: string; geom: unknown; mode?: string }
        Returns: number
      }
      _st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_bestsrid: {
        Args: { "": unknown }
        Returns: number
      }
      _st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_coveredby: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_covers: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_intersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      _st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      _st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_pointoutside: {
        Args: { "": unknown }
        Returns: unknown
      }
      _st_sortablehash: {
        Args: { geom: unknown }
        Returns: number
      }
      _st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          g1: unknown
          clip?: unknown
          tolerance?: number
          return_polygons?: boolean
        }
        Returns: unknown
      }
      _st_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      addauth: {
        Args: { "": string }
        Returns: boolean
      }
      addgeometrycolumn: {
        Args:
          | {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
              new_srid_in: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
          | {
              schema_name: string
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
          | {
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
        Returns: string
      }
      box: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box2d: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box2d_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2d_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2df_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2df_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3d: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box3d_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3d_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3dtobox: {
        Args: { "": unknown }
        Returns: unknown
      }
      bytea: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      bytea_to_text: {
        Args: { data: string }
        Returns: string
      }
      disablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      dropgeometrycolumn: {
        Args:
          | {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
            }
          | { schema_name: string; table_name: string; column_name: string }
          | { table_name: string; column_name: string }
        Returns: string
      }
      dropgeometrytable: {
        Args:
          | { catalog_name: string; schema_name: string; table_name: string }
          | { schema_name: string; table_name: string }
          | { table_name: string }
        Returns: string
      }
      enablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geography: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      geography_analyze: {
        Args: { "": unknown }
        Returns: boolean
      }
      geography_gist_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_gist_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_send: {
        Args: { "": unknown }
        Returns: string
      }
      geography_spgist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      geography_typmod_out: {
        Args: { "": number }
        Returns: unknown
      }
      geometry: {
        Args:
          | { "": string }
          | { "": string }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
        Returns: unknown
      }
      geometry_above: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_analyze: {
        Args: { "": unknown }
        Returns: boolean
      }
      geometry_below: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_cmp: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_contained_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_eq: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_ge: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_gist_compress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_decompress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_decompress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_sortsupport_2d: {
        Args: { "": unknown }
        Returns: undefined
      }
      geometry_gt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_hash: {
        Args: { "": unknown }
        Returns: number
      }
      geometry_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_le: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_left: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_lt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_overabove: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overleft: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overright: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_recv: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_right: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_send: {
        Args: { "": unknown }
        Returns: string
      }
      geometry_sortsupport: {
        Args: { "": unknown }
        Returns: undefined
      }
      geometry_spgist_compress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_spgist_compress_3d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_spgist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      geometry_typmod_out: {
        Args: { "": number }
        Returns: unknown
      }
      geometry_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometrytype: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      geomfromewkb: {
        Args: { "": string }
        Returns: unknown
      }
      geomfromewkt: {
        Args: { "": string }
        Returns: unknown
      }
      get_proj4_from_srid: {
        Args: { "": number }
        Returns: string
      }
      gettransactionid: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      gidx_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gidx_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete: {
        Args:
          | { uri: string }
          | { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_get: {
        Args: { uri: string } | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post: {
        Args:
          | { uri: string; content: string; content_type: string }
          | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_put: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      json: {
        Args: { "": unknown }
        Returns: Json
      }
      jsonb: {
        Args: { "": unknown }
        Returns: Json
      }
      longtransactionsenabled: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      path: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_asflatgeobuf_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asgeobuf_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asmvt_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asmvt_serialfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_geometry_clusterintersecting_finalfn: {
        Args: { "": unknown }
        Returns: unknown[]
      }
      pgis_geometry_clusterwithin_finalfn: {
        Args: { "": unknown }
        Returns: unknown[]
      }
      pgis_geometry_collect_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_makeline_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_polygonize_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_union_parallel_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_union_parallel_serialfn: {
        Args: { "": unknown }
        Returns: string
      }
      point: {
        Args: { "": unknown }
        Returns: unknown
      }
      polygon: {
        Args: { "": unknown }
        Returns: unknown
      }
      populate_geometry_columns: {
        Args:
          | { tbl_oid: unknown; use_typmod?: boolean }
          | { use_typmod?: boolean }
        Returns: number
      }
      postgis_addbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_constraint_dims: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: number
      }
      postgis_constraint_type: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: string
      }
      postgis_dropbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_extensions_upgrade: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_full_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_geos_noop: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_geos_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_getbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_hasbbox: {
        Args: { "": unknown }
        Returns: boolean
      }
      postgis_index_supportfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_lib_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_revision: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libjson_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_liblwgeom_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libprotobuf_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libxml_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_noop: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_proj_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_installed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_released: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_svn_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_type_name: {
        Args: {
          geomname: string
          coord_dimension: number
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_typmod_dims: {
        Args: { "": number }
        Returns: number
      }
      postgis_typmod_srid: {
        Args: { "": number }
        Returns: number
      }
      postgis_typmod_type: {
        Args: { "": number }
        Returns: string
      }
      postgis_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_wagyu_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      spheroid_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      spheroid_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_3dclosestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3ddistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_3dlength: {
        Args: { "": unknown }
        Returns: number
      }
      st_3dlongestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dperimeter: {
        Args: { "": unknown }
        Returns: number
      }
      st_3dshortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_addpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_angle: {
        Args:
          | { line1: unknown; line2: unknown }
          | { pt1: unknown; pt2: unknown; pt3: unknown; pt4?: unknown }
        Returns: number
      }
      st_area: {
        Args:
          | { "": string }
          | { "": unknown }
          | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_area2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_asbinary: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      st_asencodedpolyline: {
        Args: { geom: unknown; nprecision?: number }
        Returns: string
      }
      st_asewkb: {
        Args: { "": unknown }
        Returns: string
      }
      st_asewkt: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      st_asgeojson: {
        Args:
          | { "": string }
          | { geog: unknown; maxdecimaldigits?: number; options?: number }
          | { geom: unknown; maxdecimaldigits?: number; options?: number }
          | {
              r: Record<string, unknown>
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
            }
        Returns: string
      }
      st_asgml: {
        Args:
          | { "": string }
          | {
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
          | { geom: unknown; maxdecimaldigits?: number; options?: number }
          | {
              version: number
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
          | {
              version: number
              geom: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
        Returns: string
      }
      st_ashexewkb: {
        Args: { "": unknown }
        Returns: string
      }
      st_askml: {
        Args:
          | { "": string }
          | { geog: unknown; maxdecimaldigits?: number; nprefix?: string }
          | { geom: unknown; maxdecimaldigits?: number; nprefix?: string }
        Returns: string
      }
      st_aslatlontext: {
        Args: { geom: unknown; tmpl?: string }
        Returns: string
      }
      st_asmarc21: {
        Args: { geom: unknown; format?: string }
        Returns: string
      }
      st_asmvtgeom: {
        Args: {
          geom: unknown
          bounds: unknown
          extent?: number
          buffer?: number
          clip_geom?: boolean
        }
        Returns: unknown
      }
      st_assvg: {
        Args:
          | { "": string }
          | { geog: unknown; rel?: number; maxdecimaldigits?: number }
          | { geom: unknown; rel?: number; maxdecimaldigits?: number }
        Returns: string
      }
      st_astext: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      st_astwkb: {
        Args:
          | {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
          | {
              geom: unknown
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
        Returns: string
      }
      st_asx3d: {
        Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
        Returns: string
      }
      st_azimuth: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_boundary: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_boundingdiagonal: {
        Args: { geom: unknown; fits?: boolean }
        Returns: unknown
      }
      st_buffer: {
        Args:
          | { geom: unknown; radius: number; options?: string }
          | { geom: unknown; radius: number; quadsegs: number }
        Returns: unknown
      }
      st_buildarea: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_centroid: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      st_cleangeometry: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_clipbybox2d: {
        Args: { geom: unknown; box: unknown }
        Returns: unknown
      }
      st_closestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_clusterintersecting: {
        Args: { "": unknown[] }
        Returns: unknown[]
      }
      st_collect: {
        Args: { "": unknown[] } | { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_collectionextract: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_collectionhomogenize: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_concavehull: {
        Args: {
          param_geom: unknown
          param_pctconvex: number
          param_allow_holes?: boolean
        }
        Returns: unknown
      }
      st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_convexhull: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_coorddim: {
        Args: { geometry: unknown }
        Returns: number
      }
      st_coveredby: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_covers: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_curvetoline: {
        Args: { geom: unknown; tol?: number; toltype?: number; flags?: number }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: { g1: unknown; tolerance?: number; flags?: number }
        Returns: unknown
      }
      st_difference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_dimension: {
        Args: { "": unknown }
        Returns: number
      }
      st_disjoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_distance: {
        Args:
          | { geog1: unknown; geog2: unknown; use_spheroid?: boolean }
          | { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_distancesphere: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { geom1: unknown; geom2: unknown; radius: number }
        Returns: number
      }
      st_distancespheroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_dump: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumppoints: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumprings: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumpsegments: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      st_endpoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_envelope: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_expand: {
        Args:
          | { box: unknown; dx: number; dy: number }
          | { box: unknown; dx: number; dy: number; dz?: number }
          | { geom: unknown; dx: number; dy: number; dz?: number; dm?: number }
        Returns: unknown
      }
      st_exteriorring: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_flipcoordinates: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_force2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_force3d: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force3dm: {
        Args: { geom: unknown; mvalue?: number }
        Returns: unknown
      }
      st_force3dz: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force4d: {
        Args: { geom: unknown; zvalue?: number; mvalue?: number }
        Returns: unknown
      }
      st_forcecollection: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcecurve: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcepolygonccw: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcepolygoncw: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcerhr: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcesfs: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_generatepoints: {
        Args:
          | { area: unknown; npoints: number }
          | { area: unknown; npoints: number; seed: number }
        Returns: unknown
      }
      st_geogfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geogfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geographyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geohash: {
        Args:
          | { geog: unknown; maxchars?: number }
          | { geom: unknown; maxchars?: number }
        Returns: string
      }
      st_geomcollfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomcollfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geometricmedian: {
        Args: {
          g: unknown
          tolerance?: number
          max_iter?: number
          fail_if_not_converged?: boolean
        }
        Returns: unknown
      }
      st_geometryfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geometrytype: {
        Args: { "": unknown }
        Returns: string
      }
      st_geomfromewkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromewkt: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromgeojson: {
        Args: { "": Json } | { "": Json } | { "": string }
        Returns: unknown
      }
      st_geomfromgml: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromkml: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfrommarc21: {
        Args: { marc21xml: string }
        Returns: unknown
      }
      st_geomfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromtwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_gmltosql: {
        Args: { "": string }
        Returns: unknown
      }
      st_hasarc: {
        Args: { geometry: unknown }
        Returns: boolean
      }
      st_hausdorffdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_hexagon: {
        Args: { size: number; cell_i: number; cell_j: number; origin?: unknown }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: { size: number; bounds: unknown }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: { line: unknown; point: unknown }
        Returns: number
      }
      st_intersection: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_intersects: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_isclosed: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_iscollection: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isempty: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_ispolygonccw: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_ispolygoncw: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isring: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_issimple: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isvalid: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isvaliddetail: {
        Args: { geom: unknown; flags?: number }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
      }
      st_isvalidreason: {
        Args: { "": unknown }
        Returns: string
      }
      st_isvalidtrajectory: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_length: {
        Args:
          | { "": string }
          | { "": unknown }
          | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_length2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_letters: {
        Args: { letters: string; font?: Json }
        Returns: unknown
      }
      st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: { txtin: string; nprecision?: number }
        Returns: unknown
      }
      st_linefrommultipoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_linefromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_linefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_linelocatepoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_linemerge: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_linestringfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_linetocurve: {
        Args: { geometry: unknown }
        Returns: unknown
      }
      st_locatealong: {
        Args: { geometry: unknown; measure: number; leftrightoffset?: number }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          geometry: unknown
          frommeasure: number
          tomeasure: number
          leftrightoffset?: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: { geometry: unknown; fromelevation: number; toelevation: number }
        Returns: unknown
      }
      st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_m: {
        Args: { "": unknown }
        Returns: number
      }
      st_makebox2d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makeline: {
        Args: { "": unknown[] } | { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makepolygon: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_makevalid: {
        Args: { "": unknown } | { geom: unknown; params: string }
        Returns: unknown
      }
      st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_maximuminscribedcircle: {
        Args: { "": unknown }
        Returns: Record<string, unknown>
      }
      st_memsize: {
        Args: { "": unknown }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: { inputgeom: unknown; segs_per_quarter?: number }
        Returns: unknown
      }
      st_minimumboundingradius: {
        Args: { "": unknown }
        Returns: Record<string, unknown>
      }
      st_minimumclearance: {
        Args: { "": unknown }
        Returns: number
      }
      st_minimumclearanceline: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_mlinefromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mlinefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpolyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpolyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multi: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_multilinefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multilinestringfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipolyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipolygonfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_ndims: {
        Args: { "": unknown }
        Returns: number
      }
      st_node: {
        Args: { g: unknown }
        Returns: unknown
      }
      st_normalize: {
        Args: { geom: unknown }
        Returns: unknown
      }
      st_npoints: {
        Args: { "": unknown }
        Returns: number
      }
      st_nrings: {
        Args: { "": unknown }
        Returns: number
      }
      st_numgeometries: {
        Args: { "": unknown }
        Returns: number
      }
      st_numinteriorring: {
        Args: { "": unknown }
        Returns: number
      }
      st_numinteriorrings: {
        Args: { "": unknown }
        Returns: number
      }
      st_numpatches: {
        Args: { "": unknown }
        Returns: number
      }
      st_numpoints: {
        Args: { "": unknown }
        Returns: number
      }
      st_offsetcurve: {
        Args: { line: unknown; distance: number; params?: string }
        Returns: unknown
      }
      st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_orientedenvelope: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_perimeter: {
        Args: { "": unknown } | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_perimeter2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_pointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_pointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_pointm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointonsurface: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_points: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_polyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_polyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonize: {
        Args: { "": unknown[] }
        Returns: unknown
      }
      st_project: {
        Args: { geog: unknown; distance: number; azimuth: number }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_x: number
          prec_y?: number
          prec_z?: number
          prec_m?: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: { geom: unknown; gridsize: number }
        Returns: unknown
      }
      st_relate: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: string
      }
      st_removerepeatedpoints: {
        Args: { geom: unknown; tolerance?: number }
        Returns: unknown
      }
      st_reverse: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_segmentize: {
        Args: { geog: unknown; max_segment_length: number }
        Returns: unknown
      }
      st_setsrid: {
        Args: { geog: unknown; srid: number } | { geom: unknown; srid: number }
        Returns: unknown
      }
      st_sharedpaths: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_shiftlongitude: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_shortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: { geom: unknown; vertex_fraction: number; is_outer?: boolean }
        Returns: unknown
      }
      st_split: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_square: {
        Args: { size: number; cell_i: number; cell_j: number; origin?: unknown }
        Returns: unknown
      }
      st_squaregrid: {
        Args: { size: number; bounds: unknown }
        Returns: Record<string, unknown>[]
      }
      st_srid: {
        Args: { geog: unknown } | { geom: unknown }
        Returns: number
      }
      st_startpoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_subdivide: {
        Args: { geom: unknown; maxvertices?: number; gridsize?: number }
        Returns: unknown[]
      }
      st_summary: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      st_swapordinates: {
        Args: { geom: unknown; ords: unknown }
        Returns: unknown
      }
      st_symdifference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          zoom: number
          x: number
          y: number
          bounds?: unknown
          margin?: number
        }
        Returns: unknown
      }
      st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_transform: {
        Args:
          | { geom: unknown; from_proj: string; to_proj: string }
          | { geom: unknown; from_proj: string; to_srid: number }
          | { geom: unknown; to_proj: string }
        Returns: unknown
      }
      st_triangulatepolygon: {
        Args: { g1: unknown }
        Returns: unknown
      }
      st_union: {
        Args:
          | { "": unknown[] }
          | { geom1: unknown; geom2: unknown }
          | { geom1: unknown; geom2: unknown; gridsize: number }
        Returns: unknown
      }
      st_voronoilines: {
        Args: { g1: unknown; tolerance?: number; extend_to?: unknown }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: { g1: unknown; tolerance?: number; extend_to?: unknown }
        Returns: unknown
      }
      st_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_wkbtosql: {
        Args: { wkb: string }
        Returns: unknown
      }
      st_wkttosql: {
        Args: { "": string }
        Returns: unknown
      }
      st_wrapx: {
        Args: { geom: unknown; wrap: number; move: number }
        Returns: unknown
      }
      st_x: {
        Args: { "": unknown }
        Returns: number
      }
      st_xmax: {
        Args: { "": unknown }
        Returns: number
      }
      st_xmin: {
        Args: { "": unknown }
        Returns: number
      }
      st_y: {
        Args: { "": unknown }
        Returns: number
      }
      st_ymax: {
        Args: { "": unknown }
        Returns: number
      }
      st_ymin: {
        Args: { "": unknown }
        Returns: number
      }
      st_z: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmax: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmflag: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmin: {
        Args: { "": unknown }
        Returns: number
      }
      text: {
        Args: { "": unknown }
        Returns: string
      }
      text_to_bytea: {
        Args: { data: string }
        Returns: string
      }
      unlockrows: {
        Args: { "": string }
        Returns: number
      }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          schema_name: string
          table_name: string
          column_name: string
          new_srid_in: number
        }
        Returns: string
      }
      urlencode: {
        Args: { data: Json } | { string: string } | { string: string }
        Returns: string
      }
    }
    Enums: {
      app_role:
        | "staff"
        | "team_leader"
        | "bin_cleaner"
        | "bin_team_leader"
        | "admin_staff"
        | "admin_leader"
        | "owner"
      bin_type_enum: "plastic" | "steel"
      council_enum: "gold_coast" | "logan"
      customer_status_enum:
        | "active"
        | "paused"
        | "suspended"
        | "cancelled"
        | "blacklisted"
      payment_status_enum: "paid" | "unpaid" | "failed"
      purchase_method: "online" | "sms" | "email" | "in_store"
      referral_status_enum: "pending" | "earned" | "cancelled"
      scheduled_status_enum:
        | "scheduled"
        | "completed"
        | "skipped"
        | "cancelled"
        | "rescheduled_next_day"
      skip_fault_type_enum:
        | "customer"
        | "business"
        | "neutral"
        | "requires_review"
      stock_status: "full" | "low" | "ordered" | "delivered"
      time_window_enum:
        | "early_morning"
        | "late_morning"
        | "early_afternoon"
        | "late_afternoon"
        | "anytime"
      unit_type_enum:
        | "pair"
        | "litre"
        | "roll"
        | "bottle"
        | "packet"
        | "each"
        | "box"
        | "cloth"
      weekday_enum:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday"
    }
    CompositeTypes: {
      geometry_dump: {
        path: number[] | null
        geom: unknown | null
      }
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "staff",
        "team_leader",
        "bin_cleaner",
        "bin_team_leader",
        "admin_staff",
        "admin_leader",
        "owner",
      ],
      bin_type_enum: ["plastic", "steel"],
      council_enum: ["gold_coast", "logan"],
      customer_status_enum: [
        "active",
        "paused",
        "suspended",
        "cancelled",
        "blacklisted",
      ],
      payment_status_enum: ["paid", "unpaid", "failed"],
      purchase_method: ["online", "sms", "email", "in_store"],
      referral_status_enum: ["pending", "earned", "cancelled"],
      scheduled_status_enum: [
        "scheduled",
        "completed",
        "skipped",
        "cancelled",
        "rescheduled_next_day",
      ],
      skip_fault_type_enum: [
        "customer",
        "business",
        "neutral",
        "requires_review",
      ],
      stock_status: ["full", "low", "ordered", "delivered"],
      time_window_enum: [
        "early_morning",
        "late_morning",
        "early_afternoon",
        "late_afternoon",
        "anytime",
      ],
      unit_type_enum: [
        "pair",
        "litre",
        "roll",
        "bottle",
        "packet",
        "each",
        "box",
        "cloth",
      ],
      weekday_enum: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
    },
  },
} as const
