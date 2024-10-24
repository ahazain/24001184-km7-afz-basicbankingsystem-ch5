const users = require("../models/usersModels");
class usersControlers {
  static async showUsers(req, res) {
    try {
      const data = await users.getUsers();
      if (!data) {
        return res.status(404).json({ message: "Daftar Users tidak ada" });
      }
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({
        message: "Terjadi kesalah pada server",
        error: error.message,
      });
    }
  }
  static async showUsersId(req, res) {
    try {
      const data = await users.getUsersId(req.params.usersId);
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
  static async createUsers(req, res) {
    try {
      const { email } = req.body;
      console.log("Body request:", req.body);
      const cekEmail = await users.findUserByemail(email);
      if (cekEmail) {
        res
          .status(409)
          .json({ massage: "Gunakan email lain. Email sudah ada di database" });
      }
      const data = await users.postUsers(req.body);
      res.status(201).json({
        message: "Data user berhasil ditambahkan",
        insertData: data,
      });
    } catch (error) {
      console.error("Error saat menambahkan user:", error);
      res.status(500).json({
        message: "data gagal ditambahkan",
        error: error.message,
      });
    }
  }
  static async updateUsers(req, res) {
    try {
      const { email } = req.body;
      console.log("Body request:", req.body);

      const cekEmail = await users.findUserByemail(email);
      if (cekEmail) {
        return res
          .status(409)
          .json({ message: "Gunakan email lain. Email sudah ada di database" });
      }

      const data = await users.putUsers(req.params.usersId, req.body);
      res.status(201).json({
        message: "Data user berhasil diupdate",
        updatedData: data,
      });
    } catch (error) {
      console.error("Error saat merubah data user:", error);
      res.status(500).json({
        message: "Data gagal diupdate",
        error: error.message,
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
