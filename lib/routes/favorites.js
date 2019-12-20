const { Router } = require('express');
const Favorite = require('../models/Favorite');

module.exports = Router()
  .post('/', (req, res, next) => {
    Favorite
      .create(req.body)
      .then(fav => res.send(fav))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Favorite
      .find()
      .then(favs => res.send(favs))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Favorite
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(fav => res.send(fav))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Favorite
      .findByIdAndDelete(req.params.id)
      .then(fav => res.send(fav))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Favorite
      .findById(req.params.id)
      .then(fav => res.send(fav))
      .catch(next);
  });
