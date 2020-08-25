const { Router } = require('express');
const { User } = require('../../models');

const router = new Router();

router.get('/', (req, res) => {
  User.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    })
})

router.get('/findById/:id', (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

router.post('/', async (req, res) => {
  try {
    const {
      name, type, description, picture,favs, likes, userFavs,
    } = req.body;
    const user = {};
    user.name = name;
    user.type = type;
    user.description = description;
    user.picture = picture;
    user.favs = favs;
    user.likes = likes;
    user.userFavs = userFavs;
    const userModel = new User(user);
    await userModel.save((err) =>{
      if (err) {
        console.log('Ooops, something gone wrong');
      } else {
        console.log('Data has been saved! ');
      }
    });
    res.status(201).json(userModel);

  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
})

router.put('/favs/:id', (req, res) => {
  try {
    const ObjectID = require('mongodb').ObjectID;
    User.updateOne(
      { _id: ObjectID(req.params.id) }, // Filter
      { $set: { favs: req.body.favs } }, // Update
    )
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
    res.status(201);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end();
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err.toString());
    }
  }
});

router.put('/likes/:id', (req, res) => {
  try {
    const ObjectID = require('mongodb').ObjectID;
    User.updateOne(
      { _id: ObjectID(req.params.id) }, // Filter
      { $set: { likes: req.body.likes } }, // Update
    )
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
    res.status(201);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end();
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err.toString());
    }
  }
});

router.put('/userFavs/:id', (req, res) => {
  try {
    const ObjectID = require('mongodb').ObjectID;
    User.updateOne(
      { _id: ObjectID(req.params.id) }, // Filter
      { $set: { userFavs: req.body.userFavs } }, // Update
    )
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
    res.status(201);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end();
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err.toString());
    }
  }
});

module.exports = router;
