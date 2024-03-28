const ValidationError = require("../../error/validationError");

const selectEmployee = ({ authRepository }) => {
  return async function select(user, query, id) {
    const loggedInUser = await authRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }

    if (id) {
      const userSelected = await authRepository.getOne(id);
      return userSelected;
    }
    const onlyStudents = await authRepository.getOnlyEmployees(query);
    return onlyStudents;
  };
};

module.exports = selectEmployee;
