const bcrypt = require('bcrypt');

const hashPassword = async () => {
  const password = 'Abwqe123!';
  const hashedPassword = await bcrypt.hash(password, 8);

  console.log(password);
  console.log(hashedPassword);

  const isMatch = await bcrypt.compare('Abwqe123', hashedPassword);
  console.log(isMatch);
}

hashPassword();

// abc21341 - 1234uhnadsa9yhf3f41z -xxx- abc21341
// abc21231 - 123njdasadsm1ndsamas
