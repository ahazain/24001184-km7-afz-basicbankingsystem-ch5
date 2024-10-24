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
      // Kurangi saldo dari akun sumber
      await prisma.bankAccount.update({
        where: { id: sourceAccountId },
        data: { balance: { decrement: amount } },
      });

      // Tambah saldo ke akun tujuan
      await prisma.bankAccount.update({
        where: { id: destinationAccountId },
        data: { balance: { increment: amount } },
      });

      // Buat transaksi baru
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

  
  static async putTransaction(
    transactionId,
    sourceAccountId,
    destinationAccountId,
    amount
  ) {
    const updateTransaction = await prisma.$transaction(async (prisma) => {
      // Cek apakah akun sumber ada
      const sourceAccount = await prisma.bankAccount.findUnique({
        where: { id: sourceAccountId },
      });

      if (!sourceAccount) {
        throw new Error("Source account not found");
      }

      // Cek apakah akun tujuan ada
      const destinationAccount = await prisma.bankAccount.findUnique({
        where: { id: destinationAccountId },
      });

      if (!destinationAccount) {
        throw new Error("Destination account not found");
      }

      // Cek saldo akun sumber
      if (sourceAccount.balance < amount) {
        throw new Error("Insufficient funds in the source account");
      }

      // Kurangi saldo dari akun sumber
      await prisma.bankAccount.update({
        where: { id: sourceAccountId },
        data: { balance: { decrement: amount } },
      });

      // Tambah saldo ke akun tujuan
      await prisma.bankAccount.update({
        where: { id: destinationAccountId },
        data: { balance: { increment: amount } },
      });

      // Update transaksi
      return await prisma.transaction.update({
        where: { id: parseInt(transactionId) },
        data: {
          sourceAccountId,
          destinationAccountId,
          amount,
        },
      });
    });

    return updateTransaction;
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
