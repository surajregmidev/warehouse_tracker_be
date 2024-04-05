const query = ({ prismaService, model }) => {
  return Object.freeze({
    get,
    getOne,
    add,
    update,
    del,
    addWithLines,
    getOneWithDetail,
    getAlltheBillsOfUser,
  });

  async function get() {
    return prismaService.bill.findMany();
  }

  async function getOne(id) {
    return prismaService.bill.findFirst({
      where: {
        id: id,
      },
    });
  }
  async function getOneWithDetail(id) {
    return prismaService.bill.findFirst({
      where: {
        id: id,
      },
      include: {
        billdetails: true,
      },
    });
  }

  async function add(model) {
    return prismaService.bill.create({
      data: model,
    });
  }

  async function getAlltheBillsOfUser(userId) {
    return prismaService.bill.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async function addWithLines(model) {
    console.log(model);
    const billdetails = model.billdetails;
    const userId = model.userId;
    const billtype = model.billtype;
    const customername = model.customername;
    const shippingaddress = model.shippingaddress;
    const note = model.note;
    const dateoforder = new Date(model.dateoforder);

    return prismaService.bill.create({
      data: {
        billtype: billtype,
        customername: customername,
        shippingaddress: shippingaddress,
        note: note,
        dateoforder: dateoforder,
        userId: userId,
        totalPrice: model.totalPrice,
        billdetails: {
          create: billdetails,
        },
      },
    });
  }

  async function update(id, model) {
    return prismaService.bill.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.bill.delete({
      where: {
        id: id,
      },
    });
  }
};

module.exports = query;
