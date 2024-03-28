const { createBillSer } = require("../../use-case/bill");
// #########

const createBillFun = require("./insert-bill");

// #########

const createBillController = createBillFun({ createBillSer });

// #########
const services = Object.freeze({
  createBillController,
});

module.exports = services;
