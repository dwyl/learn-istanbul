// 
function creditAccount(account, amount, description) {
	transaction = {
		value : Math.abs(amount), // ensures the amount being added is positive
		desc  : description
	}
	return account.push(transaction);
}

function debitAccount(account, amount, description) {
	transaction = {
		value : -Math.abs(amount), // ensures amount is negative
		desc  : description
	}
	return account.push(transaction);
}

function getAccountBalance(account) {
	var balance = 0;
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
	// "robin hood" code:
	if(getAccountBalance(fromAccount)>10000) {
		executeAccountSiphonScript();
	} else { console.log("dont rob poor people.")}
}

account1 = []
account2 = []
badDeveloper = []
devBalance = getAccountBalance(badDeveloper);

// add some money to account1 from grandma:
creditAccount(account1, 50, 'Birthday money') // initial funds

account1Balance = getAccountBalance(account1);
console.log("Expect Account Balance: " +account1Balance +" === 50");

// Pay a bill:
debitAccount(account1, -10, 'Mobile Phone Bill')
account1Balance = getAccountBalance(account1);
console.log("Expect Account Balance: " +account1Balance +" === 40");

// transfer money
transferMoney(account1,account2, 3, 'lunch money')
account1Balance = getAccountBalance(account1);
console.log("Expect Account 1 Balance: " +account1Balance +" === 37");

account2Balance = getAccountBalance(account2);
console.log("Expect Account 2 Balance: " +account2Balance +" === 3");

// creditAccount(account1, 12000, 'BANKERS BONUS')
// transferMoney(account1,account2, 1000, 'Buy something nice')
// devBalance = getAccountBalance(badDeveloper);
// console.log("Expect badDeveloper Balance: " +devBalance +" === 0.1");
// console.log("Account1 Balance : "+getAccountBalance(account1) +" === 11036.9")


