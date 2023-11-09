import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import responseSender from "../../../shared/responseSender.js";
import AuthService from "./auth.service.js";
import config from "../../../config/index.js";

const AccountRegistration = catchAsync(async (req, res) => {
  const { ...payload } = req.body;
  const result = await AuthService.registration(payload);

  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your account registration was successful! You can login now.",
    data: result,
  });
});

const AccountLogin = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;
  // console.log(loginData);
  const { accessToken, refreshToken, userID, userEmail } =
    await AuthService.login(loginData);
  // console.log(userID, userEmail);
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Account login successful!",
    data: {
      accessToken,
      id: userID,
      email: userEmail,
    },
  });
});

const AuthController = {
  AccountRegistration,
  AccountLogin,
};

export default AuthController;
