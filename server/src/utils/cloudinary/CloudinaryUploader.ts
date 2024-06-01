import { v2 as cloudinary } from "cloudinary";
import Env from "../variabel/Env";

cloudinary.config({
  cloud_name: Env.CLOUDINARY_CLOUD_NAME,
  api_key: Env.CLOUDINARY_API_KEY,
  api_secret: Env.CLOUDINARY_API_SECRET,
});

// untuk unggah file ke cloudinary
export const uploadToCloudinary = (
  file: Express.Multer.File
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const opt = { folder: "E-COMMERCE-SHOOP" };

    cloudinary.uploader.upload(file.path, opt, function (error, result) {
      if (error) {
        return reject(error);
      }
      return resolve(result.secure_url);
    });
  });
};

export const uploadToCloudinaryAlif = (
  file: string,
  folder: string,
  public_id: string
): Promise<string> => {
  cloudinary.config({
    cloud_name: Env.CLOUDINARY_CLOUD_NAME,
    api_key: Env.CLOUDINARY_API_KEY,
    api_secret: Env.CLOUDINARY_API_SECRET,
  });

  const imagePublicId: string = public_id.toLowerCase().replace(/ /g, "_");
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      `src/uploads/${file}`,
      { folder: folder, public_id: imagePublicId },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result.secure_url);
      }
    );
  });
};

export const deleteToCloudinary = (publicId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, function (error, result) {
      if (error) {
        return reject(error);
      } else {
        return resolve(result);
      }
    });
  });
};