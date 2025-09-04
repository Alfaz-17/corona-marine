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

        canvas.toBlob((blob) => {
          if (blob) {
            const watermarkedFile = new File([blob], file.name, { type: "image/png" });
            resolve(watermarkedFile);
          } else {
            reject("Canvas conversion failed");
          }
        }, "image/png");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};
