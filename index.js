const config = require("./configs/config");
const path = require("path");
const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerConfig");
const routesUser = require("./routes/routesUser");
const routesAkun = require("./routes/routesAkun");
const routesTransaksi = require("./routes/routesTransaksi");
const routesAuth = require("./routes/routesAuth");
const app = express();
const port = config.port; 

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

  app.use(
    session({
      secret: config.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", routesAuth);
app.use("/api/v1", routesUser);
app.use("/api/v1", routesAkun);
app.use("/api/v1", routesTransaksi);

app.use((req, res, next) => {
  console.log("Session token:", req.session.token);
  next();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log("JWT_SECRET:", config.JWT_SECRET);
});


module.exports = app;
