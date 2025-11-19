// utils/watermark.js
export const addWatermark = (file, watermarkText = "**Corona Marine**") => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Optional: prevent ultra-high resolutions (mobile uploads)
        const MAX_WIDTH = 1920;
        const scale = Math.min(1, MAX_WIDTH / img.width);

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 🔥 WATERMARK SETTINGS
        const fontSize = canvas.width / 25;      // dynamic font size
        const opacity = 0.15;                    // watermark transparency
        const spacing = canvas.width / 4;        // spacing between watermarks
        const angle = -35 * (Math.PI / 180);     // diagonal angle

        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Apply rotation for diagonal pattern
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle);

        // Repetitive watermark pattern
        for (let x = -canvas.width; x < canvas.width; x += spacing) {
          for (let y = -canvas.height; y < canvas.height; y += spacing) {
            ctx.fillText(watermarkText, x, y);
          }
        }

        ctx.restore();

        // Export JPEG (cloud-friendly)
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject("Canvas export failed");

            const watermarkedFile = new File(
              [blob],
              file.name.replace(/\.\w+$/, ".jpg"),
              { type: "image/jpeg" }
            );

            resolve(watermarkedFile);
          },
          "image/jpeg",
          0.85
        );
      };

      img.onerror = () => reject("Failed to load image");
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
};
