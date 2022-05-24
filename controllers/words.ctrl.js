const express = require("express");
const fs = require("fs");
const os = require("os");
const dal = require("../DAL");

const wordCtrl = express.Router();
const englishWords = fs.readFileSync("./nouns-50.txt", "utf-8").split(os.EOL);
const hebWords = fs.readFileSync("./nouns-50-he.txt", "utf-8").split(os.EOL);

wordCtrl.get("/", function (req, res) {
  const randomWord = () =>
    englishWords[Math.floor(Math.random() * englishWords.length)];
  if (req.query.count) {
    const randomWordList = [];
    for (let i = 0; i < req.query.count; i++) {
      randomWordList.push(randomWord());
    }
    res.send(randomWordList);
  } else {
    res.send([randomWord()]);
  }
});

wordCtrl.post("/", function (req, res) {
  const engIndex = englishWords.findIndex((w) => w == req.body["englishWord"]);
  const hebIndex = hebWords.findIndex((w) => w === req.body["hebrewWord"]);
  let isCorrect=false;
  if (engIndex === hebIndex) {
    isCorrect = true;
  }
  dal.writeToUser(
    {
      sourceWord: req.body["englishWord"],
      correctCounter: isCorrect ? 1 : 0,
      wrongCounter: !isCorrect ? 1 : 0,
    },
    "1"
  );
  res.send(req.body);
});
module.exports = wordCtrl;
