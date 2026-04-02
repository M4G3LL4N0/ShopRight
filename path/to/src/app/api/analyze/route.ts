import { NextRequest } from '@vercel/next/server';
import { analyzeImage, generateRecommendations } from '../../lib/analyzer';
import { convertToBase64, validateImage } from '../../lib/image';
import { supabaseServer } from '@/lib/supabase/server';
import { ScanRecord } from '@/types/scan';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const venueType = formData.get('venueType') as string;
    const preferences = formData.get('preferences') as string | null;

    validateImage(file);
    const base64Image = await convertToBase64(file);

    const analysis = await analyzeImage(base64Image, venueType);
    const recommendations = await generateRecommendations(
      analysis.extractedItems.map(item => item.name),
      venueType
    );

    // Persist scan data
    const userId = request.headers.get('x-user-id') || null; // placeholder for auth
    const imageReference = `placeholder-${Date.now()}`; // future: store in storage

    const scanData: Omit<ScanRecord, 'id' | 'created_at'> = {
      user_id: userId,
      venue_type: venueType,
      extracted_items: analysis.extractedItems,
      recommendations: recommendations,
      image_reference: imageReference,
    };

    const { data: inserted, error } = await supabaseServer
      .from('scans')
      .insert(scanData)
      .select()
      .single();

    if (error) throw error;

    // Return response with full scan record including generated ID
    return new Response(
      JSON.stringify({
        ...inserted,
        extractedItems: analysis.extractedItems,
        recommendations,
        analyzedAt: new Date().toISOString(),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
