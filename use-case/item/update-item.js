const ValidationError = require("../../error/validationError");

const updateItem = ({ itemRepository, userRepository }) => {
  return async function update(user, itemId, model) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    let item = await itemRepository.getOne(itemId);
    if (!item) {
      throw new ValidationError("Invalid Item ID");
    }

    if (model.quantity) model.quantity = parseInt(model.quantity);
    if (model.costprice) model.costprice = parseFloat(model.costprice);
    if (model.sellingprice) model.sellingprice = parseFloat(model.sellingprice);

    const updatedItem = await itemRepository.update(itemId, model);
    return updatedItem;
  };
};

module.exports = updateItem;
