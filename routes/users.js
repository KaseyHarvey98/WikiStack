const express = require('express');
const users = express.Router();

users.get('/', (req, res, next) => {
    res.send('<h1>	get all users, do not change db</h1>');

});

users.get('/:user', (req, res, next) => {
    res.send('get user 123, do not change db');

});

users.post('/', (req, res, next) => {
    res.send('<h1>create a user in the db</h1>');

});

users.put('/:user', (req, res, next) => {
    res.send('<h1>update user 123 in the db</h1>');

});

users.delete('/:user', (req, res, next) => {
    res.send('<h1>delete user 123 from the db</h1>');

});


module.exports = users;