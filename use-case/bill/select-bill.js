const ValidationError = require("../../error/validationError");

const selectBill = ({ billRepository, userRepository }) => {
  return async function select(user, id) {
    console.log("The user is ");
    console.log(user);
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    if (id) {
      const clinic = await billRepository.getOne(id);
      if (!clinic) {
        throw new ValidationError("Invalid Clinic ID");
      }
      let clinicOfUser = billRepository.getClinic(loggedInUser.id, id);
      if (!clinicOfUser) {
        throw new ValidationError(
          "User Does not have Permission to View This Clinic"
        );
      }
      return clinicOfUser;
    } else {
      return billRepository.getAlltheBillsOfUser(loggedInUser.id);
    }
  };
};

module.exports = selectBill;
