const request = require('request');
const geocode = require('./geocode');
const weather = require('./weather');

const address = process.argv[2];

if (!address) {
  console.log('Lutfen adres bilgisini girin.');
  return;
} else {
  geocode(address, (error, response) => {
    console.log(response);
    if (error) {
      console.log(error);
    } else {
      weather(response.lat, response.lng, (e, res) => {
        if (e) {
          console.log('Lokasyon bilgisi bulunamadi.');
        } else {
          const { temperature, windSpeed } = res.body.currently;
          const celTemp = (temperature - 32) * 5 / 9;
          console.log('Bugun hava %s derece ve %s ruzgar siddeti var.',
                    celTemp, windSpeed);
        }
      })
    }
  });
}
