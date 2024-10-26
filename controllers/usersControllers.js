const usersServis = require("../services/usersServis");
class usersControlers {
  static async showUsers(req, res) {
    try {
      const data = await usersServis.getAllusers(); // Memanggil service untuk mendapatkan data
      res.status(200).json({
        message: "Berhasil",
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
      res.status(200).json(data);
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
    try {
      console.log("Body request:", req.body);
      const data = await usersServis.servisUpdateUser(
        req.params.usersId,
        req.body
      );
      res.status(200).json({
        message: "Data user berhasil diupdate",
        updatedData: data,
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
      const data = await users.getUsersId(req.params.usersId);
      if (!data) {
        return res.status(404).json({
          message: "Data tidak ada",
        });
      }
      res
        .status(200)
        .json({ message: "data berhasil dihapus", insertData: data });
    } catch (error) {
      res.status(500).json({
        message: "Terjadi kesalahan pada server",
        error: error.message,
      });
    }
  }
}

module.exports = usersControlers;
