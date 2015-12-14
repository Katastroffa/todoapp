var config = require('./config'),
  express = require('express'),
  morgan = require('morgan'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  ejs = require('ejs');

module.exports = function() {
  var app = express();

  if (process.env.NODE_ENV ==='development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));

  app.set('views', 'views');
  app.set('view engine', 'ejs');

  app.use(express.static('public'));

  require('../routes/index.server.routes.js')(app);
  require('../routes/todo.server.routes.js')(app);
  return app;
}
