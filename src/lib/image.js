/**
 * Downscale a user-picked image to a small square data URL.
 * Avatars live in localStorage, which caps out around 5MB per origin, so a
 * raw phone photo would blow the whole budget on one comment.
 */
export function fileToAvatar(file, size = 96) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    if (!file.type.startsWith('image/')) {
      return reject(new Error('That file is not an image.'));
    }
    if (file.size > 8 * 1024 * 1024) {
      return reject(new Error('Image is larger than 8MB.'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read that file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not decode that image.'));
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // cover-crop to a square so avatars never stretch
        const scale = Math.max(size / img.width, size / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);

        resolve(canvas.toDataURL('image/jpeg', 0.78));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
