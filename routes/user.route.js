module.exports = function(app) {
    var userController = require('../controllers/user.controller');
    var express = require('express');
    var router = express.Router();
    app.post('/manager/addUser', userController.addNew);

    app.post('/manager/getAllDataUser', userController.getList);

    app.post('/manager/getOneUser', userController.getById);

   // app.post('/manager/addUser', userController.addNew);


    app.post('/manager/updateUser', userController.update);

    app.post('/manager/deleteUser', userController.delete);
}

