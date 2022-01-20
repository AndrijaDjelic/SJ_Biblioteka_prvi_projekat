const express = require('express');
const { sequelize, Users } = require('../models');
const { newUserValidation, updateUserValidation } = require('../validation.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const route = express.Router();//ovaj ruter dole exportujemo
route.use(express.json());//da bi nam tumacio sadrzaj kao json
route.use(express.urlencoded({ extended: true }));//kada budemo iz fron tend komunicirali da ume da protumaci podatke iz forme i da ih stavi u js obj

function authToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ msg: "err" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

    if (err) return res.status(403).json({ msg: err });

    req.user = user;

    next();
  });
}
route.use(authToken);

route.get('/all', (req, res) => {
  Users.findAll()
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
});

route.get('/findById/:id', (req, res) => {
  Users.findOne({ where: { id: req.params.id } })
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));

});

/*
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      } 
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      } 
    }
*/
const bcrypt = require('bcrypt');
route.post('/', (req, res) => {
  const validEntry = newUserValidation.validate(req.body);

  if (validEntry.error) {
    res.status(422).json({ msg: validEntry.error.message })
  } else {
    Users.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      role: req.body.role
    })
      .then(rows => res.json(rows))
      .catch(err => res.status(500).json(err));
  }
});

route.put('/:id', (req, res) => {
  const validEntry = updateUserValidation.validate(req.body);

  if (validEntry.error) {
    res.status(422).json({ msg: validEntry.error.message })
  } else {
    Users.findOne({ where: { id: req.params.id } })
      .then(user => {
        user.username = req.body.username,
          user.password = bcrypt.hashSync(req.body.password, 10),
          user.role = req.body.role

        user.save()
          .then(rows => res.json(rows))
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  }


});

route.delete('/:id', (req, res) => {
  Users.findOne({ where: { id: req.params.id } })
    .then(user => {
      user.destroy()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
});
module.exports = route;

