/*jshint esversion:6*/
const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const router = express.Router();
const mongoose = require('mongoose');
const bcryptSalt = 10;


router.get('/:id/edit', (req, res, next) => {
  // Iteration #6 (Bonus)
  const id = req.params.id;
  console.log("/:id/edit->" + id);
  User.findOne({
    _id: id
  }, function(err, user) {
    // if (err) return next(err);
    console.log('user->' + user);
    res.render('user/edit-profile', {
      user: user
    });

  });
});
////////////LLEGA HASTA AQUI!!!!//////////////////////////////////////////

router.post('/:id', (req, res, next) => {

  const id = req.params.id;
  console.log("ID -> " + id);
  const body = req.body;
  const {
    name,
    email,
    adress
  } = body;
  const criteria = {
    _id: id
  };
  const update = {
    $set: {
      name,
      email,
      adress
    }
  };
  User.updateOne(criteria, update, function(err, user) {
    if (err) return next(err);
    User.find({}, function(err, user) {
      if (err) return next(err);
      res.render('user/profile', {
        user: user
      });
    });
  });
});

router.get('/:id/delete', (req, res, next) => {

  const id = req.params.id;
  console.log(id);
  const criteria = {
    _id: id
  };
  User.remove(criteria, function(err) {
    console.log(err);
    if (err) return next(err);
    res.send('<p>Bye Bye</p>');
  });
});



module.exports = router;
