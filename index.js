const express = require('express');
const authCtrl = require('./controllers/auth.ctrl');
const statsCtrl = require('./controllers/stats.ctrl');
const{ wordCtrl} = require('./controllers/words.ctrl');
const app = express();
const PORT = 5678;


app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())
app.use("/api/word", wordCtrl);
app.use("/api/stats", statsCtrl);
app.use('/auth/login', authCtrl);
app.listen(PORT,()=>console.log(`server started at port ${PORT}`))
