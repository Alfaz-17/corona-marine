// Cloudinary upload utility
export const uploadToCloudinary = async (file) => {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'corona'); // Replace with your Cloudinary upload preset
    formData.append('cloud_name', 'corona'); // Replace with your Cloudinary cloud name

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dsl4zwgos/image/upload`, // Replace with your cloud name
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    const data = await response.json();
    return data.secure_url; // Return the secure URL of the uploaded image
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Image upload failed. Please try again.');
  }
};
