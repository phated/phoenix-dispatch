'use strict';

var scrape = require('./lib/scrape');

var Hapi = require('hapi');

var server = new Hapi.Server('0.0.0.0', 3000, {
  cors: true
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply){
    scrape().then(reply);
  }
});

server.start(function () {
  console.log('Server started at: ' + server.info.uri);
});
