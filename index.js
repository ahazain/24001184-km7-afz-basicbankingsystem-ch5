const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config/config");
const routesUser = require("./route/routesUser");
const routesAkun = require("./route/routesAkun");
const routesTransaksi = require("./route/routesTransaksi");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerConfig");
const port = config.port;

app.use(bodyParser.json());

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Main API routes
app.use("/api/v1", routesUser);
app.use("/api/v1", routesAkun);
app.use("/api/v1", routesTransaksi);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
