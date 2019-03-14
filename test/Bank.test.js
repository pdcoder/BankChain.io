var Bank = artifacts.require("./Bank.sol");

contract('Bank', function(accounts){
    var instance;

    it("initializes the smart contract", async function() {
        return Bank.deployed().then(function(instance) {
          return instance.admin.call(accounts[0])
        }).then(function(admin) {
            console.log(accounts[0]);
            console.log(admin);
          assert.equal(admin, accounts[0]);
        });
      });

      it("It should create an account", function() {
        return Bank.deployed().then(function(instance) {
          return instance.counter
        }).then(function(count) {
          assert.equal(count, 0);
        });
      });

      it("It should view balance of account", function() {
        return Bank.deployed().then(function(instance) {
          return instance.counter
        }).then(function(count) {
          assert.equal(count, 0);
        });
      });
});