const request = require('request');

const weather = (lat, lng, callback) => {
  const weatherApiUrl = 'https://api.darksky.net/forecast/73992d27a756e72e58a87aa35a69c76e/' + lat + ',' + lng;
  request({
    url: weatherApiUrl,
    json: true
  }, (error, response) => {
    callback(error, response);
  });
};

module.exports = weather;
