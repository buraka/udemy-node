console.log('Merhaba js');

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search');

const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const address = search.value;
  fetch(`http://localhost:3000/forecast?address=${address}`).then(response => {
    response.json().then(data => {

      if (data.error) {
        p1.textContent = `Hata: ${data.error}`;
        p2.textContent = '';
      } else {
        p1.textContent = `Adres: ${address}`;
        p2.textContent = `Hava durumu: ${data.weather}`;
      }
    })
  });
});
