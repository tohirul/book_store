import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../../../config/index.js";

const UserSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, // Regular expression for basic email format validation
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.methods.passwordMatch = async function (
  givenPassword,
  savedPassword
) {
  return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.methods.findUserById = async function (property) {
  const result = await User.findById({ _id: property });
  return result;
};

UserSchema.methods.findUserByEmail = async function (property) {
  // console.log("Email: ", property);
  const result = await User.findOne({ email: property });
  return result;
};

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
