'use strict';

var _ = require('lodash');

function geojsonify (response) {
  return {
    type: 'FeatureCollection',
    features: response
                .filter(hasCoordinates)
                .map(feature)
  }
}

function hasCoordinates(item) {
  if (item.latlong[1] && item.latlong[0]) {
    return true
  }
  console.log('no coordinates', item)
  return false
}

function feature (item) {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [
        item.latlong[1],
        item.latlong[0]
      ]
    },
    properties: _.pick(item, [
      'channel',
      'location',
      'address',
      'city',
      'nature',
      'units'
      ])
  }
}
module.exports = geojsonify;