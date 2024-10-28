const akunModels = require("../models/akunModels");

class AkunServis {
  static async getAllAkun() {
    const data = await akunModels.getAkun();
    if (!data || data.length === 0) {
      const error = Error("Daftar akun tidak ada");
      error.statusCode = 404;
      throw error;
    }
    return data;
  }
  static async getById(accountsId) {
    const data = await akunModels.getAkunId(accountsId);
    if (!data || data.length === 0) {
      const error = Error("Detail akun tidak ada");
      error.statusCode = 404;
      throw error;
    }
    return data;
  }
  static async createAkun(data) {
    if (
      !data.bank_name ||
      !data.bank_account_number ||
      !data.balance ||
      !data.userId
    ) {
      if (
        !data.bank_name &&
        !data.bank_account_number &&
        !data.balance &&
        !data.userId
      ) {
        const error = new Error("mohon lengkapi data yang ada");
        error.statusCode = 400;
        throw error;
      }
      const fields = [];
      if (!data.bank_name) fields.push("bank_name");
      if (!data.bank_account_number) fields.push("bank_account_number");
      if (!data.balance) fields.push("balance"); 
      if (!data.userId) fields.push("userId");
      if (fields.length > 0) {
        const error = Error(`lengkapi data yang kosong : ${fields.join(", ")}`);
        error.statusCode = 400;
        throw error;
      }
    }
    return await akunModels.postAkun(data);
  }
  static async editAkun(accountsId, data) {
    const cekId = await akunModels.getAkunId(accountsId);
    if (!cekId) {
      const error = new Error("Data akun tidak ada untuk diupdate");
      error.statusCode = 404;
      throw error;
    }
    if (
      !data.bank_name ||
      !data.bank_account_number ||
      !data.balance ||
      !data.userId
    ) {
      if (
        !data.bank_name &&
        !data.bank_account_number &&
        !data.balance &&
        !data.userId
      ) {
        const error = new Error("mohon lengkapi data yang ada");
        error.statusCode = 400;
        throw error;
      }
      const fields = [];
      if (!data.bank_name) fields.push("nama bank");
      if (!data.bank_account_number) fields.push("nomor rekening");
      if (!data.balance) fields.push("saldo");
      if (!data.userId) fields.push("id user");
      if (fields.length > 0) {
        const error = Error(`lengkapi data yang kosong : ${fields.join(", ")}`);
        error.statusCode = 400;
        throw error;
      }
    }
    return await akunModels.putAkun(accountsId, data);
  }
  static async deleteAkunServis(accountsId) {
    try {
      const data = await akunModels.deleteAkun(accountsId);
      return data;
    } catch (error) {
      if (error.code === "P2025") {
        const notFoundError = new Error("Data Akun tidak ada");
        notFoundError.statusCode = 404;
        throw notFoundError;
      }
      throw error;
    }
  }
}

module.exports = AkunServis;
