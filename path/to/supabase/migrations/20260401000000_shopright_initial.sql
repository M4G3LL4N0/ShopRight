-- Create indexes for faster scans
CREATE INDEX idx_user_preferences_user_id ON shopright.scans(user_id);

-- Enable row-level security for scans table
ALTER TABLE shopright.scans ENABLE ROW LEVEL SECURITY;

-- Policy for viewing own scans
CREATE POLICY "view_own_scans" ON shopright.scans USING user_id = user_id;

-- Additional policies for inserts/updates (adjust as needed)
CREATE POLICY "insert_own_scans" ON shopright.user_preferences USING user_id = user_id;
