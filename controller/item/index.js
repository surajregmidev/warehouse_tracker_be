const {
  createItemSer,
  selectItemSer,
  updateItemSer,
  deleteItemSer,
} = require("../../use-case/item");
// #########

const createItemFun = require("./insert-item");
const selectItemFun = require("./select-item");
const updateItemFun = require("./update-item");
const deleteItemFun = require("./delete-item");

// #########

const createItemController = createItemFun({ createItemSer });
const selectItemController = selectItemFun({ selectItemSer });
const updateItemController = updateItemFun({ updateItemSer });
const deleteItemController = deleteItemFun({ deleteItemSer });
// #########
const services = Object.freeze({
  createItemController,
  selectItemController,
  updateItemController,
  deleteItemController,
});

module.exports = services;
