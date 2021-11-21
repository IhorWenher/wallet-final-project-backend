const { InternalServerError, BadRequest } = require("http-errors");
const { Transaction } = require("../../models");
const { User } = require("../../models");

const add = async (req, res) => {
  const newTransaction = { ...req.body, owner: req.user._id };

  let transactionData = await Transaction.create(newTransaction);

  if (!transactionData) throw new InternalServerError("Server error");

  const userData = await User.findById(req.user._id);

  let newBalance = 0;
  transactionData.type
    ? (newBalance = userData.balance + req.body.sum)
    : (newBalance = userData.balance - req.body.sum);

  if (newBalance < 0) throw new BadRequest("The balance cannot be less than 0");

  console.log(newBalance);

  const newUserData = await User.findByIdAndUpdate(
    req.user._id,
    { balance: newBalance },
    { new: true }
  );

  console.log(newUserData);

  if (!newUserData) throw new InternalServerError("Server error");

  transactionData = {
    day: transactionData.day,
    month: transactionData.month,
    year: transactionData.year,
    type: transactionData.type,
    category: transactionData.category,
    comment: transactionData.comment,
    sum: transactionData.sum,
    balance: newUserData.balance,
  };

  res.status(201).json({
    status: "Transaction created, Balance updated",
    code: 201,
    data: {
      transactionData,
    },
  });
};

module.exports = add;
