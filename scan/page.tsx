import { useState, useEffect } from 'react';
import { useStore } from '../../store/useScanStore';
import { useRouter } from 'next/router';

export default function ScanPage() {
  const { setImage, setVenueType, startAnalysis } = useStore();
  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await setImage(file);
      await startAnalysis();
      router.push('/results');
    } catch (error) {
      alert(`Image upload failed: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Upload Image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="border border-gray-300 p-4 rounded-lg"
      />
      <div className="mt-8">
        <p>Supported venues: Restaurant, Bar, Grocery, Retail, Electronics</p>
        <p>Max file size: 5MB</p>
      </div>
    </div>
  );
}
