const { createBillSer, selectBillSer } = require("../../use-case/bill");
// #########

const createBillFun = require("./insert-bill");
const selectBillFun = require("./select-bill");

// #########

const createBillController = createBillFun({ createBillSer });
const selectBillController = selectBillFun({ selectBillSer });

// #########
const services = Object.freeze({
  createBillController,
  selectBillController,
});

module.exports = services;
