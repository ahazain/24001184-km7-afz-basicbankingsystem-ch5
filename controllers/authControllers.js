const AuthService = require("../services/authServis");
const data = require("../models/usersModels");
class AuthController {
  static renderRegister(req, res) {
    res.render("register");
  }

  static async autentifikasi(req, res) {
    try {
      const user = await data.getUsers();
      res.render("autentifikasi", { user });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message || "Terjadi kesalahan pada server",
      });
    }
  }

  static async register(req, res) {
    try {
      console.log("Request Body Sebelum:", req.body);

      if (typeof req.body.profile !== "object" || req.body.profile === null) {
        req.body.profile = {
          identify_type: req.body["profile.identify_type"],
          identify_number: req.body["profile.identify_number"],
          address: req.body["profile.address"],
        };
        delete req.body["profile.identify_type"];
        delete req.body["profile.identify_number"];
        delete req.body["profile.address"];
      }

      console.log("Request Body sesudah:", req.body);
      const user = await AuthService.register(req.body);

      if (req.is("application/json")) {
        return res.status(201).json({
          message: "Register sukses",
          status: 201,
          data: user,
        });
      }

      req.flash("success", "Register sukses, silahkan login");
      return res.redirect("/auth/login");
    } catch (error) {
      const status = error.statusCode || 500;
      if (req.is("application/json")) {
        return res.status(status).json({
          message: error.message || "Terjadi kesalahan pada server",
        });
      }

      req.flash("error", "Terjadi kesalahan, input kembali");
      return res.redirect("/auth/register");
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const { token, user } = await AuthService.login(email, password);

      if (req.is("application/json")) {
        return res
          .status(200)
          .json({ message: "Login sukses", token, user });
      } else {
        req.session.token = token;
        console.log("Token tersimpan di session:", req.session.token);

        req.flash("success", "Login berhasil");
        return res.redirect("/auth/authentication");
      }
    } catch (error) {
      const status = error.statusCode || 500;
      if (req.is("application/json")) {
        return res.status(status).json({
          message: error.message || "Terjadi kesalahan pada server",
        });
      }

      req.flash("error", error.message || "Email atau password tidak valid");
      return res.redirect("/auth/login");
    }
  }

  static renderLogin(req, res) {
    res.render("login");
  }
}

module.exports = AuthController;
