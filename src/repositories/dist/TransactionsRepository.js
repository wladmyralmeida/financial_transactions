"use strict";
exports.__esModule = true;
var Transaction_1 = require("../models/Transaction");
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
    }
    TransactionsRepository.prototype.all = function () {
        return this.transactions;
    };
    TransactionsRepository.prototype.getBalance = function () {
        //1. Salva tudo que for retornado na execução do reduce, e 2. Todos os items contido no transactions;
        var _a = this.transactions.reduce(function (accumulator, transaction) {
            switch (transaction.type) {
                case 'income':
                    accumulator.income += transaction.value;
                    break;
                case 'outcome':
                    accumulator.outcome += transaction.value;
                default:
                    break;
            }
            return accumulator;
        }, { income: 0, outcome: 0, total: 0 }), income = _a.income, outcome = _a.outcome;
        var total = income - outcome;
        return { income: income, outcome: outcome, total: total };
    };
    TransactionsRepository.prototype.create = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        var transaction = new Transaction_1["default"]({ title: title, value: value, type: type });
        this.transactions.push(transaction);
        return transaction;
    };
    return TransactionsRepository;
}());
exports["default"] = TransactionsRepository;
