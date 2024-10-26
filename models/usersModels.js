const prisma = require("../prisma/client");
class Users {
  static async getUsers() {
    return await prisma.user.findMany();
  }
  static async findUserByemail(email) {
    return await prisma.user.findUnique({ where: { email: email } });
  }
  static async getUsersId(usersId) {
    return await prisma.user.findUnique({
      where: { id: parseInt(usersId) },
      include: { profile: true },
    });
  }
  static async postUsers(data) {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        profile: {
          create: {
            identify_type: data.profile.identify_type, // Perbaiki akses ke data.profile
            identify_number: data.profile.identify_number, // Perbaiki akses ke data.profile
            address: data.profile.address, // Perbaiki akses ke data.profile
          },
        },
      },
      include: {
        profile: true,
      },
    });
  }

  static async putUsers(usersId, data) {
    return await prisma.user.update({
      where: { id: parseInt(usersId) },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        profile: {
          update: {
            identify_type: data.identify_type,
            identify_number: data.identify_number,
            address: data.address,
          },
        },
      },
      include: {
        profile: true,
      },
    });
  }
  static async daleteUsers(usersId) {
    return await prisma.user.findUnique({
      where: { id: parseInt(usersId) },
      include: { profile: true },
    });
  }
}

module.exports = Users;
