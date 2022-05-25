const express = require('express');
const dal = require('../DAL');
const { USER_ID } = require('./words.ctrl');
const statsCtrl = express.Router();

statsCtrl.get('/', function (req, res) {
    const userStats = dal.read(USER_ID);
    res.send(userStats);
})



module.exports=statsCtrl
