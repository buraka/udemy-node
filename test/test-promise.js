const geocode = new Promise((resolve, reject) => {
  setTimeout(() => {
    const result = {
      lat: 0,
      lon: 0
    };
    // resolve(result);
    reject(result);
  }, 2000);
});

geocode.then((result) => {
  console.log('then fonksiyonu: ' + result.lat);
}).catch((err) => {
  console.log('catch fonksiyonu: ' + err.lon);
});

//                        -> resolve ( then )
//  promise --- bekleme
//                        -> reject ( catch )
