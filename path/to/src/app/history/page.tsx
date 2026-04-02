import { useEffect, useState } from 'react';
import { supabaseServer } from '@/lib/supabase/server';
import { ScanRecord } from '@/types/scan';

export default function HistoryPage() {
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScans = async () => {
      const { data, error } = await supabaseServer
        .from('scans')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setScans(data ?? []);
      setLoading(false);
    };

    fetchScans();
  }, []);

  if (loading) return <p className="text-center py-10">Loading history...</p>;

  if (scans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-500">No scans yet. Start by uploading an image.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Scan History</h1>
      <div className="space-y-6">
        {scans.map((scan) => (
          <div key={scan.id} className=" GlassCard p-4 rounded-lg shadow-sm">
            <div className="flex flex-col mb-2">
              <p className="text-sm text-gray-500">Venue: {scan.venue_type}</p>
              <p className="text-sm text-gray-500">
                {new Date(scan.created_at).toLocaleString()}
              </p>
            </div>
            <p className="text-sm font-medium mb-1">{scan.summary}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xs px-2 py-1 bg-primary-100 text-primary-800 rounded">
                {scan.recommendations.best_item}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
