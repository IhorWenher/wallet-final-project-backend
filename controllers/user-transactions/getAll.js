const { Transaction } = require("../../models");

const getAll = async (req, res, next) => {
  const allTransactions = await Transaction.find();
  res.json({
    status: "success",
    code: 200,
    data: {
      allTransactions,
    },
  });
};

module.exports = getAll;
