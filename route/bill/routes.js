const { createBillController } = require("../../controller/bill");
const verifyAdminJWT = require("../../middleware/verifyAdminPersonJWT");
const route = ({ router, makeExpressCallback }) => {
  router.post("/", verifyAdminJWT, makeExpressCallback(createBillController));
  return router;
};

module.exports = route;
