const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./common/geocode');
const weather = require('./common/weather');

//template ve public icin urller
const templatesUrl = path.join(__dirname, '../templates');
const publicPathUrl = path.join(__dirname, '../public');
const partialsPathUrl = path.join(__dirname, '../templates/partials');

const app = express();

//view engine ve views'i guncelle
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates'));

hbs.registerPartials(partialsPathUrl);

//public klasorunu servis et.
app.use(express.static(publicPathUrl));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Ana sayfa',
    body: 'ara metin'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Hakkında',
    body: 'Hakkımızda ....'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Yardım'
  })
});

app.get('/forecast', (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: 'Adres bilgisini giriniz.'
    })
  }

  geocode(address, (error, response) => {
    if (error) {
      console.log(error);
      res.send({
        error: 'Bir hata olustu...'
      });
    } else {
      weather(response.lat, response.lng, (e, r) => {
        if (e) {
          console.log(e);
          res.send({
            error: 'Lokasyon bilgisi bulunamadi.'
          });
        } else {
          const { temperature, windSpeed } = r.body.currently;
          const celTemp = (temperature - 32) * 5 / 9;
          res.send({
            address: address,
            weather: `Bugun hava ${celTemp} derece ve ${windSpeed} ruzgar siddeti var.`
          });
        }
      })
    }
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Sayfa bulunamadı.'
  })
});

app.listen(3000, () => {
  console.log('3000 portunda serveriniz ayaktadir.')
});
