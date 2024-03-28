const ValidationError = require("../../error/validationError");

const selectcar = ({ itemRepository, userRepository }) => {
  return async function select(user, id, query) {
    if (id) {
      return await itemRepository.getOne(id);
    }
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    if (id) {
      const item = await itemRepository.getOne(id);
      if (!item) {
        throw new ValidationError("Invalid item ID");
      }
      return item;
    } else {
      return itemRepository.get(query);
    }
  };
};

module.exports = selectcar;
