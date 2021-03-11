const express = require('express');
const wiki = express.Router();
const { Page } = require("../models");
const addPage = require('../views/addPage');
const wikipage = require('../views/wikipage');


wiki.get('/', (req, res, next) => {
    res.send('<h1>retrieve all wiki pages</h1>');

});

wiki.post('/', async (req, res, next) => {
    try {
        const page = await Page.create({
          title: req.body.title,
          content: req.body.content,
          slug: req.body.title
        });
        
        // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
        res.redirect(`/wiki/${page.slug}`);
      } catch (error) { next(error) }

});

wiki.get('/add', (req, res, next) => {
    res.send(addPage());
});

wiki.get('/:slug', async (req, res, next) => {
    try {
      const pageInfo =  await Page.findOne({
          where: {slug: req.params.slug}
      });
      console.log(pageInfo);
      res.send(wikipage(pageInfo));
    } catch (error){ 
    next(error)
    }
});

module.exports = wiki;

