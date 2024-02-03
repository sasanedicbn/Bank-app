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
class Bank {
  sort = false;
  constructor(incomes, out, sort, balance) {
    this.incomes = incomes;
    this.out = out;
    this.sort = sort;
    this.balance = balance;
  }
  getBalance(movements) {
    return movements.reduce((acc, currentNum) => acc + currentNum, 0);
  }
  getIncomes(movements) {
    return movements
      .filter((mov) => mov > 0)
      .reduce((acc, currentNum) => acc + currentNum, 0);
  }
  getOutcomes(movements) {
    return movements
      .filter((mov) => mov < 0)
      .reduce((acc, currentNum) => acc + currentNum, 0);
  }
  getSort(movement) {
    console.log([...movement]);
    return [...movement].sort((a, b) => {
      if (!this.sort) {
        return a - b;
      } else {
        return b - a;
      }
    });
  }
}

const accountManager = new AccountManager();
const bank = new Bank();
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
function displayMovements(account) {
  const movementsContainer = document.querySelector(".movements");

  movementsContainer.innerHTML = "";

  account.movements.forEach((movement, index) => {
    const movementType = movement > 0 ? "deposit" : "withdrawal";
    const date = new Date();
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${movementType}">${
      index + 1
    } ${movementType}</div>
          <div class="movements__date">${formattedDate}</div>
          <div class="movements__value">${movement}€</div>
        </div>
      `;

    movementsContainer.insertAdjacentHTML("beforeend", html);
  });
}

// displayMovements(accountManager.getAccounts()[0]);
btnLogin.addEventListener("click", function (event) {
  event.preventDefault();

  accountManager.getAccounts().forEach((acc) => {
    if (
      acc.username === inputLoginUsername.value &&
      acc.pin === Number(inputLoginPin.value)
    ) {
      containerApp.style.opacity = "10";
      nav.style.display = "none";
      displayMovements(acc);
      const currentBalance = bank.getBalance(acc.movements);
      labelBalance.textContent = `${currentBalance}€`;
      const currentIncomes = bank.getIncomes(acc.movements);
      labelSumIn.textContent = `${currentIncomes}€`;
      const currentOutcomes = bank.getOutcomes(acc.movements);
      labelSumOut.textContent = `${currentOutcomes}€`;
    }
  });

  console.log(accountManager.getAccounts());
});
btnSort.addEventListener("click", function () {
  accountManager.getAccounts().forEach((acc) => {
    if (acc.username === inputLoginUsername.value) {
    }
  });
});
