// Es el enrutamiento | EndPoints que nos da express
const GameRoutes = require('express').Router();
const isAuth = require('../../middlewares/auth.middleware');
const upload = require('../../middlewares/updateFile.middleware');

// Importación en ES5 - Métodos de controller
const {
  getAll,
  getOne,
  postOne,
  patchOne,
  deleteOne,
} = require('./games.controller');

GameRoutes.get('/', getAll);
GameRoutes.get('/:id', getOne);
GameRoutes.post('/', upload.single('img'), postOne);
GameRoutes.patch('/:id', upload.single('img'), patchOne);
GameRoutes.delete('/:id', deleteOne);

module.exports = GameRoutes;
