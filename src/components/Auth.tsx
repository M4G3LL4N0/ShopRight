'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function Auth() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      setMessage('Check your email for the login link!');
    } catch (error) {
      setMessage('Error sending login link');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          // Create or update user profile
          const { data: user } = await supabase
            .from('users')
            .upsert({
              id: session?.user.id,
              email: session?.user.email,
              last_login: new Date()
            })
            .select()
            .single();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800/50 backdrop-blur-lg rounded-2xl p-4 border border-gray-700/20">
      <div className="flex items-center space-x-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="bg-gray-700/50 text-white rounded-lg px-3 py-1 text-sm"
        />
        <button
          onClick={() => handleLogin(email)}
          disabled={loading}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:from-indigo-700 hover:to-purple-700 transition-all"
        >
          {loading ? 'Sending...' : 'Login'}
        </button>
      </div>
      {message && <p className="text-sm text-gray-300 mt-2">{message}</p>}
    </div>
  );
}
