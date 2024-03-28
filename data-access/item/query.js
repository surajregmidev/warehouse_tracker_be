const query = ({ prismaService, model }) => {
  return Object.freeze({
    get,
    getOne,
    add,
    update,
    del,
    increaseStock,
    decreaseStock,
  });

  async function get(query) {
    const { searchKey } = query;
    return prismaService.item.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            code: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            storinglocation: {
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

  async function getOne(id) {
    return prismaService.item.findFirst({
      where: {
        id: id,
      },
    });
  }
  async function add(model) {
    return prismaService.item.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.item.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function increaseStock(id, unit, price) {
    const prevItem = await getOne(id);
    let prevQuantity = prevItem.quantity;
    return prismaService.item.update({
      where: {
        id: id,
      },
      data: {
        quantity: prevQuantity + unit,
        costprice: price,
      },
    });
  }

  async function decreaseStock(id, unit, price) {
    const prevItem = await getOne(id);
    let prevQuantity = prevItem.quantity;
    return prismaService.item.update({
      where: {
        id: id,
      },
      data: {
        quantity: prevQuantity - unit,
        sellingprice: price,
      },
    });
  }

  async function del(id) {
    return prismaService.item.delete({
      where: {
        id: id,
      },
    });
  }
};

module.exports = query;
