import { Router } from "express";
import { asyncHandler } from "../../core/middlewares/asyncHandler.js";
import { validate } from "../../core/middlewares/validateZod.js";
import AuthController from "./auth.controller.js";

const router = Router();

// router.post(
//   "/login",
//   validate(loginSchema),
//   asyncHandler(AuthController.login)
// );

export default router;