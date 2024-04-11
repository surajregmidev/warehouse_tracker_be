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
    getAlltheBills,
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

  async function getAlltheBillsOfUser(userId, query) {
    const { searchKey } = query;
    console.log("In get all the bills of user");
    console.log(query);
    return prismaService.bill.findMany({
      where: {
        userId: userId,
        OR: [
          {
            customername: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            shippingaddress: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            note: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        ],
      },
    });
  }

  async function getAlltheBills(query) {
    const { searchKey } = query;
    return prismaService.bill.findMany({
      where: {
        OR: [
          {
            customername: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            shippingaddress: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            note: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
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
