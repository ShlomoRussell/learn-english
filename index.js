const express = require('express');
const wordCtrl = require('./controllers/words.ctrl');
const app = express();
const PORT = 5678;


app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())
app.use("/api/word", wordCtrl);
app.listen(PORT,()=>console.log(`server started at port ${PORT}`))
