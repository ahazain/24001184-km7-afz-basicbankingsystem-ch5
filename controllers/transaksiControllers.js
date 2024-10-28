const transaksi = require("../services/transaksiServis");
class TransaksiControllers {
  static async showTransaksi(req, res) {
    try {
      const data = await transaksi.getAll();
      res.status(200).json({
        status: 200,
        message: "berhasil menampilkan daftar transaksi",
        insertData: data,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        message: error.message || "Terjadi kesalahan pada server",
      });
    }
  }

  static async showTransaksiId(req, res) {
    try {
      const data = await transaksi.getById(req.params.transactionId);
      res.status(200).json({
        status: 200,
        message: "berhasil menampilkan detail transaksi",
        data: data,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        message: error.message || "Terjadi kesalahan pada server",
      });
    }
  }
  static async createTransaksi(req, res) {
    const { sourceAccountId, destinationAccountId, amount } = req.body;

    try {
      const transaction = await transaksi.createTransaksi(
        sourceAccountId,
        destinationAccountId,
        amount
      );
      res.status(201).json({
        status: 201,
        message: "Transaksi berhasil",
        transaksi: transaction,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        message: error.message || "Terjadi kesalahan pada server",
      });
    }
  }
  static async destroyTransaksi(req, res) {
    try {
      const data = await transaksi.deleteTransaksi(req.params.transactionId);
      res.status(200).json({
        status: 200,
        message: "berhasil hapus Transaksi",
        data: data,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        message: error.message || "Terjadi kesalahan pada server",
      });
    }
  }
}
module.exports = TransaksiControllers;
