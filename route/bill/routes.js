const {
  createBillController,
  selectBillController,
} = require("../../controller/bill");
const verifyAdminJWT = require("../../middleware/verifyAdminPersonJWT");
const verifyLoggedInUser = require("../../middleware/verifyLoggedInUser");
const route = ({ router, makeExpressCallback }) => {
  router.post(
    "/",
    verifyLoggedInUser,
    makeExpressCallback(createBillController)
  );
  router.get(
    "/",
    verifyLoggedInUser,
    makeExpressCallback(selectBillController)
  );
  return router;
};

module.exports = route;
