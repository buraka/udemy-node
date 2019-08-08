const geocode = (address, callback) => {
  setTimeout(() => {
    const result = {
      lat: 0,
      lon: 0
    };

    callback(null, result);
  }, 2000);
};

geocode('Istanbul', (error, response) => {
  console.log(response);
});
