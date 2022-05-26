const express = require('express');
const authCtrl = require('./controllers/auth.ctrl');
const statsCtrl = require('./controllers/stats.ctrl');
const { wordCtrl } = require('./controllers/words.ctrl');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const app = express();
const PORT = 5678;


app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())
app.use("/auth/login", authCtrl);
app.use(function (req, res, next) {
      try {
        const [type, token] = req.headers.authorization.split(' ');
          const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
          console.log(payload)
        next();
    }
    catch (ex) {
        res.status(401).send();
    }
})

app.use("/api/word", wordCtrl);
app.use("/api/stats", statsCtrl);

app.listen(PORT,()=>console.log(`server started at port ${PORT}`))
