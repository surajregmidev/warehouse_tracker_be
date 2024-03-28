const { prismaService } = require("../index");
// ######
const query = require("./query");
// ######
const model = {};
const itemRepository = query({ prismaService, model });
// ######
module.exports = itemRepository;
