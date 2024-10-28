const usersServis = require("../services/usersServis");
class UsersControlers {
  static async showUsers(req, res) {
    try {
      const data = await usersServis.getAllusers();
      res.status(200).json({
        status: 200,
        message: "Berhasil menampilkan daftar user",
        data: data,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        message: error.message || "Terjadi kesalahan pada server",
      });
    }
  }
  static async showUsersId(req, res) {
    try {
      const data = await usersServis.getById(req.params.usersId);
      res.status(200).json({
        status: 200,
        message: "berhasil menampilkan detail user",
        data: data,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        message: error.message || "Terjadi kesalahan pada server",
      });
    }
  }
  static async createUsers(req, res) {
    try {
      const data = await usersServis.servisCreateUsers(req.body);
      res.status(201).json({
        status: 201,
        message: "Data user berhasil ditambahkan",
        insertData: data,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        message: error.message || "Terjadi kesalahan pada server",
      });
    }
  }
  static async updateUsers(req, res) {
    console.log("Body request:", req.body);
    try {
      const data = await usersServis.servisUpdateUser(
        req.params.usersId,
        req.body,
        { new: true }
      );
      res.status(200).json({
        status: 200,
        message: "Data user berhasil diupdate",
        updateUsers: data,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        message: error.message || "Terjadi kesalahan pada server",
      });
    }
  }
  static async destroyUsers(req, res) {
    try {
      const data = await usersServis.deleteUser(req.params.usersId);
      res
        .status(200)
        .json({ status: 200, message: "data berhasil dihapus", data: data });
    } catch (error) {
      const status = error.statusCode || 500;
      res.status(status).json({
        message: error.message || "Terjadi kesalahan pada server",
      });
    }
  }
}

module.exports = UsersControlers;
