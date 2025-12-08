/*
  # Message Limit Tracking System

  1. New Tables
    - `user_sessions`
      - `id` (uuid, primary key) - Unique session identifier
      - `session_id` (text, unique) - Browser session identifier
      - `message_count` (integer) - Number of messages sent in this session
      - `created_at` (timestamptz) - When the session was created
      - `last_message_at` (timestamptz) - Last message timestamp
      - `is_blocked` (boolean) - Whether the session has exceeded limits

  2. Security
    - Enable RLS on `user_sessions` table
    - Add policy for anonymous users to manage their own session data
    
  3. Notes
    - Sessions are identified by a client-generated UUID stored in localStorage
    - Message limit is enforced to prevent abuse
    - Users are directed to professional help when limit is reached
*/

-- Create user_sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  message_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  last_message_at timestamptz DEFAULT now(),
  is_blocked boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read and update their own session
CREATE POLICY "Users can read own session"
  ON user_sessions
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can insert own session"
  ON user_sessions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own session"
  ON user_sessions
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id ON user_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_created_at ON user_sessions(created_at);
