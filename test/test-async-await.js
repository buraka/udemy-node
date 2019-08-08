const sum = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
      // reject('hata');
    }, 2000);
  })
}

const work = async () => {
  try {
    const result = await sum(2, 3);
    const result2 = await sum(result, 5);
    console.log(result2);
  } catch (e) {
    console.log(e);
  }
}

work();
// sum(2,3).then(result => {
//   console.log(result);
// });
