import express from "express";
import ValidateRequest from "../../middlewares/ValidateRequest.js";
import AuthZodValidation from "./auth.validation.js";
import AuthController from "./auth.controller.js";

const AuthRouter = express.Router();

AuthRouter.post(
  "/account-registration",
  ValidateRequest(AuthZodValidation.AccountRegisterZodSchema),
  AuthController.AccountRegistration
);

AuthRouter.post(
  "/account-login",
  ValidateRequest(AuthZodValidation.LoginZodSchema),
  AuthController.AccountLogin
);

export default AuthRouter;
