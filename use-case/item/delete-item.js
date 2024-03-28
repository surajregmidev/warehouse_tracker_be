const ValidationError = require("../../error/validationError");

const deleteItem = ({ itemRepository, userRepository }) => {
  return async function update(user, itemId, model) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    let item = await itemRepository.getOne(itemId);
    if (!item) {
      throw new ValidationError("Invalid Item ID");
    }
    const deletedItem = await itemRepository.del(itemId);
    return deletedItem;
  };
};

module.exports = deleteItem;
