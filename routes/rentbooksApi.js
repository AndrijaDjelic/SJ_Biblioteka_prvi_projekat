const express = require('express');
const { sequelize, RentBooks, Books } = require('../models');
const jwt = require('jsonwebtoken');
const rentbooks = require('../models/rentbooks');
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
    RentBooks.findAll(
        {
            include: [
                { model: Books, attributes: ['id', 'title', 'author', 'genre'], as: 'book' }
            ]
        })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));
});

route.get('/findById/:id', (req, res) => {
    RentBooks.findOne({
        where: { id: req.params.id },
        include: [
            { model: Books, attributes: ['id', 'title', 'author', 'genre'], as: 'book' }
        ]
    })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err));

});

/*
available: {
      type:DataTypes.BOOLEAN,
      allowNull: false
}
 this.belongsTo(Books, {foreignKey: 'bookId', as: 'book'});
*/

route.post('/', (req, res) => {
    RentBooks.create({
        available: req.body.available,
        bookId: req.body.bookId
    })
        .then(rentbook => {
            RentBooks.findOne({
                where: { id: rentbook.id },
                include: [
                    { model: Books, attributes: ['id', 'title', 'author', 'genre'], as: 'book' }
                ]
            }).then(rows => res.json(rows))
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));

});

route.put('/:id', (req, res) => {
    RentBooks.findOne({ where: { id: req.params.id } })
        .then(rentbooks => {
            rentbooks.available = req.body.available,
                rentbooks.bookId = req.body.bookId

            rentbooks.save()
                .then(rentbook => {
                    RentBooks.findOne({
                        where: { id: rentbook.id },
                        include: [
                            { model: Books, attributes: ['id', 'title', 'author', 'genre'], as: 'book' }
                        ]
                    }).then(rows => res.json(rows))
                        .catch(err => res.status(500).json(err));
                })
        })
        .catch(err => res.status(500).json(err));

});

route.delete('/:id', (req, res) => {

    RentBooks.findOne({
        where: { id: req.params.id },
        include: [
            { model: Books, attributes: ['id', 'title', 'author', 'genre'], as: 'book' }
        ]
        })
        .then(rentbooks => {
            rentbooks.destroy()
                .then(rows => res.json(rows))
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
});


module.exports = route;