const mongoose = require("mongoose");
//var express = require("express");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});


UserSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


UserSchema.statics.getAuthenticated = function (email, password, cb) {
  this.findOne({ email: email }, function (err, user) {
    if (err) {
      console.log(err);
      return cb(err);
    } else if (!user) {
      console.log("No existe este usuario");
      return cb(null, null, err);
    } else {
      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          return cb(err);
        }
        if (isMatch) {
          console.log("Usuario validado: " + user.email + "\n");
          return cb(null, user);
        } else {
          console.log("Contraseña incorrecta");
          return cb(null);
        }
      });
    }
  });
};

module.exports = mongoose.model("usuarios", UserSchema);