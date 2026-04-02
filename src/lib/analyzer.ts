import { generateRecommendations, extractMenuItems } from './openai';

interface AnalysisResult {
  items: string[];
  confidence: number;
  rawText?: string;
}

export async function analyzeImage(file: File): Promise<AnalysisResult> {
  try {
    // Convert file to base64
    const base64Image = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    // Extract menu items using OpenAI Vision
    const { items, confidence, rawText } = await extractMenuItems(base64Image);
    
    // Validate extracted items
    if (items.length === 0) {
      throw new Error('No menu items detected');
    }

    return {
      items,
      confidence,
      rawText
    };
  } catch (error) {
    console.error('Analysis failed:', error);
    throw new Error('Failed to analyze menu image');
  }
}
