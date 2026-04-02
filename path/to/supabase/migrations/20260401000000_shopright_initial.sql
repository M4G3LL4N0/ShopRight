-- ShopRight Initial Schema Migration
-- Run against the 'shopright' schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create shopright schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS shopright;

-- Scans table: stores user scan history
CREATE TABLE shopright.scans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    venue_type VARCHAR(50) NOT NULL CHECK (venue_type IN ('restaurant', 'bar', 'grocery', 'retail', 'electronics')),
    extracted_items JSONB NOT NULL DEFAULT '[]',
    recommendations JSONB NOT NULL DEFAULT '{}',
    image_reference VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User preferences table: stores user settings
CREATE TABLE shopright.user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    theme VARCHAR(20) NOT NULL DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'system')),
    language VARCHAR(10) NOT NULL DEFAULT 'en',
    notification_enabled BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_scans_user_id ON shopright.scans(user_id);
CREATE INDEX idx_scans_created_at ON shopright.scans(created_at DESC);
CREATE INDEX idx_scans_venue_type ON shopright.scans(venue_type);
CREATE INDEX idx_user_preferences_user_id ON shopright.user_preferences(user_id);

-- Row Level Security (RLS) - scans table
ALTER TABLE shopright.scans ENABLE ROW LEVEL SECURITY;

-- Users can view their own scans
CREATE POLICY "Users can view own scans" ON shopright.scans
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

-- Users can insert their own scans
CREATE POLICY "Users can insert own scans" ON shopright.scans
    FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Users can update their own scans
CREATE POLICY "Users can update own scans" ON shopright.scans
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own scans
CREATE POLICY "Users can delete own scans" ON shopright.scans
    FOR DELETE USING (auth.uid() = user_id);

-- Row Level Security (RLS) - user_preferences table
ALTER TABLE shopright.user_preferences ENABLE ROW LEVEL SECURITY;

-- Users can view their own preferences
CREATE POLICY "Users can view own preferences" ON shopright.user_preferences
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own preferences
CREATE POLICY "Users can insert own preferences" ON shopright.user_preferences
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own preferences
CREATE POLICY "Users can update own preferences" ON shopright.user_preferences
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own preferences
CREATE POLICY "Users can delete own preferences" ON shopright.user_preferences
    FOR DELETE USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION shopright.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_scans_updated_at BEFORE UPDATE ON shopright.scans
    FOR EACH ROW EXECUTE FUNCTION shopright.update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON shopright.user_preferences
    FOR EACH ROW EXECUTE FUNCTION shopright.update_updated_at_column();

-- Grant necessary permissions to service role (for server-side operations)
GRANT USAGE ON SCHEMA shopright TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA shopright TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA shopright TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA shopright TO service_role;
