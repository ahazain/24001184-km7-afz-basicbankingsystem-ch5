const akun = require("../models/akunModels");
const users = require("../models/usersModels");
class akunControllers {
  static async showAccounts(req, res) {
    try {
      const data = await akun.getAkun();
      if (!data) {
        res.status(409).json({ mesage: "Daftar akun tidak ada" });
      }
      res.status(201).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ mesage: "terjadi kesalahan pada server", error: error.mesage });
    }
  }
  static async showAccountsId(req, res) {
    try {
      const data = await akun.getAkunId(req.params.accountsId);
      if (!data) {
        return res.status(404).json({
          message: "Data tidak ada",
        });
      }
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({
        message: "Terjadi kesalahan pada server",
        error: error.message,
      });
    }
  }

  static async updateAccounts(req, res) {
    try {
      const data = await akun.putAkun(req.params.accountsId, req.body);
      res.status(201).json({
        message: "berhasil update akun",
        updateData: data,
      });
    } catch (error) {
      console.error("Error saat mnegupdate akun:", error);
      res.status(500).json({
        message: "akun gagal diupdate",
        error: error.message,
      });
    }
  }
  static async createAccounts(req, res) {
    try {
      const user = await users.getUsersId(req.body.userId);
      if (!user) {
        return res.status(404).json({ error: "User tidak ada" });
      }
      const data = await akun.postAkun(req.body);
      res.status(201).json({
        message: "berhasil membuat akun",
        insertData: data,
      });
    } catch (error) {
      console.error("Error saat menambahkan akun:", error);
      res.status(500).json({
        message: "akun gagal dibuat",
        error: error.message,
      });
    }
  }
  static async destroyAccounts(req, res) {
    try {
      const data = await akun.deleteAkun(req.params.accountsId);
      res.status(201).json({
        mesage: "data berhasil dihapus",
        data: data,
      });
    } catch (error) {
      if (error.code === "P2025") {
        // Kode error Prisma untuk "Record to delete does not exist"
        return res.status(404).json({
          message: "Data tidak ada",
        });
      }
      res.status(500).json({
        message: "Terjadi kesalahan pada server",
        error: error.message,
      });
    }
  }
}

module.exports = akunControllers;
