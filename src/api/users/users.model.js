const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {validationPassword, validationEmail} = require('../../utils/validators/validators');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  password: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true},
});

userSchema.pre('save', function (next) {
  if (!validationPassword(this.password)) {
    return next(new Error());
  }
  if (!validationEmail(this.email)) {
    return next(new Error());
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model('users', userSchema);
module.exports = User;
