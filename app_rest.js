const express = require('express');
const { sequelize, Users } = require('./models');
const cors = require('cors');


const booksRt = require('./routes/booksApi');
const rentBooksRt = require('./routes/rentbooksApi');
const usersRt = require('./routes/usersApi');

const app = express();

var corsOptions = {
    origin: ['http://127.0.0.1:8000', 'http://localhost:8000'],
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/admin/books', booksRt);
app.use('/admin/rentbooks', rentBooksRt);
app.use('/admin/users', usersRt);


app.listen({ port: 8500 }, async () => {
    await sequelize.authenticate();
    console.log("povezan app_rest");
});