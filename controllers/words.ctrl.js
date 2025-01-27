const express = require("express");
const fs = require("fs");
const os = require("os");
const dal = require("../DAL");

const wordCtrl = express.Router();
const englishWords = fs.readFileSync("./nouns-50.txt", "utf-8").split(os.EOL);
const hebWords = fs.readFileSync("./nouns-50-he.txt", "utf-8").split(os.EOL);
const USER_ID = '1';

wordCtrl.get("/", function (req, res) {
  const randomWord = () => {
    const word = englishWords[Math.floor(Math.random() * englishWords.length)];
    if (!!word) return word;
    randomWord();
  };
  if (req.query.count) {
    const randomWordList = [];
    while (randomWordList.length < req.query.count) {
      randomWordList.push(randomWord());
      if (
        randomWordList.filter((w) => w == randomWordList[randomWordList.length-1]).length > 1 ||
        !randomWordList[randomWordList.length-1]
      ) {
        randomWordList.pop();
        continue;
      }
    }
    console.log(randomWordList);
    res.send(randomWordList);
  } else {
    res.send([randomWord()]);
  }
});

wordCtrl.post("/", function (req, res) {
  const engIndex = englishWords.findIndex((w) => w == req.body["englishWord"]);
  const hebIndex = hebWords.findIndex((w) => w === req.body["hebrewWord"]);
  let isCorrect = false;
  if (engIndex === hebIndex) {
    isCorrect = true;
  }
  dal.writeToUser(
    {
      sourceWord: req.body["englishWord"],
      correctCounter: isCorrect ? 1 : 0,
      wrongCounter: !isCorrect ? 1 : 0,
    },
   USER_ID
  );
  res.send(isCorrect);
});
module.exports = {wordCtrl,USER_ID};
