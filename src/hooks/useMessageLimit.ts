import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

const MESSAGE_LIMIT = 50;
const SESSION_STORAGE_KEY = 'mindful_chat_session_id';

interface MessageLimitState {
  messageCount: number;
  remainingMessages: number;
  isLimitReached: boolean;
  isLoading: boolean;
  incrementMessageCount: () => Promise<void>;
  resetSession: () => Promise<void>;
}

export const useMessageLimit = (): MessageLimitState => {
  const [messageCount, setMessageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string>('');

  const getOrCreateSessionId = useCallback(() => {
    let storedSessionId = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!storedSessionId) {
      storedSessionId = crypto.randomUUID();
      localStorage.setItem(SESSION_STORAGE_KEY, storedSessionId);
    }
    return storedSessionId;
  }, []);

  const loadSession = useCallback(async () => {
    try {
      setIsLoading(true);
      const sid = getOrCreateSessionId();
      setSessionId(sid);

      const { data, error } = await supabase
        .from('user_sessions')
        .select('message_count')
        .eq('session_id', sid)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading session:', error);
        return;
      }

      if (!data) {
        const { error: insertError } = await supabase
          .from('user_sessions')
          .insert({
            session_id: sid,
            message_count: 0,
            created_at: new Date().toISOString(),
            last_message_at: new Date().toISOString(),
          });

        if (insertError) {
          console.error('Error creating session:', insertError);
        }
        setMessageCount(0);
      } else {
        setMessageCount(data.message_count);
      }
    } catch (error) {
      console.error('Session load error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [getOrCreateSessionId]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const incrementMessageCount = useCallback(async () => {
    if (messageCount >= MESSAGE_LIMIT) {
      return;
    }

    const newCount = messageCount + 1;
    setMessageCount(newCount);

    try {
      const { error } = await supabase
        .from('user_sessions')
        .update({
          message_count: newCount,
          last_message_at: new Date().toISOString(),
          is_blocked: newCount >= MESSAGE_LIMIT,
        })
        .eq('session_id', sessionId);

      if (error) {
        console.error('Error updating message count:', error);
      }
    } catch (error) {
      console.error('Message count update error:', error);
    }
  }, [messageCount, sessionId]);

  const resetSession = useCallback(async () => {
    try {
      const { error } = await supabase
        .from('user_sessions')
        .update({
          message_count: 0,
          last_message_at: new Date().toISOString(),
          is_blocked: false,
        })
        .eq('session_id', sessionId);

      if (error) {
        console.error('Error resetting session:', error);
      } else {
        setMessageCount(0);
      }
    } catch (error) {
      console.error('Session reset error:', error);
    }
  }, [sessionId]);

  return {
    messageCount,
    remainingMessages: Math.max(0, MESSAGE_LIMIT - messageCount),
    isLimitReached: messageCount >= MESSAGE_LIMIT,
    isLoading,
    incrementMessageCount,
    resetSession,
  };
};
