'use strict';

var scrape = require('./lib/scrape');
var geocode = require('./lib/geocode');

var Hapi = require('hapi');

var server = new Hapi.Server('0.0.0.0', 3000, {
  cors: true,
  debug: {
    request: ['error']
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply){
    scrape()
      .then(geocode)
      .then(reply)
      .otherwise(reply);
  }
});

server.route({
  method: 'GET',
  path: '/{path*}',
  handler: {
    directory: {
      path: __dirname + '/public'
    }
  }
});

server.start(function () {
  console.log('Server started at: ' + server.info.uri);
});
