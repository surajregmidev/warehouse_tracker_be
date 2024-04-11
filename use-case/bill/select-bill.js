const ValidationError = require("../../error/validationError");

const selectBill = ({ billRepository, userRepository }) => {
  return async function select(user, id, query) {
    console.log("The user is ");
    console.log(user);
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    if (loggedInUser.role == "EMPLOYEE") {
      return billRepository.getAlltheBills(query);
    }
    if (id) {
      const bill = await billRepository.getOne(id);
      if (!bill) {
        throw new ValidationError("Invalid bill  ID");
      }
      return bill;
    } else {
      return billRepository.getAlltheBillsOfUser(loggedInUser.id, query);
    }
  };
};

module.exports = selectBill;
