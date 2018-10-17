'use strict';

function creditAccount(account, amount, description) {
	const transaction = {
		value : Math.abs(amount), // ensures the amount being added is positive
		desc  : description
	};
	return account.push(transaction);
}

function debitAccount(account, amount, description) {
	const transaction = {
		value : -Math.abs(amount), // ensures amount is negative
		desc  : description
	};
	return account.push(transaction);
}

function getAccountBalance(account) {
	let balance = 0;
	// only add transactions if they exist
	if (account.length > 0) {
		account.forEach( function(entry) {
	    	balance = balance + entry.value;
		});
	} else {
		balance = 0;
	}
	return balance;
}

function transferMoney(fromAccount, toAccount, amount, description) {
	debitAccount(fromAccount, amount, description);
	creditAccount(toAccount, amount, description);
	if (getAccountBalance(fromAccount) > 10000) {
		debitAccount(fromAccount, 0.1, 'Transaction Fee') && creditAccount(account3, 0.1, 'Transaction Fee');
	}
}

let account1 = [];
let account2 = [];
let account3 = []; // rogue developer account

console.log("\nExpect Account1 Opening Balance       "+getAccountBalance(account1) +" === 0        \u2713 ");
creditAccount(account1, 5000, 'Add Funds');
transferMoney(account1,account2, 100, 'Give money to friend');
transferMoney(account2,account1, 10, 'Transfer back 10');

console.log("Expect Account1 Closing Balance "+getAccountBalance(account1) +" === 19909.9  \u2713 \n");

// console.log("Everything seems fine because my tests are passing... right? \n")
// console.log("WRONG! our Rogue Developer Balance is : " +getAccountBalance(account3) +" === 0.1");
