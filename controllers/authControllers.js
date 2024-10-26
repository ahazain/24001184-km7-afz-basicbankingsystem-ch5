const AuthService = require("../services/authServis");

class AuthControllers {
  static async register(req, res) {
    try {
      const regis = await AuthService.register(req.body);
      res
        .status(201)
        .json({ status: 201, message: "Berhasil", insertdata: regis });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        message: error.message || "Terjadi kesalahan pada server",
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.status(201).json({ status: 201, message: "Berhasil", token: token });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        message: error.message || "Terjadi kesalahan pada server",
      });
    }
  }

  static async showTransaksi(req, res) {
    try {
      const transactions = await AuthService.getTransaksi();
      res.status(200).json({ status: 200, data: transactions });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        message: error.message || "Terjadi kesalahan pada server",
      });
    }
  }
}

module.exports = AuthControllers;
