const request = require('request');

const geocode = (address, callback) => {
  const geocodeUrl = 'https://api.opencagedata.com/geocode/v1/json?q=' + address + '&key=97e5c1270b774c259920ae4f56cbca62&language=tr&pretty=1'
  request({
    url: geocodeUrl,
    json: true
  }, (e, response) => {
    if (e) {
      callback(e, null);
    } else if (response.body.results.length === 0) {
      callback('Adres icin koordinat bilgisi bulunamadi.', null);
    } else {
      const { geometry } = response.body.results[0]
      const data = {
        lat: geometry.lat,
        lng: geometry.lng
      }
      callback(null, data);
    }
  })
};

module.exports = geocode;
