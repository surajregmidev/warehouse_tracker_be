const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/item", require("./item"));
router.use("/bill", require("./bill"));

module.exports = router;
