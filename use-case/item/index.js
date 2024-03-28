const itemRepository = require("../../data-access/item");
const userRepository = require("../../data-access/user");

const createItemFun = require("./insert-item");
const selectItemFun = require("./select-item");
const updateItemFun = require("./update-item");
const deleteItemFun = require("./delete-item");

const createItemSer = createItemFun({ itemRepository, userRepository });
const selectItemSer = selectItemFun({ itemRepository, userRepository });
const updateItemSer = updateItemFun({ itemRepository, userRepository });
const deleteItemSer = deleteItemFun({ itemRepository, userRepository });

const services = Object.freeze({
  createItemSer,
  selectItemSer,
  updateItemSer,
  deleteItemSer,
});

module.exports = services;
