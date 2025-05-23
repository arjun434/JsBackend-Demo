import { v2 as cloudinary } from "cloudinary";

import fs from "fs";

// Configuration
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
    // fs.unlinkSync(localFilePath); //remove the file from the local storage as the upload has been done

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the file from the local storage as the uploacd has failed
    return null;
  }
};

export { uploadOnCloudinary };
