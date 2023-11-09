import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  port: process.env.PORT || 3500,
  database_user_name: process.env.USER_Name,
  database_user_password: process.env.USER_PASSWORD,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    jwt_access_token_key: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    jwt_refresh_token_key: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    jwt_access_token_expires_in: process.env.JWT_ACCESS_TOKEN_SECRET_KEY_EXPIRY,
    jwt_refresh_token_expires_in:
      process.env.JWT_REFRESH_TOKEN_SECRET_KEY_EXPIRY,
  },
  env: process.env.ENV,
};

export default config;
