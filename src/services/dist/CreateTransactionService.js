"use strict";
exports.__esModule = true;
var CreateTransactionService = /** @class */ (function () {
    function CreateTransactionService(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    CreateTransactionService.prototype.execute = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        //Comparar o tipo com um array; Somente ambos são permitidos, ou seja, se não há os tipos;
        if (!["income", "outcome"].includes(type)) {
            throw new Error("Transaction type is not valid");
        }
        var total = this.transactionsRepository.getBalance().total;
        if (type === "outcome" && total < value) {
            throw new Error("You do not have enough balance");
        }
        var transaction = this.transactionsRepository.create({
            title: title,
            value: value,
            type: type
        });
        return transaction;
    };
    return CreateTransactionService;
}());
exports["default"] = CreateTransactionService;
