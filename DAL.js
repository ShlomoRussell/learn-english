const fs = require("fs");

function read(fileName) {
  return JSON.parse(fs.readFileSync(`./data/user${fileName}.json`, "utf-8"));
}
function writeToUser(data, userId) {
  const userJson = read(userId);
  const currentWordIndex = userJson.findIndex(
    (w) => w.sourceWord == data.sourceWord
  );
  let currentWord = userJson[currentWordIndex];
  if (currentWordIndex == -1) {
    userJson.push(data);
  }
  else userJson[currentWordIndex] = {
      ...currentWord,
      correctCounter: currentWord.correctCounter + data.correctCounter,
      wrongCounter: currentWord.wrongCounter + data.wrongCounter,
    };
 
  fs.writeFileSync(`./data/user${userId}.json`, JSON.stringify(userJson));
}

const readOneUser = (username, password) =>
  read("s").find((u) => u.username === username && u.password == password);


module.exports = {
  read,
  writeToUser,
  readOneUser,
};
