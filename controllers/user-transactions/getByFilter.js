const { InternalServerError } = require("http-errors");
const { Transaction } = require("../../models");

const getAll = async (req, res, next) => {
  ///logic by filter
  let transactionsData = await Transaction.find({ owner: req.user._id });

  if (!transactionsData) throw new InternalServerError("Server error");

  transactionsData = transactionsData.map((transactionData) => ({
    id: transactionData._id,
    month: transactionData.month,
    year: transactionData.year,
    type: transactionData.type,
    category: transactionData.category,
    sum: transactionData.sum,
  }));

  res.json({
    status: "Transactions retrieved",
    code: 200,
    data: {
      transactionsData,
    },
  });
};

module.exports = getAll;
