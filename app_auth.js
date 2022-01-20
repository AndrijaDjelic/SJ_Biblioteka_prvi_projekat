const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();  

var corsOptions = {
    origin: ['http://127.0.0.1:8000', 'http://localhost:8000'],
    //origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());



app.post('/register', (req, res) => {
    const obj = {
        username: req.body.username,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, 10)
    };

    Users.create(obj).then(rows => {

        const usr = {
            userId: rows.id,
            username: rows.username,
            role: usr.role
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

        console.log(token);

        res.json({ token: token });

    }).catch(err => res.status(500).json(err));
});

app.post('/login', (req, res) => {
    console.log('Pozvan post login port 9000');
    Users.findOne({ where: { username: req.body.username } })
        .then(usr => {
            console.log(`Sifra u bazi ${usr.password}, Sifra u login ${req.body.password}`);
            if (bcrypt.compareSync(req.body.password, usr.password) && usr.role=='admin') {
                console.log('Tacna sifra');
                const obj = {
                    userId: usr.id,
                    username: usr.username,
                    role: usr.role
                };

                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);

                res.json({ token: token });
            } else {
                console.log('Pogresna sifra');
                res.status(400).json({ msg: "Invalid credentials" });
            }
        })
        .catch(err => res.status(500).json(err));
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
    console.log("povezan app_auth");
});