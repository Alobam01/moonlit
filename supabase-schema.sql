-- Supabase Database Schema for Purrfect Haven
-- Run this SQL in your Supabase SQL Editor (Dashboard > SQL Editor)

-- Create breeds table
CREATE TABLE IF NOT EXISTS breeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create kittens table
CREATE TABLE IF NOT EXISTS kittens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  breed TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  age_weeks INTEGER,
  price NUMERIC(10, 2),
  description TEXT,
  main_image_url TEXT NOT NULL,
  extra_image_urls JSONB DEFAULT '[]'::jsonb,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create inquiries table (for contact form submissions)
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  breed_interest TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  avatar TEXT,
  kitten_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on kittens for faster queries
CREATE INDEX IF NOT EXISTS idx_kittens_breed ON kittens(breed);
CREATE INDEX IF NOT EXISTS idx_kittens_is_available ON kittens(is_available);
CREATE INDEX IF NOT EXISTS idx_kittens_created_at ON kittens(created_at DESC);

-- Create index on inquiries
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);

-- Create index on testimonials
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at DESC);

-- Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE breeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE kittens ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (kittens and breeds are public)
CREATE POLICY "Allow public read access to breeds" ON breeds
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to kittens" ON kittens
  FOR SELECT USING (true);

-- Create policy for inserting inquiries (anyone can submit contact form)
CREATE POLICY "Allow public insert to inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- Create policies for testimonials (public read, admin write)
CREATE POLICY "Allow public read access to testimonials" ON testimonials
  FOR SELECT USING (true);

-- Optional: Insert some sample breeds (you can delete this if you want to add them via admin)
INSERT INTO breeds (name, description) VALUES
  ('Ragdoll', 'Known for their docile temperament and affectionate nature, Ragdolls are perfect family companions.'),
  ('Persian', 'Elegant and gentle, Persians are calm indoor cats with luxurious long coats.'),
  ('British Shorthair', 'Easygoing and loyal, British Shorthairs are known for their plush coats and round faces.'),
  ('Maine Coon', 'Gentle giants with friendly personalities and impressive size.'),
  ('Scottish Fold', 'Distinctive folded ears and sweet, owl-like appearance with a loving temperament.')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- ADMIN AUTHENTICATION SETUP
-- ============================================
-- 
-- To create an admin user:
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add user" > "Create new user"
-- 3. Enter email and password for your admin account
-- 4. Click "Create user"
-- 
-- The admin login page is at: /auth/login
-- All /admin/* routes are protected and require authentication
-- 
-- Create admin_users table to restrict admin access to specific emails
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can read admin_users (to check if they're admin)
CREATE POLICY "Allow authenticated users to read admin_users" ON admin_users
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies for admin write access to kittens
CREATE POLICY "Allow admin insert to kittens" ON kittens
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Allow admin update to kittens" ON kittens
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Allow admin delete to kittens" ON kittens
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- Create policies for admin write access to breeds
CREATE POLICY "Allow admin insert to breeds" ON breeds
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Allow admin update to breeds" ON breeds
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Allow admin delete to breeds" ON breeds
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- Create policy for admin read access to inquiries
CREATE POLICY "Allow admin read access to inquiries" ON inquiries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- Create policies for admin write access to testimonials
CREATE POLICY "Allow admin insert to testimonials" ON testimonials
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Allow admin update to testimonials" ON testimonials
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Allow admin delete to testimonials" ON testimonials
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- ============================================
-- SETUP INSTRUCTIONS
-- ============================================
-- 
-- 1. Create an admin user in Supabase Dashboard:
--    - Go to Authentication > Users
--    - Click "Add user" > "Create new user"
--    - Enter email and password for your admin account
--    - Click "Create user"
-- 
-- 2. Insert your admin email into admin_users table:
--    INSERT INTO admin_users (email) VALUES ('your-admin@email.com');
-- 
-- 3. The admin login page is at: /auth/login
--    All /admin/* routes are protected and require authentication
-- 
-- 4. Admin users can:
--    - Create, update, and delete kittens
--    - Create, update, and delete breeds
--    - View all inquiries submitted through the contact form
--    - Create, update, and delete testimonials