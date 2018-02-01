import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import legacy from './legacy';
import users from './users';

const port = 5050;
const whiteList = ['http://localhost:8080'];

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
  origin (origin, callback) {
    const originIsWhitelisted = whiteList.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
}));

app.get('/legacy/:userId/phone', (req, res) =>
  res.json(legacy.phones.filter(record => record.userId === req.params.userId)));

app.get('/legacy/:userId/additional', (req, res) =>
  res.json(legacy.additional.filter(record => record.userId === req.params.userId)));

app.get('/api/user', (req, res) =>
  res.json(users));

app.get('/api/search/:text', (req, res) => {
  const text = req.params.text;
  res.json([...new Set([ // using Set to filter duplicates
    ...Object.keys(users).filter(userId => users[userId].toUpperCase().includes(text.toUpperCase())),
    ...legacy.phones.filter(record => record.phoneNumber.includes(text)).map(record => record.userId)
  ])]);
});

app.listen(port, () => {
  console.log(`Find the server at: http://localhost:${port}/`);
});

process.on('unhandledRejection', r => console.log(r));
