// const { NotFound, BadRequest } = require("http-errors");

// const { joiSchema } = require("../models/transaction");

const { Transaction } = require("../models");

const getAll = async (req, res, next) => {
  const allContacts = await Transaction.find({}, "_id name email");
  res.json({
    status: "success",
    code: 200,
    data: {
      allContacts,
    },
  });
};

module.exports = {
  getAll,
};
