var interceptor = require('rest/interceptor');

var cheerio = require('cheerio');

var _ = require('lodash');

function initial(idx){
  return idx !== 0 && idx !== 1; // ignore first and second element
}

var cities = {
  TMP: 'Tempe',
  SCT: 'Scottsdale',
  PHX: 'Phoenix'
};

var scrape = interceptor({
  success: function(body){
    var $ = cheerio.load(body);

    var $dataRows = $('#StatusGrid').children().filter(initial);

    var data = _.map($dataRows, function(row){
      var $cells = $(row).find('td');

      var location = $cells.eq(1).text();
      var locationParts = location.split(/\s\,/);

      var $units = $cells.eq(3).find('span');
      var units = _.map($units, function(unit){
        var $unit = $(unit);
        return {
          number: $unit.text(),
          description: $unit.attr('title')
        };
      });

      var cityAbbr = locationParts[1];
      var city = cities[cityAbbr];

      var out = {
        channel: $cells.eq(0).text(),
        location: location,
        address: locationParts[0],
        city: city || cityAbbr,
        nature: $cells.eq(2).text(),
        units: units
      };

      return out;
    });

    return data;
  }
});

module.exports = scrape;
