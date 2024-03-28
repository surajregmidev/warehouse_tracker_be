const { prismaService } = require("../index");
// ######
const query = require("./query");
// ######
const model = {};
const billRepository = query({ prismaService, model });
// ######
module.exports = billRepository;
