1. vocabolary
2. api that serve word/words 
3. api action can have count quesystring param between 1 to 50

## Files
1. `nouns-50.txt` english words file
2. `nouns-50-heb.txt` hebrew words file
3. `user{userid}.json`
4. `users.json` contains our users

`user{userid}.json` example:
```
[{
   "sourceWord": "ride",
   "correctCounter": 1,
   "wrongCounter": 0
}]
```

## api examples
### First
GET http://localhost:xyz/api/word -> return random word
GET http://localhost:xyz/api/word?count=10 -> return random 10 words

POST http://localhost:xyz/api/word (body: englishWord, hebrewWord) return true/false


### Second - Stats
GET http://localhost:xyz/api/stats -> return `user{userid}.json` content

### Third
GET http://localhost:xyz/auth/login -> check with `users.json`, return JWT.

- Add JWT to requests `Authorization` header
- Add middleware that check the JWT from `Authorization` header
