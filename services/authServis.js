const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersModels = require("../models/usersModels");
const usersTransaksi = require("../models/transaksiModels");
const config = require("../configs/config");

class AuthService {
  static async register(data) {
    const { name, email, password, profile } = data;
    const notUser = await usersModels.findUserByemail(email);
    if (notUser) {
      const error = new Error("Email sudah terdaftar");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await usersModels.postUsers({
      name,
      email,
      password: hashedPassword,
      profile: {
        identify_type: profile.identify_type,
        identify_number: profile.identify_number,
        address: profile.address,
      },
    });
  }
  static async login(email, password) {
    const user = await usersModels.findUserByemail(email);

    if (!user) {
      const error = new Error("Email or password is wrong");
      error.statusCode = 401;
      throw error;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const error = new Error("Email or password is wrong");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    return { token, user: { id: user.id, email: user.email } };
  }
}

module.exports = AuthService;
