export function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]); // Return just the base64 data part
        } else {
          reject(new Error('Failed to read file as base64'));
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    } catch (error) {
      reject(new Error(`Failed to convert file to base64: ${error instanceof Error ? error.message : 'Unknown error'}`));
    }
  });
}

export function validateImage(file: File): void {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (file.size > maxSize) {
    throw new Error('Image size exceeds 5MB limit');
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error(`Unsupported image type: ${file.type}. Allowed types: ${allowedTypes.join(', ')}`);
  }
}
