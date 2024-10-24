const prisma = require("../prisma/client");
class Akun {
  static async getAkun() {
    return await prisma.bankAccount.findMany();
  }
  static async getAkunId(accountsId) {
    return await prisma.bankAccount.findUnique({
      where: { id: parseInt(accountsId) },
    });
  }
  static async postAkun(data) {
    return await prisma.bankAccount.create({
      data: {
        bank_name: data.bank_name,
        bank_account_number: data.bank_account_number,
        balance: data.balance,
        userId: data.userId,
      },
    });
  }
  static async putAkun(accountsId, data) {
    return await prisma.bankAccount.update({
      where: { id: parseInt(accountsId) },
      data: {
        bank_name: data.bank_name,
        bank_account_number: data.bank_account_number,
        balance: data.balance,
        userId: data.userId,
      },
    });
  }

  static async deleteAkun(accountsId) {
    return await prisma.bankAccount.delete({
      where: { id: parseInt(accountsId) },
    });
  }
}
module.exports = Akun;
