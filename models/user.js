const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const joiBalanceSchema = Joi.object({
  balance: Joi.number().required(), //дописати перевірку
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSchema,
  joiBalanceSchema,
};
