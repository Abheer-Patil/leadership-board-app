const express = require("express");

const path = require("path");

const { requestLogger } = require("./middlewares/interceptor");

const { router } = require("./routes/index");

const app = express();

app.use(cors());

require("dotenv").config();

const config = require("./config/index");

const bodyparser = require("body-parser");

const port = require("./config/index");

const bodyParser = require("body-parser");

const PORT = port.getPortConfig();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(requestLogger);
app.use("/", router);

var server = app.listen(PORT, () => {
  console.log("Listening on ", PORT);
});
