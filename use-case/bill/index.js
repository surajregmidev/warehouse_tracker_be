const billRepository = require("../../data-access/bill");
const userRepository = require("../../data-access/user");
const itemRepository = require("../../data-access/item");

const createBillFun = require("./insert-bill");

const createBillSer = createBillFun({
  billRepository,
  userRepository,
  itemRepository,
});

const services = Object.freeze({
  createBillSer,
});

module.exports = services;
