const {
  createBillSer,
  selectBillSer,
  updateBillSer,
} = require("../../use-case/bill");
// #########

const createBillFun = require("./insert-bill");
const selectBillFun = require("./select-bill");
const updateBillFun = require("./update-bill-status");

// #########

const createBillController = createBillFun({ createBillSer });
const selectBillController = selectBillFun({ selectBillSer });
const updateBillController = updateBillFun({ updateBillSer });

// #########
const services = Object.freeze({
  createBillController,
  selectBillController,
  updateBillController,
});

module.exports = services;
