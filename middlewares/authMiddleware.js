const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : req.session.token;
  
  if (!token) { 
    console.log("Token tidak ditemukan, arahkan ke /auth/login");
    if (
      req.is("application/json") ||
      req.headers["accept"] === "application/json"
    ) {
      return res.status(401).json({
        message: "Tidak terautentikasi, token tidak ditemukan",
      });
    } else {
      return res.redirect("/auth/login");
    }
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token tidak valid:", err);
      if (
        req.is("application/json") ||
        req.headers["accept"] === "application/json"
      ) {
        return res.status(401).json({
          message: "Tidak terautentikasi, token tidak valid",
        });
      } else {
        return res.redirect("/auth/login");
      }
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
