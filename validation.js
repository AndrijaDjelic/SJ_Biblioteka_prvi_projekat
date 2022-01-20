const Joi = require("joi");

const newUserValidation = Joi.object({
    username : Joi.string().trim().min(1).required(),
    password : Joi.string().trim().min(1).required(),
    role : Joi.string().valid('admin','client','moderator').required()
});

const updateUserValidation = Joi.object({
    username : Joi.string().trim().min(1).required(),
    password : Joi.string().trim().min(1).required(),
    role : Joi.string().valid('admin','client','moderator').required()
});

const newBookValidation = Joi.object({
    title : Joi.string().trim().min(2).max(30).required(),
    author : Joi.string().pattern(/^[A-Za-z]+/).min(2).max(30),
    genre : Joi.string().valid('Horror','Thriller','Fantasy','Romance','Drama','Classic','Epic','Comedy','Psychology')
});
const updateBookValidation = Joi.object({
    title : Joi.string().trim().min(2).max(30).required(),
    author : Joi.string().pattern(/^[A-Za-z]+/).min(2).max(30),
    genre : Joi.string().valid('Horror','Thriller','Fantasy','Romance','Drama','Classic','Epic','Comedy','Psychology')
});

module.exports = {
    newUserValidation,
    updateUserValidation,
    newBookValidation,
    updateBookValidation
};