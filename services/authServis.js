const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersModels = require("../models/usersModels");
const usersTransaksi = require("../models/transaksiModels");

class AuthServis {
  static async register(data) {
    const { email, password, ...rest } = data;
    const existingUser = await usersModels.findUserByemail(email);
    if (existingUser) {
      const error = new Error("Email sudah terdaftar");
      error.statusCode = 409;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return await usersModels.postUsers({
      ...rest,
      email,
      password: hashedPassword,
    });
  }

  static async login(email, password) {
    const user = await usersModels.findUserByemail(email); // perbaiki nama metode
    if (!user) {
      const error = new Error("Email atau password salah");
      error.statusCode = 401;
      throw error;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Email atau password salah");

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  }
  static async getTransaksi() {
    return await usersTransaksi.getTransaksi();
  }
}

module.exports = AuthServis;
