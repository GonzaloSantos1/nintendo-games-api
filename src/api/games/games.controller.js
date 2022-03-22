const Game = require('./games.model');
const {deleteImgCloudinary} = require('../../middlewares/deleteFile.middleware');

const getAll = async (req, res, next) => {
  try {
    const games = await Game.find().populate('characters');
    res.status(200).json(games);
  } catch (error) {
    return next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const {id} = req.params;
    const game = await Game.findById(id).populate('characters');
    res.status(200).json(game);
  } catch (error) {
    return next(error);
  }
};

const postOne = async (req, res, next) => {
  try {
    const game = new Game();
    game.name = req.body.name;
    game.year = req.body.year;
    game.genre = req.body.genre;
    game.characters = req.body.characters;
    if (req.file) game.img = req.file.path;
    const gameDB = await game.save();
    return res.status(201).json(gameDB);
  } catch (error) {
    return next(error);
  }
};

const patchOne = async (req, res, next) => {
  try {
    const {id} = req.params;
    const game = new Game(req.body);
    game.name = req.body.name;
    game.year = req.body.year;
    game.genre = req.body.genre;
    game.characters = req.body.characters;
    if (req.file) game.img = req.file.path;
    game._id = id;
    const updateGame = await Game.findByIdAndUpdate(id, game);
    return res.status(200).json(updateGame);
  } catch (error) {
    return next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const {id} = req.params;
    const game = await Game.findByIdAndRemove(id);
    if (game.img) deleteImgCloudinary(game.img);
    return res.status(200).json(game);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  postOne,
  patchOne,
  deleteOne,
};
