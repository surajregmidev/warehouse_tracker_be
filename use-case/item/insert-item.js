const ValidationError = require("../../error/validationError");

const createClinic = ({ itemRepository, userRepository }) => {
  return async function insert(model, user) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    model.quantity = parseInt(model.quantity);
    model.costprice = parseFloat(model.costprice);
    model.sellingprice = parseFloat(model.sellingprice);

    return itemRepository.add(model);
  };
};

module.exports = createClinic;
