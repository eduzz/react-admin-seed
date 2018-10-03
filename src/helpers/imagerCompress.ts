export default function imageCompress(imageBase64: string, width: number, height: number) {
  return new Promise<Blob>(resolve => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;

      const insideCanvas = document.createElement('canvas');
      const insideContext = insideCanvas.getContext('2d');
      insideCanvas.width = width;
      insideCanvas.height = height;

      insideContext.drawImage(img, 0, 0, insideCanvas.width, insideCanvas.height);
      context.drawImage(insideCanvas, 0, 0, insideCanvas.width, insideCanvas.height, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => resolve(blob));
    };

    img.src = imageBase64;
  });
}