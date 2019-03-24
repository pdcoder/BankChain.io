var Bank = artifacts.require("./Bank.sol");
const BigNumber = require('bignumber.js');

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
          return instance.createAccount("PrakashDas", {from : accounts[1]})
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "an event was triggered");
            assert.equal(receipt.logs[0].event, "EventLog", "the event type is correct");
        });
      });

      it("It should create an account", function() {
        return Bank.deployed().then(function(instance) {
          return instance.createAccount("Prakash", {from : accounts[2]})
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "an event was triggered");
            assert.equal(receipt.logs[0].event, "EventLog", "the event type is correct");
        });
      });

      it("It should create second account", function() {
        return Bank.deployed().then(function(instance) {
          return instance.createAccount("Prakash", {from : accounts[3]})
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "an event was triggered");
            assert.equal(receipt.logs[0].event, "EventLog", "the event type is correct");
        });
      });

      it("It should create third account", function() {
        return Bank.deployed().then(function(instance) {
          return instance.createAccount("Akash", {from : accounts[4]})
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "an event was triggered");
            assert.equal(receipt.logs[0].event, "EventLog", "the event type is correct");
        });
      });


      it("It should not create an account", function() {
        return Bank.deployed().then(function(instance) {
          return instance.createAccount("Prakash", {from : accounts[0]})
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('cannot') >= 0, "error message must contain cannot");
        });
      });

      it("It should view balance of account", function() {
        return Bank.deployed().then(function(instance) {
            instance = instance;
          return instance.viewBalance.call(2 ,{from : accounts[3]})
        }).then(function(balance) {
          //console.log(balance.toNumber());
          assert.equal(balance.toNumber(),0);
        });
      });

      it("It should deposit into account", function() {
        return Bank.deployed().then(function(instance) {
          instance.deposit.sendTransaction(2,{ from : accounts[3], value : 3000000000000000000});
          return instance.viewBalance.call(2 ,{from : accounts[3]})
        }).then(function(balance) {
          assert.equal(balance , 3000000000000000000);
        });
      });

       it("It should return the number of accounts", function() {
        return Bank.deployed().then(function(instance) {
          return instance.customerCount.call({from: accounts[3]});
        }).then(function(balances) {
          assert.isAtLeast(balances.toNumber() , 3,'There are more than 1 account');
        });
      });

      it("It should view balance of account after transaction", function() {
        return Bank.deployed().then(function(instance) {
          return instance.viewBalance.call(2,{from : accounts[3]})
        }).then(function(balance) {
          assert.equal(web3.utils.fromWei(balance,'ether'),3);
        });
      });

      it("It should withdraw money", function() {
        return Bank.deployed().then(function(instance) {
           instance.withdraw(BigNumber(1000000000000000000),2,{from: accounts[3]});
           return instance.viewBalance.call(2 ,{from : accounts[3]})
          }).then(function(balance) {
            assert.isBelow(parseInt(web3.utils.fromWei(balance,'ether')), 3);
          });
      });

      it("It should transfer funds", function() {
        return Bank.deployed().then(function(instance) {
          instance.transferFunds.call(accounts[2],web3.utils.toWei('0.1','ether'),2,{from: accounts[3]});
          return instance.viewBalance.call(2 ,{from : accounts[3]})
        }).then(function(balance) {
          assert.isBelow(parseInt(web3.utils.fromWei(balance,'ether')), 3);
        });
      });


     

});