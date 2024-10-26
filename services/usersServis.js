const usersModels = require("../models/usersModels");
class usersServis {
  static async getAllusers() {
    const data = await usersModels.getUsers();
    if (!data || data.length === 0) {
      const error = new Error("Daftar Users tidak ada");
      error.statusCode = 404;
      throw error;
    }
    return data;
  }
  static async getById(usersId) {
    const data = await usersModels.getUsersId(usersId);
    if (!data || data.length === 0) {
      const error = new Error("Data user dan profil tidak ada");
      error.statusCode = 404;
      throw error;
    }
    return data;
  }

  static async servisCreateUsers(data) {
    // Validasi data
    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.profile ||
      !data.profile.identify_number ||
      !data.profile.identify_type ||
      !data.profile.address
    ) {
      if (
        !data.name &&
        !data.email &&
        !data.password &&
        !data.profile &&
        !data.profile.identify_number &&
        !data.profile.identify_type &&
        !data.profile.address
      ) {
        const error = new Error("mohon lengkapi data yang ada");
        error.statusCode = 400;
        throw error;
      }
      const missingFields = [];
      if (!data.name) missingFields.push("name");
      if (!data.email) missingFields.push("email");
      if (!data.password) missingFields.push("password");
      if (!data.profile) {
        missingFields.push("profile");
      } else {
        if (!data.profile.identify_type)
          missingFields.push("tipe identitas profil");
        if (!data.profile.identify_number)
          missingFields.push("nomor identitas profil");
        if (!data.profile.address) missingFields.push("alamat profil");
      }

      if (missingFields.length > 0) {
        const error = new Error(
          `Data yang diperlukan tidak lengkap: ${missingFields.join(", ")}`
        );
        error.statusCode = 400; // Bad Request
        throw error;
      }
    }

    // Cek apakah email sudah ada
    const existingUser = await usersModels.findUserByemail;
    if (existingUser) {
      const error = new Error("Email sudah terdaftar.");
      error.statusCode = 400; // Bad Request
      throw error;
    }
    // Jika semua validasi lulus, simpan ke database
    return await usersModels.postUsers(data);
  }

  static async servisUpdateUser(usersId, data) {
    const cekId = await usersModels.getUsersId(usersId);
    if (!cekId) {
      const error = new Error("Data pengguna tidak ada untuk diupdate");
      error.statusCode = 404;
      throw error;
    }
    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.profile.identify_number ||
      !data.profile.identify_type ||
      !data.profile.address
    ) {
      if (
        !data.name &&
        !data.email &&
        !data.password &&
        !data.profile.identify_number &&
        !data.profile.identify_type &&
        !data.profile.address
      ) {
        const error = new Error("Mohon isi semua data yang ada");
        error.statusCode = 400;
        throw error;
      }

      const missingFields = [];
      if (!data.name) missingFields.push("name");
      if (!data.email) missingFields.push("email");
      if (!data.password) missingFields.push("password");

      if (!data.profile) {
        missingFields.push("profile");
      } else {
        if (!data.profile.identify_type)
          missingFields.push("tipe identitas profil");
        if (!data.profile.identify_number)
          missingFields.push("nomor identitas profil");
        if (!data.profile.address) missingFields.push("alamat profil");
      }

      // Jika ada field yang hilang, lemparkan error
      if (missingFields.length > 0) {
        const error = new Error(
          `Data yang diperlukan tidak lengkap: ${missingFields.join(", ")}`
        );
        error.statusCode = 400; // Bad Request
        throw error;
      }

      // Cek apakah email sudah ada
      const existingUser = await usersModels.findUserByemail;
      if (existingUser) {
        const error = new Error("Email sudah terdaftar.");
        error.statusCode = 400; // Bad Request
        throw error;
      }
      // Jika semua validasi lulus, simpan ke database
      return await usersModels.postUsers(data);
    }
  }
}

module.exports = usersServis;
