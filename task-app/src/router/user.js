const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/sendEmail');

const router = express.Router();

router.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = await user.createToken();

    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    const u = await user.save();
    await sendWelcomeEmail(user.name, user.email);

    const token = await user.createToken();

    res.status(201).send({ user: u, token });
  } catch(e) {
    res.status(400).send(e)
  }
});

// users/me/avatar post request atarak, avatar resmimizi yukleyelim.
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      callback(new Error('Sadece jpg, jpeg ve png dosyalarini gonderiniz.'))
    }
    callback(undefined, true);
  }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  req.user.avatar = req.file.buffer;
  await req.user.save();

  res.send({
    success: 'ok'
  });
}, (error, req, res, next) => {
  res.status(400).send({
    message: error.message
  });
});

router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send({
    success: 'ok'
  });
});

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user && user.avatar) {
      res.set('Content-Type', 'image/jpg');
      res.send(user.avatar);
    } else {
      res.status(400).send({
        message: 'Avatar resmi kayitli degil'
      });
    }
  } catch (e) {
    res.status(500).send();
  }
});

// get /users ve /users/:id
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users)
  } catch (e) {
    res.status(500).send()
  }
});

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

router.get('/users/logout', auth, async (req, res) => {
  try {
    const { user } = req;
    user.tokens = user.tokens.filter(token => token.token !== req.token);
    await user.save();

    res.send(user);

  } catch(e) {
    res.status(500).send();
  }
});

router.get('/users/logout/all', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

//put ile guncelleme servislerini acicaz. put /users/:id ve /tasks/:id
router.put('/users/me', auth, async (req, res) => {
  const allowedUpdates = ['name', 'password', 'email'];
  const keys = Object.keys(req.body);
  const isValid = keys.every(x => allowedUpdates.includes(x));

  if (!isValid) {
    return res.status(400).send('Istek gecersiz.');
  }

  try {
    keys.forEach(key => req.user[key] = req.body[key]);
    const newUser = await req.user.save();
    res.send(newUser);

  } catch(e) {
    res.status(500).send(e);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    await sendCancelationEmail(req.user.name, req.user.email);
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
