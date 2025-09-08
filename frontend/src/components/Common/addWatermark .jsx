// utils/watermark.js
export const addWatermark = (file, watermarkText = "MyBrand") => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the uploaded image
        ctx.drawImage(img, 0, 0);

        // Add watermark text
        ctx.font = `${Math.floor(img.width / 20)}px Arial`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.fillText(watermarkText, img.width - 20, img.height - 20);

        // Detect original format
        const isJPEG = file.type === "image/jpeg" || file.name.toLowerCase().endsWith(".jpg");
        const mimeType = isJPEG ? "image/jpeg" : "image/png";

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const ext = isJPEG ? ".jpg" : ".png";
              const watermarkedFile = new File(
                [blob],
                file.name.replace(/\.\w+$/, ext),
                { type: mimeType }
              );
              resolve(watermarkedFile);
            } else {
              reject("Canvas conversion failed");
            }
          },
          mimeType,
          isJPEG ? 0.8 : 1.0 // compress JPEG to avoid large size
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};
