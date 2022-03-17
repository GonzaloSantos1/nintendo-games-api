// Es el enrutamiento | EndPoints que nos da express
const CharacterRoutes = require('express').Router();
const upload = require('../../middlewares/updateFile.middleware');

// Importación en ES5 - Métodos de controller
const {
  getAll,
  getOne,
  postOne,
  patchOne,
  deleteOne,
} = require('./characters.controller');

// Traer todos los actores en el endpoint /all
CharacterRoutes.get('/', getAll);
// Traer Character por id
CharacterRoutes.get('/:id', getOne);
// Crear un actor POST
CharacterRoutes.post('/', upload.single('img'), postOne);
// Modificar Character
CharacterRoutes.patch('/:id', upload.single('img'), patchOne);
// Delete Character
CharacterRoutes.delete('/:id', deleteOne);

module.exports = CharacterRoutes;
