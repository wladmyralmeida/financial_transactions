"use strict";
exports.__esModule = true;
var express_1 = require("express");
var TransactionsRepository_1 = require("../repositories/TransactionsRepository");
var CreateTransactionService_1 = require("../services/CreateTransactionService");
var transactionRouter = express_1.Router();
var transactionsRepository = new TransactionsRepository_1["default"]();
transactionRouter.get('/', function (request, response) {
    try {
        var transactions = transactionsRepository.all();
        var balance = transactionsRepository.getBalance();
        return response.json({ transactions: transactions, balance: balance });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
transactionRouter.post('/', function (request, response) {
    try {
        var _a = request.body, title = _a.title, value = _a.value, type = _a.type;
        var createTransaction = new CreateTransactionService_1["default"](transactionsRepository);
        //Retorna o que a gente espera da criação de uma transaction;
        var transaction = createTransaction.execute({
            title: title,
            value: value,
            type: type
        });
        return response.json(transaction);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports["default"] = transactionRouter;
