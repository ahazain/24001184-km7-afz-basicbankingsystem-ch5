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

      req.body.profile = {
        identify_type: req.body["profile.identify_type"],
        identify_number: req.body["profile.identify_number"],
        address: req.body["profile.address"],
      };
      console.log("Request Body duplikat:", req.body);

      delete req.body["profile.identify_type"];
      delete req.body["profile.identify_number"];
      delete req.body["profile.address"];

      console.log("Request Body sesuai service:", req.body);

      await AuthService.register(req.body);
      req.flash("success", "Register success, please login");
      return res.status(201).redirect("/auth/login");
    } catch (error) {
      console.error(error);
      req.flash("error", "Something went wrong, please try again.");
      return res.redirect("/auth/register");
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    const { token, user } = await AuthService.login(email, password);

    if (req.headers["content-type"] === "application/json") {
      return res.status(200).json({ message: "Login successful", token, user });
    } else {
      req.session.token = token;
      console.log("Token tersimpan di session:", req.session.token);

      req.flash("success", "Login berhasil");
      return res.redirect("/auth/authentication");
    }
  }
  catch(error) {
    req.flash("error", error.message || "Email atau password salah");
    return res.redirect("/auth/login");
  }

  static renderLogin(req, res) {
    res.render("login");
  }
}

module.exports = AuthController;
