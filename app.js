const createError = require('http-errors');
const express = require('express');
const indexRouter = require('./routes');

const app = express();

//express compression
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  //todo check instance of error
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
