import { Request, Response } from "express";
import AuthService from "./auth.service.js";
import { ApiResponse } from "../../core/middlewares/ApiResponse.js";
import { httpStatus } from "../../shared/utils/constants.js";

class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    await AuthService.login(email, password, req);

    res.status(httpStatus.ok).json(new ApiResponse(httpStatus.ok, null, "msg"));
  }
}

export default AuthController;
