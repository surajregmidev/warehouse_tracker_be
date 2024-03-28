const authLoginFun = require("./login-auth");
const authSignUpFun = require("./signup-auth");
const authRefreshTokenFun = require("./refresh-token-auth");
const authLogoutFun = require("./logout-auth");
const emailVerifyFun = require("./verify-email");
const saveDeviceTokenFun = require("./save-device-token");
const resetPasswordEmailFun = require("./reset-password-email");
const resetPasswordFun = require("./reset-password");

// user
const createEmployeeFun = require("./create-employee");
const selectEmployeeFun = require("./get-all-employee");

const authRepository = require("../../data-access/user");

const { localStategyPassport } = require("../../config/passport/index");

const loginAuthSer = authLoginFun({ authRepository, localStategyPassport });
const signUpAuthSer = authSignUpFun({ authRepository });
const refreshTokenAuthSer = authRefreshTokenFun({ authRepository });
const logoutAuthSer = authLogoutFun({ authRepository });
const verifyEmailSer = emailVerifyFun({ authRepository });
const saveDeviceTokenSer = saveDeviceTokenFun({ authRepository });
const resetPasswordEmailSer = resetPasswordEmailFun({ authRepository });
const resetPasswordSer = resetPasswordFun({ authRepository });

// user
const createEmployeeSer = createEmployeeFun({ authRepository });
const selectEmployeeSer = selectEmployeeFun({ authRepository });

const services = Object.freeze({
  loginAuthSer,
  signUpAuthSer,
  refreshTokenAuthSer,
  logoutAuthSer,
  verifyEmailSer,
  saveDeviceTokenSer,
  resetPasswordEmailSer,
  resetPasswordSer,
  createEmployeeSer,
  selectEmployeeSer,
});

module.exports = services;
