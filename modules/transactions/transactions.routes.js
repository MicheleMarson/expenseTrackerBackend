const express = require("express")
const auth = require("../../middleware/auth")
const addIncome = require("./controllers/addIncome")
const addExpense = require("./controllers/addExpense")
const getTransactions = require("./controllers/getTransactions")
const deleteTransaction = require("./controllers/deleteTransaction")
const editTransaction = require("./controllers/editTransaction")
const transactionRoutes = express.Router()

//everything bellow will use this middleware 
transactionRoutes.use(auth)

//routes
transactionRoutes.post("/addIncome", addIncome)
transactionRoutes.post("/addExpense", addExpense)
transactionRoutes.get("/", getTransactions)
transactionRoutes.delete("/:transactionId", deleteTransaction)
transactionRoutes.patch("/", editTransaction)

module.exports = transactionRoutes