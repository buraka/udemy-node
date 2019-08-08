const jwt = require('jsonwebtoken');

const createToken = async () => {
  const token = await jwt.sign({ id: 'Abc1234' }, 'udemynode', { expiresIn: '2 seconds' });
  console.log(token);

  const obje = jwt.verify(token, 'udemynode');
  console.log(obje);
}

createToken();
