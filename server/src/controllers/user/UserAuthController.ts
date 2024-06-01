import { Request, Response } from "express";
import UserAuthServices from "../../services/user/UserAuthServices";

export default new (class UserAuthController {
  registerUser(req: Request, res: Response): Promise<Response> {
    return UserAuthServices.registerUser(req, res);
  }

  loginUser(req: Request, res: Response): Promise<Response> {
    return UserAuthServices.loginUser(req, res);
  }

  getProfile(req: Request, res: Response): Promise<Response> {
    return UserAuthServices.getProfile(req, res);
  }

  updateProfile(req: Request, res: Response): Promise<Response> {
    return UserAuthServices.updateProfile(req, res);
  }
})();
