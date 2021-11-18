const { InternalServerError } = require('http-errors')
const { Transaction } = require("../../models")

const add = async (req, res) => {
  const newTransaction = { ...req.body, owner: req.user._id }

  let transactionData = await Transaction.create(newTransaction)

  if (!transactionData) throw new InternalServerError('Server error')

  transactionData = {
      day: transactionData.day,
      month: transactionData.month,
      year: transactionData.year,
      type: transactionData.type,
      category: transactionData.category,
      comment: transactionData.comment,
      sum: transactionData.sum,
      balance: transactionData.balance,
  }

  res.status(201).json({
    status: "Transaction created",
    code: 201,
    data: {
      transactionData,
    },
  })
}

module.exports = add
