const express = require("express");
const app = express();
const morgan = require("morgan");
const blocksRoutes = require("./api/routes/blocks");
const orderRoutes = require("./api/routes/orders");
const bodyParser = require("body-parser");
const frontend = require('./frontend/routes');
var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({
  partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'handlebars');


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((res, req, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use('', frontend);
app.use("/blocks", blocksRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
  const errorObj = new Error("These are not the droids you're looking for");
  errorObj.status = 404;
  next(errorObj);
});
app.use((errorObj, req, res, next) => {
  res.status(errorObj.status || 500);
  res.json({
    error: {
      message: errorObj.message
    }
  });
});

module.exports = app;
