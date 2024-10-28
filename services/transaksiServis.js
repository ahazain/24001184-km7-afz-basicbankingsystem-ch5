const transaksiModels = require("../models/transaksiModels");
const akun = require("../models/akunModels");

class TransaksiServis {
  static async getAll() {
    const data = await transaksiModels.getTransaksi();
    if (!data || data.length === 0) {
      const error = new Error("Daftar data transaksi kosong");
      error.statusCode = 404;
      throw error;
    }
    return data;
  }
  static async getById(transactionId) {
    const data = await transaksiModels.getTransaksiId(transactionId);
    if (!data || data.length === 0) {
      const error = Error("Data detail transaksi kosong");
      error.statusCode = 404;
      throw error;
    }
    return data;
  }

  static async createTransaksi(sourceAccountId, destinationAccountId, amount) {
    if (!sourceAccountId && !destinationAccountId && !amount) {
      const error = new Error("Mohon lengkapi semua data");
      error.statusCode = 400;
      throw error;
    }

    const fields = [];
    if (!sourceAccountId) fields.push("sourceAccountId");
    if (!destinationAccountId) fields.push("destinationAccountId");
    if (!amount) fields.push("amount");

    if (fields.length > 0) {
      const error = new Error(`Isi data: ${fields.join(", ")}`);
      error.statusCode = 400;
      throw error;
    }

    if (amount <= 0) {
      const error = new Error("Masukkan amount yang benar");
      error.isValidationError = true;
      throw error;
    }

    const transaction = await transaksiModels.postTransaction(
      sourceAccountId,
      destinationAccountId,
      amount
    );

    return transaction;
  }

  static async deleteTransaksi(transactionId) {
    const data = await transaksiModels.deleteTransaksi(transactionId);
    if (!data || data.length === 0) {
      const error = Error("tidak ada transaksi");
      error.statusCode = 404;
      throw error;
    }
    return data;
  }
}

module.exports = TransaksiServis;
