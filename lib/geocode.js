'use strict';

var _ = require('lodash');
var getobject = require('getobject');
var when = require('when');
var rest = require('rest');
var defaultRequest = require('rest/interceptor/defaultRequest');
var defaultRequest = require('rest/interceptor/defaultRequest');
var defaultRequest = require('rest/interceptor/defaultRequest');
var mime = require('rest/interceptor/mime');
var entity = require('rest/interceptor/entity');

var client = rest
  .chain(defaultRequest, {
    path: 'https://maps.googleapis.com/maps/api/geocode/json',
    params: { key: process.env.GOOGLE_MAPS_API_KEY, sensor: false }
  })
  .chain(mime, { mime: 'application/json' })
  .chain(entity);

function geocode(entries){
  return when.map(entries, function(entry){
    return client({
      params: { address: entry.address + ', ' + entry.city }
    })
    .then(function(location){
      return _.merge(entry, {
        latlong: [
          getobject.get(location, 'results.0.geometry.location.lat'),
          getobject.get(location, 'results.0.geometry.location.lng')
        ]
      });
    });
  });
}

module.exports = geocode;
