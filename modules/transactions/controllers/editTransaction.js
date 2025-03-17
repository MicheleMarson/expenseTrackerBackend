const mongoose = require("mongoose");
const validator = require("validator");

const editTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");
  const { transactionId, remarks, amount, transaction_type } = req.body;

  if (!transactionId) throw "Transaction id is required";
  if (!validator.isMongoId(transactionId.toString()))
    throw "Please provide a valid id";

  const getTransaction = await transactionModel.findOne({
    _id: transactionId,
  });

  if (!getTransaction) throw "Transaction not found";
  if (!transactionId) throw "Id is required";
  // if (transaction_type !== "income" && transaction_type !== "expense")
  //   throw "Transaction type must be income or expense";

  await transactionModel.updateOne(
    {
      _id: transactionId,
    },
    { remarks, 
      // transaction_type, amount 
    },
    { runValidators: true }
  );

  res.status(200).json({
    status: "success",
    message: "Transaction edited",
  });
};

module.exports = editTransaction;
