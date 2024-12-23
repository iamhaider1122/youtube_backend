import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log('err=>', error);
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

const deleteFromCloudinary = async (fileUrl, resourceType) => {

  try {

    const publicId = fileUrl.split('/').pop().split('.')[0];
    console.log(`Public ID: ${publicId}`);

    // Attempt to delete the file from Cloudinary
    const response = await cloudinary.uploader.destroy(`folder/${publicId}`, {
      resource_type: "video",
      invalidate: true,
      type: 'authenticated'
    });

    console.log(`${resourceType} file is deleted from Cloudinary`, response);

    // Check if the response indicates success
    if (response.result === 'ok') {
      console.log('File successfully deleted and invalidated.');
    } else {
      console.log('File deletion response:', response);
    }

    return response;
  } catch (error) {
    console.log('Error deleting file: =>', error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
