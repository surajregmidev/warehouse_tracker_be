const ValidationError = require("../../error/validationError");

const saveDeviceToken = ({ authRepository }) => {
  return async function update(model, user) {
    const loggedInUser = await authRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    return authRepository.update(loggedInUser.id, {
      device_token_firebase: model.token,
    });
  };
};

module.exports = saveDeviceToken;
