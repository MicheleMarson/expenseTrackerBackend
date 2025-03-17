const mongoose = require("mongoose");
const validator = require("validator");

const deleteTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");
  const usersModel = mongoose.model("users");

  const { transactionId } = req.params;

  if (!validator.isMongoId(transactionId.toString()))
    throw "Please provide a valid id";

  const getTransaction = await transactionModel.findOne({
    _id: transactionId,
  });

  if (!getTransaction) throw "Transaction not found";
  if (!transactionId) throw "Id is required";

  if(getTransaction.transaction_type==="income"){
    usersModel.updateOne({_id: getTransaction.user_id},{
      $inc:{
        balance: getTransaction.amount * -1
      }
    }, {validator: true})
  }else{
    usersModel.updateOne({_id: getTransaction.user_id},{
      $inc:{
        balance: getTransaction.amount
      }
    }, {runValidators: true})
  }

  await transactionModel.deleteOne({
    _id: transactionId,
  });

  res.status(200).json({
    status: "Success",
    message: "Transaction deleted",
  });
};

module.exports = deleteTransaction;
