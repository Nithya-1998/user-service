const express = require("express");
//const mongoose = require("mongoose");
//const mongoConnectionUri = "mongodb://localhost:27017/stock_market_db";
const routes = require("./routes/userdetails");
const bodyParser = require("body-parser");
const startMetricsServer = require("./metrics/metrics");
const swaggerDocs = require("./utils/swagger");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// mongoose.connect(mongoConnectionUri, () => {
//   console.log("Connected to DB");
// });
// const database = mongoose.connection;

// database.on("error", (error) => {
//   console.log("DB connection error", error);
// });

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ status: "I'm alive!" });
});
/**
 * /
 * /healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
app.use(
  "/healthcheck",
  require("express-healthcheck")({
    healthy: function () {
      return { everything: "is ok" };
    },
  })
);

app.use(express.json());

app.use("/users", routes);

const port = 8001;
app.listen(port, () => {
  console.log(`Server Started at ${port}`);

  startMetricsServer();
  swaggerDocs(app, port);
});
