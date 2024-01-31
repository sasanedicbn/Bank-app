import accounts from "./data";
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
const nav = document.querySelector("nav");

class AccountManager {
  constructor() {
    this.accounts = [];
  }
  addAccount(account) {
    this.accounts.push(account);
  }
  getAccounts() {
    return this.accounts;
  }
}

const accountManager = new AccountManager();
accounts.forEach((acc) => {
  accountManager.addAccount(acc);
});
accountManager.getAccounts().forEach(
  (acc) =>
    (acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join(""))
);

btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
});
