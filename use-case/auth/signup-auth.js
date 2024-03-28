const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ValidationError = require("../../error/validationError");

const { generateToken } = require("../../util/tokenUtils");
require("dotenv").config();

const signUpAuth = ({ authRepository }) => {
  return async function signup(info) {
    const { email, password, role } = info;
    if (!email || !password) {
      throw new ValidationError("Email Or Password is required", 400);
    }
    if (!role) {
      throw new ValidationError("Role is Required", 400);
    }
    const duplicate = await authRepository.getByEmail(email);
    if (duplicate) {
      throw new ValidationError("User Already Exists!");
    }
    const encryptedPassword = await bcrypt.hash(password, 12);

    const accessToken = jwt.sign(
      { email: email, role: role },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY || "86400s" }
    );
    const refreshToken = jwt.sign(
      { email: email, role: role },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY || "86400s" }
    );

    const newuser = await authRepository.add({
      email,
      password: encryptedPassword,
      role,
      refreshToken,
    });

    return {
      user: newuser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  };
};

module.exports = signUpAuth;
