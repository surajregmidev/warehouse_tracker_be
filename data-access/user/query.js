const { Role } = require("@prisma/client");

const query = ({ prismaService, model }) => {
  return Object.freeze({
    get,
    getOne,
    add,
    update,
    del,
    getByEmail,
    getByRefreshToken,
    getByIdAndCode,
    getWithPage,
    getOnlyEmployees,
  });
  async function get() {
    return prismaService.user.findMany();
  }

  async function getOne(id) {
    return prismaService.user.findFirst({
      where: {
        id: id,
      },
    });
  }
  async function getWithPage({ page, size }, searchKey) {
    if (searchKey) {
      return prismaService.user.findMany({
        include: {
          profile: {
            include: {
              address: true,
              educations: true,
              availabilities: true,
            },
          },
        },
        where: {
          role: "USER",
          OR: [
            {
              email: {
                contains: searchKey,
                mode: "insensitive",
              },
            },
            {
              profile: {
                firstName: {
                  contains: searchKey,
                  mode: "insensitive",
                },
              },
            },
          ],
        },

        skip: Number(page - 1) * Number(size),
        take: Number(size),
      });
    } else {
      return prismaService.user.findMany({
        where: {
          role: "USER",
        },
        include: {
          profile: {
            include: {
              address: true,
              educations: true,
              availabilities: true,
            },
          },
        },
        skip: Number(page - 1) * Number(size),
        take: Number(size),
      });
    }
  }

  async function getByEmail(email) {
    return prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async function getByRefreshToken(refreshToken) {
    return prismaService.user.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });
  }

  async function getByIdAndCode(id, code) {
    return prismaService.user.findFirst({
      where: {
        id: id,
        verificationToken: code,
      },
    });
  }

  async function add(model) {
    return prismaService.user.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.user.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }

  async function getOnlyEmployees(query) {
    const { searchKey } = query;
    let filters = {
      OR: [{ role: Role.EMPLOYEE }, { role: Role.MNTNANCEPERSON }],
      AND: [
        {
          email: {
            contains: searchKey || "",
            mode: "insensitive",
          },
        },
        {
          fullName: {
            contains: searchKey || "",
            mode: "insensitive",
          },
        },
      ],
    };
    return prismaService.user.findMany({
      where: filters,
      orderBy: {
        createdAt: "desc",
      },
    });
  }
};

module.exports = query;
