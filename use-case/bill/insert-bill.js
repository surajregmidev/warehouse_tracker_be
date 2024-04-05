const ValidationError = require("../../error/validationError");

const createClinic = ({ billRepository, userRepository, itemRepository }) => {
  return async function insert(model, user) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    if (model.billtype == "PURCHASE") {
      let totalPrice = 0.0;
      for (let billdetail of model.billdetails) {
        billdetail.itemId = billdetail.itemId;
        billdetail.quantity = parseInt(billdetail.quantity);
        billdetail.rate = parseFloat(billdetail.rate);
        console.log(billdetail);
        totalPrice = totalPrice + billdetail.quantity * billdetail.rate;
        // Incremnt Items in the Stock
        itemRepository.increaseStock(
          billdetail.itemId,
          billdetail.quantity,
          billdetail.rate
        );
      }
      model.totalPrice = totalPrice;
      model.userId = loggedInUser.id;
      const newBill = billRepository.addWithLines(model);

      return billRepository.getOneWithDetail(newBill.id);
    }
    if (model.billtype == "SALE") {
      let totalPrice = 0.0;
      for (let billdetail of model.billdetails) {
        billdetail.itemId = billdetail.itemId;
        billdetail.quantity = parseInt(billdetail.quantity);
        billdetail.rate = parseFloat(billdetail.rate);
        console.log(billdetail);
        totalPrice = totalPrice + billdetail.quantity * billdetail.rate;
        // Incremnt Items in the Stock
        itemRepository.decreaseStock(
          billdetail.itemId,
          billdetail.quantity,
          billdetail.rate
        );
      }
      model.totalPrice = totalPrice;
      model.userId = loggedInUser.id;
      const newBill = await billRepository.addWithLines(model);

      return billRepository.getOneWithDetail(newBill.id);
    }
  };
};

module.exports = createClinic;
