const ValidationError = require("../../error/validationError");

const updateItem = ({ billRepository, userRepository }) => {
  return async function update(user, itemId, model) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    let item = await billRepository.getOne(itemId);
    if (!item) {
      throw new ValidationError("Invalid Item ID");
    }
    const updatedItem = await billRepository.update(itemId, {
      orderstatus: "DELIVERED",
    });
    return updatedItem;
  };
};

module.exports = updateItem;
