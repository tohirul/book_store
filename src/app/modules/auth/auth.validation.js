import { z } from "zod";

const AccountRegisterZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error:
        "Password is required for account registration. Please provide a valid password!",
    }),
    email: z.string({
      required_error:
        "Please provide a valid email address for account registration.",
    }),
    name: z.object({
      firstName: z.string({ required_error: "First Name is required" }),
      lastName: z.string({ required_error: "Last Name is required" }),
    }),
    phoneNumber: z.string({
      required_error: "Phone Number is required for account registration.",
    }),
    address: z.string({
      required_error: "Address is required for account registration",
    }),
  }),
});

const LoginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required to login",
    }),
    password: z.string({
      required_error: "Password is required to login",
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

const AuthZodValidation = {
  LoginZodSchema,
  AccountRegisterZodSchema,
  refreshTokenZodSchema,
};

export default AuthZodValidation;
