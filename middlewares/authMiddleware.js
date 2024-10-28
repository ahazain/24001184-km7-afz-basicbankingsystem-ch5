// const jwt = require("jsonwebtoken");
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1]; // Mengambil token dari header

//   if (!token) return res.status(401).json({ message: "Akses ditolak" }); // Jika tidak ada token

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: "Token tidak valid" }); // Jika token tidak valid
//     req.user = user; // Simpan informasi user
//     next(); // Lanjutkan ke rute berikutnya
//   });
// }

// module.exports = authenticateToken;
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : req.session.token;

  if (!token) {
    console.log("Token tidak ditemukan, arahkan ke /auth/login");
    return res.redirect("/auth/login");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token tidak valid:", err);
      return res.redirect("/auth/login");
    }
    req.user = user; // Simpan data user setelah verifikasi berhasil
    next();
  });
}

module.exports = authenticateToken;

module.exports = authenticateToken;
