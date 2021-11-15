const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = Schema(
  {
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
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamp: true }
);

const joiSchema = Joi.object({
  type: Joi.string().required(),
  category: Joi.string().required(),
  comment: Joi.string(),
  sum: Joi.number().required(),
  balance: Joi.number().required(),
});

const Transaction = model("transaction", transactionSchema);

module.exports = { Transaction, joiSchema };
