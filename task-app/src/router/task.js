const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/task', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    user: req.user._id
  });

  try {
    const t = await task.save();
    res.status(201).send(t);
  } catch (e) {
    res.status(400).send(e)
  }
});

// const user = await req.user.populate({
//   path: 'tasks',
//   match: {
//     done
//   }
// }).execPopulate();
// res.send(user.tasks);

// /tasks?done=false&limit=3&skip=6&sort=description_desc
router.get('/tasks', auth, async (req, res) => {
  try {
    const done = req.query.done === 'true';
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const sort = {};
    if (req.query.sort) {
      const parts = req.query.sort.split('_');
      sort[parts[0]] = parts[1] === 'asc' ? 1 : -1;
    }

    const tasks = await Task.find({ user: req.user._id, done })
                        .limit(limit)
                        .skip(skip)
                        .sort(sort);
    res.send(tasks);

  } catch(e) {
    res.status(500).send();
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ _id: id, user: req.user._id })
    if (task) {
      res.send(task);
    } else {
      res.status(404).send();
    }
  } catch(e) {
    res.status(500).send()
  }
});

router.put('/tasks/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, user: req.user._id });
    if (!task) {
      res.status(404).send();
    }
    const keys = Object.keys(req.body);
    keys.forEach(key => task[key] = req.body[key]);
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// /tasks/:id delete
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, user: req.user._id });
    if (!task) {
      res.status(404).send();
    }
    await task.remove();
    res.send(task);
  } catch(e) {
    res.status(500).send();
  }
});

module.exports = router;
