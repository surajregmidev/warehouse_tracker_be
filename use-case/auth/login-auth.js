const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ValidationError = require("../../error/validationError");
const ValidationErrors = require("../../error/validationErrors");
const { getDateDifference } = require("../../util/dateTimeUtil");
require("dotenv").config();

const loginAuth = ({ authRepository, localStategyPassport }) => {
  return async function login(info) {
    const { email, password, role } = info;

    if (!email) {
      let validationErrors = new ValidationErrors("Validation Error", 400);
      validationErrors.addMsg("Email Can not be Empty!");
      validationErrors.addMsg("Password Can not be Empty!");
      console.log("The validation error messages are");
      console.log(validationErrors.getMsgs());
      throw validationErrors;
    }

    if (!email || !password) {
      throw new ValidationError("Password can not be Empty!");
    }
    const existingUser = await authRepository.getByEmail(email);
    if (!existingUser) {
      throw new ValidationError("User does not exists!");
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if (match) {
      const accessToken = jwt.sign(
        { email: existingUser.email, role: existingUser.role },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY || "86400s" }
      );
      const refreshToken = jwt.sign(
        { email: existingUser.email, role: existingUser.role },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY || "86400s" }
      );
      existingUser.refreshToken = refreshToken;
      const id = existingUser.id;
      delete existingUser.id;
      await authRepository.update(id, existingUser);

      delete existingUser.password;

      return {
        user: existingUser,
        accessToken,
        refreshToken,
      };
    } else {
      throw new ValidationError("Email or Password Incorrect!");
    }
  };
};

module.exports = loginAuth;
