import { useState, useEffect } from 'react';
import { supabaseServer } from '@/lib/supabase/server';
import { PreferenceRecord } from '@/types/profile';

export default function ProfilePage() {
  const [preferences, setPreferences] = useState<PreferenceRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      const { data, error } = await supabaseServer
        .from('user_preferences')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error; // no rows
      setPreferences(data ?? null);
      setLoading(false);
    };

    fetchPreferences();
  }, []);

  const handleSave = async (newPrefs: Partial<PreferenceRecord>) => {
    if (!preferences) return;
    const { data, error } = await supabaseServer
      .from('user_preferences')
      .upsert({ ...preferences, ...newPrefs })
      .single();

    if (error) throw error;
    setPreferences(data);
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Preferences</h1>
      <div className="space-y-4">
        {preferences && (
          <div>
            <p><strong>Theme:</strong> {preferences.theme}</p>
            <p><strong>Language:</strong> {preferences.language}</p>
            {/* Add more preference fields as needed */}
          </div>
        )}
        <button
          onClick={() => handleSave({ theme: 'dark', language: 'en' })}
          className="bg-primary-600 text-white px-4 py-2 rounded"
        >
          Apply Default Preferences
        </button>
      </div>
    </div>
  );
}
