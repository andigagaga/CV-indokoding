import dotenv from "dotenv";
dotenv.config();

export default class Env {
  static CLOUDINARY_CLOUD_NAME: string = process.env.CLOUDINARY_CLOUD_NAME;
  static CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY;
  static CLOUDINARY_API_SECRET: string = process.env.CLOUDINARY_API_SECRET;
  static JWT_SECRET: string = process.env.JWT_SECRET;
}
