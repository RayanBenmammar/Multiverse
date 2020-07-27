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

router.post('/', async (req, res) => {
  try {
    const {
      name, type, description, picture
    } = req.body;
    const user ={};
    user.name = name;
    user.type = type;
    user.description = description;
    user.picture = picture;

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

module.exports = router;
