import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { uploadToCloudinary } from "../../utils/cloudinary/CloudinaryUploader";
import {
  userLoginSchema,
  userRegisterSchema,
} from "../../utils/validator/AuthValidator";
import Env from "../../utils/variabel/Env";

export default new (class AuthServices {
  private readonly authRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async registerUser(req: Request, res: Response): Promise<Response> {
    try {
      const { username, email, password } = req.body;

      console.log(req.body);

      const { error, value } = userRegisterSchema.validate({
        username,
        email,
        password,
      });

      if (error) {
        return res.status(400).json({
          code: 400,
          message: "REGISTER FAILED, CHECK YOUR INPUT",
          error: error,
        });
      }

      const usernameFind = await this.authRepository.findOne({
        where: { username: value.username },
      });

      const emailFind = await this.authRepository.findOne({
        where: { email: value.email },
      });

      if (usernameFind || emailFind) {
        return res.status(400).json({
          code: 400,
          message: "EMAIL OR USERNAME ALREADY EXIST",
        });
      }

      let cloudinary_profile_picture = "";
      if (req.file) {
        cloudinary_profile_picture = await uploadToCloudinary(req.file.path);
      }
      console.log(cloudinary_profile_picture, "cloudinary_profile_picture");

      const hashedPassword = await bcrypt.hash(value.password, 10);
      const userData = this.authRepository.create({
        username: value.username,
        email: value.email,
        password: hashedPassword,
        profile_picture: cloudinary_profile_picture,
      });

      const userCreated = await this.authRepository.save(userData);

      return res.status(201).json({
        code: 201,
        message: "REGISTER SUCCESS",
        data: userCreated,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        message: "INTERNAL SERVER ERROR",
        error: error,
      });
    }
  }

  async loginUser(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      console.log(password);
      const { error, value } = userLoginSchema.validate({
        email,
        password,
      });

      if (error) {
        return res.status(400).json({
          code: 400,
          message: "LOGIN FAILED, CHECK YOUR INPUT",
          error: error,
        });
      }

      const emailFind = await this.authRepository.findOne({
        where: { email: value.email },
      });

      if (!emailFind) {
        return res.status(400).json({
          code: 400,
          message: "USERNAME NOT FOUND",
        });
      }

      const passwordFind = await bcrypt.compare(
        value.password,
        emailFind.password
      );

      if (!passwordFind) {
        return res.status(400).json({
          code: 400,
          message: "PASSWORD NOT FOUND",
        });
      }

      // Pastikan `username` ada di dalam `emailFind`
      const token = jwt.sign(
        {
          id: emailFind.id,
          email: emailFind.email,
          username: emailFind.username,
        },
        Env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({
        code: 200,
        message: "LOGIN SUCCESS",
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        message: "INTERNAL SERVER ERROR",
        error: error,
      });
    }
  }

  async getProfile(req: Request, res: Response): Promise<Response> {
    try {
      const userData = res.locals.user;

      const userProfile = await this.authRepository.findOne({
        where: { id: userData.id },
        select: ["id", "username", "email", "profile_picture"],
      });

      if (!userProfile) {
        return res.status(400).json({
          code: 400,
          message: "USER NOT FOUND",
        });
      }

      return res.status(200).json({
        code: 200,
        message: "GET PROFILE SUCCESS",
        data: userProfile,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "INTERNAL SERVER ERROR",
        error: error,
      });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      const { username, email } = req.body;

      // cari data user berdasar id dari tokennya
      const userData = res.locals.user;
      const userToUpdate = await this.authRepository.findOne({
        where: { id: userData.id },
      });

      if (!userToUpdate) {
        return res.status(400).json({
          code: 400,
          message: "USER NOT FOUND",
        });
      }

      // update data user
      userToUpdate.username = username;
      userToUpdate.email = email;

      // jika ada profile yang diunggah, update juga profile picturenya
      if (req.file) {
        const cloudinary_profile_picture = await uploadToCloudinary(
          req.file.path
        );
        userToUpdate.profile_picture = cloudinary_profile_picture;
      }

      // simpan ke database
      const updateUser = await this.authRepository.save(userToUpdate);

      return res.status(200).json({
        code: 200,
        message: "UPDATE PROFILE SUCCESS",
        data: updateUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        message: "INTERNAL SERVER ERROR",
        error: error,
      });
    }
  }
})();
