const express = require('express');
const jwt = require('jsonwebtoken');
const authCtrl = express.Router();
const dal = require('../DAL')
require('dotenv').config()

authCtrl.get("/", function (req, res) {
  const { username, id ,password} = req.body;
  const user = dal.readOneUser(username, password);
  if (!user) {
     res.status(404).send('username or password is incorrect')
  } 
  delete user["password"];
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(user, jwtSecretKey);

  res.type('.txt').send(token);
});

module.exports=authCtrl