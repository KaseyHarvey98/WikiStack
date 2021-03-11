const morgan = require('morgan');
const express = require('express');
const app = express();
const path = require('path');
const { db, Page, User } = require('./models');
const client = require('./db/index');
const layout = require('./views/layout');
const wiki = require('./wiki');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: false }));

db.authenticate().then(() => {
  console.log('connected to the database');
});

app.use('/wiki', wiki);

app.get('/', (req, res, next) => {
  res.send(layout(' '));
});

const PORT = 3001;

const init = async () => {
  await db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
