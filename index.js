const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config/config");
const routes = require("./route/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerConfig");
const port = config.port;

app.use(bodyParser.json());

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Main API routes
app.use("/api/v1", routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
