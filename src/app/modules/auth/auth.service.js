import { startSession } from "mongoose";
import User from "../users/user.model.js";
import ApiError from "../../errors/ApiError.js";
import JWTHelpers from "../../../helpers/JWT.helpers.js";
import httpStatus from "http-status";
import config from "../../../config/index.js";

const registration = async (payload) => {
  let user = null;
  const session = await startSession();
  session.startTransaction();

  try {
    const result = await User.create([payload], { session });

    if (!result.length)
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
    user = result[0];
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
  return user;
};

const login = async (payload) => {
  const { email, password } = payload;

  const user = new User();
  const isExisting = await user.findUserByEmail(email);
  // console.log(isExisting);
  if (!isExisting)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User profile not found, please try again!"
    );

  if (isExisting.password && !user.passwordMatch(password, isExisting.password))
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      "Phone Number and Password do not match"
    );

  const { _id: userID, email: userEmail } = isExisting;
  const tokenPayload = {
    id: userID,
    email: userEmail,
  };
  // console.log("Token payload: ", userID, userEmail);
  if (isExisting?.role && isExisting?.role === "admin") {
    tokenPayload.role = "admin";
  } else tokenPayload.role = "user";

  const accessToken = JWTHelpers.createToken(
    tokenPayload,
    config.jwt.jwt_access_token_key,
    config.jwt.jwt_access_token_expires_in
  );

  const refreshToken = JWTHelpers.createToken(
    tokenPayload,
    config.jwt.jwt_refresh_token_key,
    config.jwt.jwt_refresh_token_expires_in
  );

  return {
    accessToken,
    refreshToken,
    userID,
    userEmail,
  };
};

const AuthService = {
  registration,
  login,
};

export default AuthService;
