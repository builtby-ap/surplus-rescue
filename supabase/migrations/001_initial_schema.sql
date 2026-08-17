-- supabase/migrations/001_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  avatar_url TEXT,
  role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'business', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Businesses table
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  business_type VARCHAR(50) NOT NULL CHECK (business_type IN ('restaurant', 'cafe', 'bakery', 'grocery', 'fresh_market', 'snack_shop', 'convenience', 'producer')),
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone VARCHAR(20),
  email VARCHAR(255),
  logo_url TEXT,
  cover_image_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  commission_rate DECIMAL(5, 2) DEFAULT 12.5,
  offers_delivery BOOLEAN DEFAULT TRUE,
  offers_pickup BOOLEAN DEFAULT TRUE,
  delivery_radius_km DECIMAL(5, 2) DEFAULT 5.0,
  delivery_fee DECIMAL(10, 2) DEFAULT 0.00,
  minimum_order_for_delivery DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mystery bags table
CREATE TABLE mystery_bags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL CHECK (category IN ('mixed_meals', 'bakery', 'grocery', 'produce', 'snacks', 'beverages', 'desserts')),
  original_value DECIMAL(10, 2) NOT NULL,
  selling_price DECIMAL(10, 2) NOT NULL,
  quantity_available INTEGER NOT NULL DEFAULT 1,
  quantity_sold INTEGER DEFAULT 0,
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  available_from TIMESTAMP WITH TIME ZONE,
  available_until TIMESTAMP WITH TIME ZONE,
  pickup_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Time slots table
CREATE TABLE time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  max_orders INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  mystery_bag_id UUID REFERENCES mystery_bags(id) ON DELETE CASCADE,
  time_slot_id UUID REFERENCES time_slots(id),
  fulfillment_type VARCHAR(20) DEFAULT 'pickup' CHECK (fulfillment_type IN ('delivery', 'pickup')),
  status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'out_for_delivery', 'delivered', 'cancelled', 'refunded')),
  total_amount DECIMAL(10, 2) NOT NULL,
  delivery_fee DECIMAL(10, 2) DEFAULT 0.00,
  commission_amount DECIMAL(10, 2) NOT NULL,
  business_payout DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(20) DEFAULT 'cash_on_delivery',
  delivery_address TEXT,
  delivery_notes TEXT,
  special_requests TEXT,
  scheduled_pickup TIMESTAMP WITH TIME ZONE,
  picked_up_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Advertisements table
CREATE TABLE advertisements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  ad_type VARCHAR(20) NOT NULL CHECK (ad_type IN ('banner', 'carousel', 'featured')),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  link_url TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  cost DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Business documents table
CREATE TABLE business_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('business_license', 'food_safety_cert', 'insurance', 'health_permit')),
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Platform settings table
CREATE TABLE platform_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security Policies

-- Users: can only view/update their own profile
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Businesses: owners can manage their own, public can view active
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active businesses" ON businesses
  FOR SELECT USING (is_active = true);

CREATE POLICY "Business owners can manage own businesses" ON businesses
  FOR ALL USING (owner_id = auth.uid());

CREATE POLICY "Admins can manage all businesses" ON businesses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Mystery bags: public can view available, business owners can manage own
ALTER TABLE mystery_bags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view available mystery bags" ON mystery_bags
  FOR SELECT USING (is_available = true);

CREATE POLICY "Business owners can manage own mystery bags" ON mystery_bags
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid()
    )
  );

-- Time slots: business owners can manage own
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Business owners can manage own time slots" ON time_slots
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid()
    )
  );

-- Orders: customers view own, business owners view their orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own orders" ON orders
  FOR SELECT USING (customer_id = auth.uid());

CREATE POLICY "Business owners can view their orders" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all orders" ON orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Reviews: public can view, customers can create for their orders
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Customers can create reviews for their orders" ON reviews
  FOR INSERT WITH CHECK (
    customer_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM orders WHERE id = order_id AND customer_id = auth.uid() AND status = 'delivered'
    )
  );

-- Advertisements: public can view active, business owners can manage own
ALTER TABLE advertisements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active advertisements" ON advertisements
  FOR SELECT USING (is_active = true AND start_date <= NOW() AND end_date >= NOW());

CREATE POLICY "Business owners can manage own advertisements" ON advertisements
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid()
    )
  );

-- Business documents: business owners can manage own, admins can verify
ALTER TABLE business_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Business owners can view own documents" ON business_documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all documents" ON business_documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update documents" ON business_documents
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Notifications: users can view own
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- Platform settings: admins can manage
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage platform settings" ON platform_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
