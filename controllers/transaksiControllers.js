const transaksi = require("../models/transaksiModels");
class transaksiControllers {
  static async showTransaksi(req, res) {
    try {
      const data = await transaksi.getTransaksi();
      res.status(201).json(data);
    } catch (error) {
      console.error("Error retrieving transactions:", error);
      res.status(500).json({ error: "error menampilkan transaksi" });
    }
  }
  static async showTransaksiId(req, res) {
    try {
      const data = await transaksi.getTransaksiId(req.params.transactionId);
      if (!data) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      res.status(201).json(data);
    } catch (error) {
      console.error("Error retrieving transaction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  static async createTransaksi(req, res) {
    const { sourceAccountId, destinationAccountId, amount } = req.body;

    try {
      if (!sourceAccountId || !destinationAccountId || amount <= 0) {
        return res.status(400).json({ error: "masukkan amount yang benar" });
      }

      const transaction = await transaksi.postTransaction(
        sourceAccountId,
        destinationAccountId,
        amount
      );
      res.status(201).json({ message: "Transaksi berhasil", transaction });
    } catch (error) {
      console.error("Error processing transaction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  static async updateTransaksi(req, res) {
    const { sourceAccountId, destinationAccountId, amount } = req.body;

    try {
      if (!sourceAccountId || !destinationAccountId || amount <= 0) {
        return res.status(400).json({ error: "Invalid request body" });
      }

      const transaction = await transaksi.putTransaction(
        req.params.transactionId,
        sourceAccountId,
        destinationAccountId,
        amount
      );

      res
        .status(201)
        .json({ message: "Update transaksi berhasil", transaction });
    } catch (error) {
      console.error("Error processing transaction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  static async destroyTransaksi(req, res) {
    try {
      const data = await transaksi.deleteTransaksi(req.params.transactionId);
      if (!data) {
        return res.status(404).json({ message: "Tidak ada Transaksi" });
      }
      res
        .status(201)
        .json({ masssage: "berhasil hapus Transaksi", data: data });
    } catch (error) {
      console.error("Terjadi kesalahan pada server:", error);
      res.status(500).json({ error: "Terjadi kesalah pada server" });
    }
  }
}
module.exports = transaksiControllers;
