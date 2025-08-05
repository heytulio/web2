const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");

const usuarioSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    senha: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

usuarioSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("senha")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.senha, salt, (err, hash) => {
      if (err) return next(err);

      user.senha = hash;
      next();
    });
  });
});

usuarioSchema.methods.generateAcessJWT = function () {
  let payload = { id: this._id };
  return jwt.sign(payload, process.env.SECRET_HASH, { expiresIn: "20m" });
};

const Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = {
  Usuario,
  usuarioSchema,
};
