const express = require("express");
const bodyParser = require("body-parser");

const modifyRoutes = require("./routes/modify-routes");
const app = express();
app.use(modifyRoutes);
app.listen(5000);
