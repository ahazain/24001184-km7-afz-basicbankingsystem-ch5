const AkunServis = require("../services/akunServis");
class AkunControllers {
  static async showAccounts(req, res) {
    try {
      const data = await AkunServis.getAllAkun();
      res.status(200).json({
        status: 200,
        message: "berhasil menampilkan daftar akun",
        data: data,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      res
        .status(status)
        .json({ message: error.message || "Terjadi Kesalahan pada server" });
    }
  }
  static async showAccountsId(req, res) {
    try {
      const data = await AkunServis.getById(req.params.accountsId);
      res.status(200).json({
        status: 200,
        message: "berhasil menampilkan detail akun",
        data: data,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        message: error.message || "Terjadi kesalahan pada server",
      });
    }
  }

  static async updateAccounts(req, res) {
    try {
      const data = await AkunServis.editAkun(req.params.accountsId, req.body);
      res.status(200).json({
        status: 200,
        message: "berhasil update akun",
        updateData: data,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        message: error.message || "Terjadi kesalahan pada server",
      });
    }
  }
  static async createAccounts(req, res) {
    try {
      const user = await AkunServis.createAkun(req.body);
      res.status(201).json({
        status: 201,
        message: "berhasil membuat akun",
        insertData: user,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        message: error.message || "Terjadi kesalahan pada server",
      });
    }
  }
  static async destroyAccounts(req, res) {
    try {
      const data = await AkunServis.deleteAkunServis(req.params.accountsId);
      res.status(200).json({
        status: 200,
        message: "data berhasil dihapus",
        data: data,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      res
        .status(status)
        .json({ message: error.message || "Terjadi kesalahan pada server" });
    }
  }
}

module.exports = AkunControllers;


