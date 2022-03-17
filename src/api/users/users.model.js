const mongoose = require('mongoose');
//Importamos la librería para crear nuestra contraseña
const bcrypt = require('bcrypt');

const {
  validationPassword,
  validationEmail,
} = require('../../utils/validators/validators');

//Creamos el esquema de nuestro usuario
const userSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  password: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true},
});

/// Tenemos que guardar la contraseña encriptada - para ello usamos el método mongoose pre("save")
userSchema.pre('save', function (next) {
  if (!validationPassword(this.password)) {
    //TODO: Create ERROR
    return next(new Error());
  }
  if (!validationEmail(this.email)) {
    //TODO: Create ERROR
    return next(new Error());
  }
  // Encriptar la password en nuestra DB
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model('users', userSchema);
module.exports = User;
