const CharacterRoutes = require('express').Router();
const upload = require('../../middlewares/updateFile.middleware');
const {isAuth} = require('../../middlewares/auth.middleware');

const {getAll, getOne, postOne, patchOne, deleteOne} = require('./characters.controller');

CharacterRoutes.get('/', getAll);
CharacterRoutes.get('/:id', getOne);
CharacterRoutes.post('/', [isAuth], upload.single('img'), postOne);
CharacterRoutes.patch('/:id', [isAuth], upload.single('img'), patchOne);
CharacterRoutes.delete('/:id', [isAuth], deleteOne);

module.exports = CharacterRoutes;
