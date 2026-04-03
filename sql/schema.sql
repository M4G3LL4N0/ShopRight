-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- Create tables first
CREATE TABLE shopright.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE shopright.preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES shopright.users(id),
  likes_spicy BOOLEAN DEFAULT false,
  prefers_healthy BOOLEAN DEFAULT false,
  budget_level TEXT CHECK (budget_level IN ('low', 'medium', 'high')) DEFAULT 'medium',
  favorite_cuisines TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE shopright.scans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES shopright.users(id),
  image_url TEXT NOT NULL,
  extracted_items TEXT[] NOT NULL,
  recommendations JSONB NOT NULL,
  confidence NUMERIC(3, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create helper function for RLS first
CREATE OR REPLACE FUNCTION auth.uid() 
RETURNS UUID 
LANGUAGE SQL 
STABLE
AS $$
  SELECT NULLIF(current_setting('request.jwt.claim.sub', true), '')::UUID;
$$;

-- Enable RLS for all tables
ALTER TABLE shopright.scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopright.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopright.preferences ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can only access their own data" 
ON shopright.users 
FOR ALL 
USING (auth.uid() = id);

CREATE POLICY "Users can only access their own scans"
ON shopright.scans
FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own preferences"
ON shopright.preferences
FOR ALL
USING (auth.uid() = user_id);
RETURNS UUID 
LANGUAGE SQL 
STABLE
AS $$
  SELECT NULLIF(current_setting('request.jwt.claim.sub', true), '')::UUID;
$$;
