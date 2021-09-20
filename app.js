const express = require("express");
const bodyParser = require("body-parser");

// load our own helper functions
const encode = require("./demo/encode");
const decode = require("./demo/decode");
const shortenUrlRouter = require("./routes/shorten_url");
const expandUrlRouter = require("./routes/expand_url");
const directUrlRouter =  require("./routes/some_hash");
const app = express();

app.use(express.json());

app.use(bodyParser.json());


// TODO: Implement functionalities specified in README
app.use('', directUrlRouter);
app.use('/shorten-url', shortenUrlRouter);
app.use('/expand-url', expandUrlRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
