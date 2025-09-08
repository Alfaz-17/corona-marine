export const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "corona"); // must exist & be unsigned

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dsl4zwgos/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Cloudinary error: ${errText}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(error.message || "Image upload failed. Please try again.");
  }
};
