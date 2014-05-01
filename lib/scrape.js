'use strict';

var rest = require('rest');
var defaultRequest = require('rest/interceptor/defaultRequest');
var errorCode = require('rest/interceptor/errorCode');
var entity = require('rest/interceptor/entity');
var scrape = require('../interceptor/scrape');

var client = rest
  .chain(defaultRequest, { path: 'https://htms.phoenix.gov/publicweb/Default.aspx' })
  .chain(errorCode)
  .chain(entity)
  .chain(scrape);

module.exports = client;
