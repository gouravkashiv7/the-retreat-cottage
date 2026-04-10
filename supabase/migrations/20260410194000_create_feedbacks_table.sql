CREATE TABLE IF NOT EXISTS feedbacks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    guest_id INTEGER REFERENCES guests(id) ON DELETE CASCADE
);

ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow everyone to select feedback" ON feedbacks
    FOR SELECT USING (true);

CREATE POLICY "Allow guests to insert their own feedback" ON feedbacks
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
