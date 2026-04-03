const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

export class ImageValidationError extends Error {
  code: string;

  constructor({ code, message }: { code: string; message: string }) {
    super(message);
    this.code = code;
  }
}

export function validateImage(file: File): void {
  if (file.size > MAX_FILE_SIZE) {
    throw new ImageValidationError({
      code: 'INVALID_SIZE',
      message: `Image size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`,
    });
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type as any)) {
    throw new ImageValidationError({
      code: 'INVALID_TYPE',
      message: `Unsupported image type: ${file.type}. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`,
    });
  }
}

export async function convertToBase64(file: File): Promise<string> {
  try {
    validateImage(file);
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
        } else {
          reject(new Error('Failed to read file data'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Image conversion failed', error);
    throw error;
  }
}
