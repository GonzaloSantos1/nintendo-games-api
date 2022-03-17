const User = require('./users.model');
const bcrypt = require('bcrypt');
const JwtUtils = require('../../utils/jwt/jwt');

const register = async (req, res, next) => {
  try {
    const user = new User(req.body);
    // Miramos si el email existe
    const userExist = await User.findOne({email: user.email});
    if (userExist) {
      return next(new Error());
    }
    const userDB = await user.save();
    return res.status(201).json(userDB.name);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    // Comprobamos que existe el email para logarse
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      return next(new Error());
    }
    // comparamos contraseña con la contraseña hasheada
    if (bcrypt.compareSync(req.body.password, user.password)) {
      // Generamos el Token
      const token = JwtUtils.generateToken(user._id, user.email);
      // Devolvemos el Token al Frontal
      return res.status(200).json(token);
    }
  } catch (error) {}
};

const logout = (req, res, next) => {
  try {
    // Te elimina el token -> Es decir te lo devuelve en null
    const token = null;
    return res.status(201).json(token);
  } catch (error) {
    return next(error);
  }
};

module.exports = {register, login, logout};
