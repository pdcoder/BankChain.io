pragma solidity ^0.5.0 ;

contract Bank{
    
    address public admin;
    uint public customerCount;
    int256 private counter;
    
    //Struct Account definition
    struct Account{
       string name;
       address  owner;
       mapping( address => uint256) balance;
    }
    //Array of accounts
    Account[] public accounts;
    
    //Mapping of accounts
    mapping(address => bool) public customers;


    //Event 
    event EventLog(
        int256 indexed _id,
        address indexed _from,
        string indexed messages
    );


    //Modifier
    modifier restricted(){
        require(msg.sender != admin, "Admin cannot create account");
        _;
    }
    
    modifier hasAccount(){
         require(customers[msg.sender], "No Account Present");
         _;
    }
    
    constructor() public 
    {
        admin = msg.sender ;
        counter = 0;
    }
    

    function createAccount(string memory name) public  restricted returns (bool status)
    {
        require(!customers[msg.sender] , "Already has an Account");
        Account memory newaccount = Account({
            name : name,
            owner: msg.sender
        });
        accounts.push(newaccount);
        customerCount++;
        customers[msg.sender] = true;
        emit  EventLog(++counter , msg.sender,  "New Account created") ;
        return customers[msg.sender];
    }
    
    function viewBalance(uint index) public restricted hasAccount returns (uint256 balance)
    {
         require(msg.sender==accounts[index].owner , "Account not found");
         return accounts[index].balance[msg.sender];
         
    }
    
    function deposit(uint256 index) public hasAccount payable returns (uint256 balance) {
        require(msg.value >= 0.01 ether, "Minimum 0.01 ether is to be deposited");
        accounts[index].balance[msg.sender] += msg.value;
        return  accounts[index].balance[msg.sender];
    }
    
    function withdraw(uint256 amount, uint256 index) public hasAccount returns (uint256 remainingBalance)
    {
        require(amount <= accounts[index].balance[msg.sender], "Balance not enough");
        msg.sender.transfer(amount);
        accounts[index].balance[msg.sender] -= amount;
        return accounts[index].balance[msg.sender];
    }
    
    function transferFunds(address payable receiver, uint256 amount, uint256 index) public hasAccount {
        
        require(customers[receiver], "Receiver doesnt have an account");
        require(accounts[index].balance[msg.sender] >= amount, "Account balance not enough");
        receiver.transfer(amount);
        accounts[index].balance[msg.sender] -= amount;
    }
}