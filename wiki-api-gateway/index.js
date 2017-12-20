const express = require('express');
const cookieParser = require('cookie-parser');
const http = require('http');
const app = express();
const server = http.createServer(app);

const httpProxy = require('express-http-proxy');

const apiVersion = 'v1';
const uriPrefix = '/api/' + apiVersion;

const pagePostPutProxy = httpProxy('http://wiki-pages-postput:8181');
const pageGetProxy = httpProxy('http://wiki-pages-get:3000');

const tokenChecker = require('./tokenChecker');
const userHost = 'wiki-user';
const userPort = 4000;
const userProxy = httpProxy('http://' + userHost + ':' + userPort);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE, HEAD");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cookieParser());

app.use( tokenChecker(userHost, userPort, uriPrefix) );

app.get(uriPrefix + '/pages', pageGetProxy);
app.get(uriPrefix + '/pages*', pageGetProxy);

//missing auth
app.post(uriPrefix + '/pages', pagePostPutProxy);
app.post(uriPrefix + '/pages*', pagePostPutProxy);
app.put(uriPrefix + '/pages', pagePostPutProxy);
app.put(uriPrefix + '/pages*', pagePostPutProxy);

app.all(uriPrefix + '/users', userProxy);
app.all(uriPrefix + '/users*', userProxy);
app.all(uriPrefix + '/newuser', userProxy);
app.all(uriPrefix + '/newuser*', userProxy);
app.all(uriPrefix + '/request', userProxy);
app.all(uriPrefix + '/request*', userProxy);
app.all(uriPrefix + '/reset', userProxy);
app.all(uriPrefix + '/reset*', userProxy);
app.all(uriPrefix + '/login', userProxy);
app.all(uriPrefix + '/login*', userProxy);
app.all(uriPrefix + '/logout', userProxy);
app.all(uriPrefix + '/logout*', userProxy);

app.use((req, res) => res.status(404).json("Route missing from API gateway."));

app.listen(8080);
