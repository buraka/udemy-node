const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: Buffer
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error('Yas 0\'dan kucuk olamaz.')
      }
    }
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email standartlarina uymuyor.')
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'user'
});

userSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.tokens;

  return userObj;
}

userSchema.methods.createToken = async function() {
  const user = this;
  const token = await jwt.sign({ id: user._id.toString() }, process.env.JWT_PRIVATE_TOKEN);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
}

userSchema.statics.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Login basarisiz.');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Login basarisiz.');
  }

  return user;
}

userSchema.pre('remove', async function(next) {
  const user = this;
  await Task.deleteMany({ user: user._id });

  next();
});

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
