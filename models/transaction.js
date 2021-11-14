const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = Schema({
  date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  sum: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
  },
});

const joiSchema = Joi.object({
  date: Joi.string().required(),
  type: Joi.string().email().required(),
  category: Joi.string().required(),
  comment: Joi.string(),
  sum: Joi.number().required(),
  balance: Joi.number().required(),
});

const Transaction = model("contact", transactionSchema);

module.export = {
  Transaction,
  joiSchema,
};
