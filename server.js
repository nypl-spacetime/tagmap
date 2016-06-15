var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('config');

var __DEV__ = process.env.NODE_ENV === 'development';

const PORT = process.env.PORT || config.port

var app = express();

if (__DEV__) {
  var webpackConfig = require('./webpack.config.dev');
  var compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static(path.join(__dirname, __DEV__ ? 'app' : 'dist')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, __DEV__ ? 'app' : 'dist', 'index.html'), null, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
  });
});

app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.info('==> 🌍  Listening on port ' + PORT + '. Open http://0.0.0.0:' + PORT + ' in your browser');
});
