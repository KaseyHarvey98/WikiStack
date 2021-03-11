const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});
const makeASlug = (title) => {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
};

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    isAlphanumeric: true,
    notContains: ' ',
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'closed',
  },
});
Page.beforeValidate((page) => {
  page.slug = makeASlug(page.title);
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    isEmail: true,
  },
});

module.exports = { db, Page, User };
