const billRepository = require("../../data-access/bill");
const userRepository = require("../../data-access/user");
const itemRepository = require("../../data-access/item");

const createBillFun = require("./insert-bill");
const selectBillFun = require("./select-bill");
const updateBillFun = require("./update-bill-status");

const createBillSer = createBillFun({
  billRepository,
  userRepository,
  itemRepository,
});

const selectBillSer = selectBillFun({
  billRepository,
  userRepository,
  itemRepository,
});
const updateBillSer = updateBillFun({
  billRepository,
  userRepository,
  itemRepository,
});

const services = Object.freeze({
  createBillSer,
  selectBillSer,
  updateBillSer,
});

module.exports = services;
