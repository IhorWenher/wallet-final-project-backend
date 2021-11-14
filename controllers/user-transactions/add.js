const { Transaction } = require("../../models");

const add = async (req, res) => {
  const newTransaction = { ...req.body, owner: req.user._id };
  const result = await Transaction.create(newTransaction);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = add;
