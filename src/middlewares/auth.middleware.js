const User = require('../api/users/users.model');
const JwtUtils = require('../utils/jwt/jwt');

const isAuth = async (req, res, next) => {
  try {
    // El token se guarda en headers y lo recuperamos de allí
    const token = req.headers.authorization;
    if (!token) {
      // TODO: ERROR
      return next(new Error());
    }
    // Asi nos llega de la cabecera -> Bearer {TOKEN}, por lo que quitamos "Bearer" para quedarnos sólo con el token
    const parsedToken = token.replace('Bearer ', '');
    const validToken = JwtUtils.verifyToken(
      parsedToken,
      process.env.JWT_SECRET
    );
    const userLogued = await User.findById(validToken.id);
    req.user = userLogued;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {isAuth};
