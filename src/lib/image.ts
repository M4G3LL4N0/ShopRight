const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

type ImageValidationError = {
  code: 'INVALID_TYPE' | 'INVALID_SIZE';
  message: string;
  details?: unknown;
};

export class ImageValidationError extends Error {
  code: string;

  constructor({ code, message }: ImageValidationError) {
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
      message: `Unsupported image type: ${file.type}`,
      details: {
        allowedTypes: ALLOWED_MIME_TYPES,
      },
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
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
