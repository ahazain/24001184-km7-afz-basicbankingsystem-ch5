const config = require("./configs/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routesUser = require("./routes/routesUser");
const routesAkun = require("./routes/routesAkun");
const routesTransaksi = require("./routes/routesTransaksi");
const routesAuth = require("./routes/routesAuth");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerConfig");
const port = config.port;

app.use(bodyParser.json());

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", routesAuth);
// Main API routes
app.use("/api/v1", routesUser);
app.use("/api/v1", routesAkun);
app.use("/api/v1", routesTransaksi);
console.log("JWT_SECRET:", process.env.JWT_SECRET); // Tambahkan ini sebelum pemakaian

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
