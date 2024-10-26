require("dotenv").config();

module.exports = {
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET, //harus ada agar bisa digunakan di endpoint yang lain
};

// secretKey: process.env.SECRET_KEY,
