var Bank = artifacts.require("./Bank.sol");

contract('Bank', function(accounts){
    var instance;

    it("initializes the smart contract", async function() {
        return Bank.deployed().then(function(instance) {
          return instance.admin({from : accounts[0]})
        }).then(function(admin) {
          //  console.log(accounts[0]);
          assert.equal(admin, accounts[0]);
        });
      });

      it("It should create an account", function() {
        return Bank.deployed().then(function(instance) {
          return instance.createAccount("Prakash", {from : accounts[1]})
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "an event was triggered");
            assert.equal(receipt.logs[0].event, "EventLog", "the event type is correct");
        });
      });

      it("It should not create an account", function() {
        return Bank.deployed().then(function(instance) {
          return instance.createAccount("Prakash", {from : accounts[0]})
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('cannot') >= 0, "error message must contain revert");
        });
      });

      it("It should view balance of account", function() {
        return Bank.deployed().then(function(instance) {
          return instance.viewBalance(0,{from : accounts[1]})
        }).then(function(balances) {
          assert.equal(balances, 0);
        });
      });

      it("It should deposit into account", function() {
        return Bank.deployed().then(function(instance) {
          return instance.deposit(0,{ from : accounts[1], value : 10000000000000000})
        }).then(function(receipts) {
          assert.equal(receipts.receipt.status, true);
        });
      });

      it("It should view balance of account after transaction", function() {
        return Bank.deployed().then(function(instance) {
          return instance.viewBalance(0,{from : accounts[1]})
        }).then(function(balances) {
           // console.log(balances);
          //assert.equal(balances, 0);
        });
      });

      it("It should return the number of accounts", function() {
        return Bank.deployed().then(function(instance) {
          return instance.customerCount({from: accounts[0]});
        }).then(function(balances) {
            console.log(balances);
          assert.isAtLeast(balances, 1,'There are more than 1 account');
        });
      });
});