const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transaction_type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
    remarks: {
      type: String,
      requires: true,
    },
  },
  {
    timestamps: true, // automatically provide created and updated
  }
);

const TransactionsModel = mongoose.model("transactions", transactionsSchema);

module.exports = TransactionsModel;
