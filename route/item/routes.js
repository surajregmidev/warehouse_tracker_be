const {
  createItemController,
  selectItemController,
  updateItemController,
  deleteItemController,
} = require("../../controller/item");
const verifyAdminJWT = require("../../middleware/verifyAdminPersonJWT");
const verifyLoggedInUser = require("../../middleware/verifyLoggedInUser");
const route = ({ router, makeExpressCallback }) => {
  router.post("/", verifyAdminJWT, makeExpressCallback(createItemController));
  router.get(
    "/",
    verifyLoggedInUser,
    makeExpressCallback(selectItemController)
  );
  router.get("/:id", makeExpressCallback(selectItemController));
  router.post(
    "/:id",
    verifyAdminJWT,
    makeExpressCallback(updateItemController)
  );
  router.delete(
    "/:id",
    verifyAdminJWT,
    makeExpressCallback(deleteItemController)
  );
  return router;
};

module.exports = route;
