// utils/watermark.js
export const addWatermark = (file, watermarkText = "MyBrand") => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Scale down very large images (optional: avoid 4000px+ uploads from mobile)
        const MAX_WIDTH = 1920;
        const scale = Math.min(1, MAX_WIDTH / img.width);

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Add watermark
        ctx.font = `${Math.floor(canvas.width / 20)}px Arial`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.fillText(watermarkText, canvas.width - 20, canvas.height - 20);

        // ✅ Always export as JPEG for Cloudinary
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const watermarkedFile = new File(
                [blob],
                file.name.replace(/\.\w+$/, ".jpg"),
                { type: "image/jpeg" }
              );
              resolve(watermarkedFile);
            } else {
              reject("Canvas conversion failed");
            }
          },
          "image/jpeg",
          0.8 // compression quality (0.8 = 80%)
        );
      };
      img.onerror = () => reject("Failed to load image");
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};
