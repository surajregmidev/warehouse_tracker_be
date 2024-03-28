const query = ({ prismaService, model }) => {
  return Object.freeze({
    get,
    getOne,
    add,
    update,
    del,
  });

  async function get() {
    return prismaService.billdetail.findMany();
  }

  async function getOne(id) {
    return prismaService.billdetail.findFirst({
      where: {
        id: id,
      },
    });
  }
  async function add(model) {
    return prismaService.billdetail.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.billdetail.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.billdetail.delete({
      where: {
        id: id,
      },
    });
  }
};

module.exports = query;
