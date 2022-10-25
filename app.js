const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");
const mongoose = require("mongoose");
const cors = require("cors");

const mcesRoutes = require("./routes/mces-routes");
const mcjhsRoutes = require("./routes/mcjhs-routes");
const mcshsRoutes = require("./routes/mcshs-routes");
const mcescRoutes = require("./routes/mces-contestants-routes");
const mcjhscRoutes = require("./routes/mcjhs-contestants-routes");
const mcshscRoutes = require("./routes/mcshs-contestants-routes");
const mcesmRoutes = require("./routes/mces-meta-routes");
const mcjhsmRoutes = require("./routes/mcjhs-meta-routes");
const mcshsmRoutes = require("./routes/mcshs-meta-routes");
const usersRoutes = require("./routes/users-routes");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/mces", mcesRoutes);
app.use("/api/mcjhs", mcjhsRoutes);
app.use("/api/mcshs", mcshsRoutes);
app.use("/api/mcesc", mcescRoutes);
app.use("/api/mcjhsc", mcjhscRoutes);
app.use("/api/mcshsc", mcshscRoutes);
app.use("/api/mcesm", mcesmRoutes);
app.use("/api/mcjhsm", mcjhsmRoutes);
app.use("/api/mcshsm", mcshsmRoutes);
app.use("/api/users", usersRoutes);
app.use((req, res, next) => {
  throw new HttpError("Could not find this route.", 404);
});
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});
mongoose
  .connect(
    "mongodb+srv://fajarmaulana-dev:c4rT4G321@cluster0.r4ihdsy.mongodb.net/fim?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .catch((err) => {
    console.log(err);
  });
