const prisma = require("../prisma/client");

class Transaksi {
  static async getTransaksi() {
    return await prisma.transaction.findMany({
      include: {
        sourceAccount: true,
        destinationAccount: true,
      },
    });
  }
  static async getTransaksiId(transactionId) {
    return await prisma.transaction.findUnique({
      where: { id: parseInt(transactionId) },
      include: {
        sourceAccount: true,
        destinationAccount: true,
      },
    });
  }
  static async postTransaction(sourceAccountId, destinationAccountId, amount) {
    const transaction = await prisma.$transaction(async (prisma) => {
      await prisma.bankAccount.update({
        where: { id: sourceAccountId },
        data: { balance: { decrement: amount } },
      });

      await prisma.bankAccount.update({
        where: { id: destinationAccountId },
        data: { balance: { increment: amount } },
      });

      return await prisma.transaction.create({
        data: {
          sourceAccountId,
          destinationAccountId,
          amount,
        },
      });
    });

    return transaction;
  }

  static async deleteTransaksi(transactionId) {
    return await prisma.transaction.findUnique({
      where: { id: parseInt(transactionId) },
      include: {
        sourceAccount: true,
        destinationAccount: true,
      },
    });
  }
}

module.exports = Transaksi;
