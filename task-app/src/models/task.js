const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  description: {
    type: String,
    minlength: 6,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
