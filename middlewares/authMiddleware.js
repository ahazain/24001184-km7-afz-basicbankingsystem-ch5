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
    req.user = user; 
    next();
  });
}

module.exports = authenticateToken;

module.exports = authenticateToken;
