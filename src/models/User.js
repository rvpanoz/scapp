import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";

const { mk } = global;
const { JWT_KEY } = config || {};

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email address");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 7
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.pre("save", async function(next) {
  const user = this;

  try {
    // hash the password before saving the user model
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }

    mk.log(`User ${user.email} created`);
    next();
  } catch (error) {
    mk.log(error.message);
    next();
  }
});

userSchema.methods.generateAuthToken = async function() {
  try {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 24 * 60,
        _id: this._id
      },
      JWT_KEY
    );

    // generate an auth token for the user
    this.tokens = this.tokens.concat({ token });
    await this.save();

    mk.log(`Token ${token} generated for user ${this._id}`);
    return token;
  } catch (error) {
    mk.log(error.message);
    throw error;
  }
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return null;
  }

  try {
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Invalid login credentials");
    }

    return user;
  } catch (error) {
    mk.log(error.message);
    throw error;
  }
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
