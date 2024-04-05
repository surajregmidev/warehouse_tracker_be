const {
  createBillController,
  selectBillController,
  updateBillController,
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
  router.post(
    "/:id",
    verifyLoggedInUser,
    makeExpressCallback(updateBillController)
  );
  return router;
};

module.exports = route;
