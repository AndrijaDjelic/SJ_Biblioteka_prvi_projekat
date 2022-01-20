const express = require('express');
const { sequelize, Books } = require('../models');
const { newBookValidation, updateBookValidation } = require('../validation.js');
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
  Books.findAll()
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));
});

route.get('/findById/:id', (req, res) => {
  Books.findOne({ where: { id: req.params.id } })
    .then(rows => res.json(rows))
    .catch(err => res.status(500).json(err));

});

/*
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
*/
route.post('/', (req, res) => {
  const validEntry = newBookValidation.validate(req.body);

  if (validEntry.error) {
    res.status(422).json({ msg: validEntry.error.message })
  } else {
    Books.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre
    })
      .then(rows => res.json(rows))
      .catch(err => res.status(500).json(err));
  }


});

route.put('/:id', (req, res) => {
  const validEntry = updateBookValidation.validate(req.body);

  if (validEntry.error) {
    res.status(422).json({ msg: validEntry.error.message })
  } else {
    Books.findOne({ where: { id: req.params.id } })
    .then(book => {
      book.title = req.body.title,
        book.author = req.body.author,
        book.genre = req.body.genre

      book.save()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
  }
  

});

route.delete('/:id', (req, res) => {
  Books.findOne({ where: { id: req.params.id } })
    .then(book => {
      book.destroy()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
});

module.exports = route;