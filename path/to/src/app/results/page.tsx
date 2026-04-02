import { useParams } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase/server';
import { ScanRecord } from '@/types/scan';

export default function ResultsPage() {
  const { scanId } = useParams<{ scanId?: string }>();

  const [scan, setScan] = useState<ScanRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScan = async () => {
      if (!scanId) return;
      const { data, error } = await supabaseServer
        .from('scans')
        .select('*')
        .eq('id', scanId)
        .single();

      if (error) throw error;
      setScan(data as ScanRecord);
      setLoading(false);
    };

    fetchScan();
  }, [scanId]);

  if (loading) return <p className="text-center py-10">Loading results...</p>;

  if (!scan) return <p className="text-center">No results found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Scan Results</h1>
      <div className="space-y-4">
        <p><strong>Venue Type:</strong> {scan.venue_type}</p>
        <p><strong>Timestamp:</strong> {new Date(scan.created_at).toLocaleString()}</p>
        <h2 className="text-xl font-semibold">Top Recommendation</h2>
        <p>{scan.recommendations.best_item}</p>
        <p>{scan.recommendations.reasoning}</p>
        {/* Future: rehydrate UI from extractedItems and recommendations */}
      </div>
    </div>
  );
}
