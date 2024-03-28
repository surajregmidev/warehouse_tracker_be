const { check, body } = require("express-validator");
const signUpBodyValidator = [
  body("email").isEmail().withMessage("Invalid Email!"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password Length should be 8!"),
  check("role")
    .isIn(["ADMIN", "CUSTOMER", "EMPLOYEE", "MNTNANCEPERSON"])
    .withMessage("Please provide a valid role!"),
];
module.exports = signUpBodyValidator;
