import accounts from "./data";

const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const containerApp = document.querySelector(".app");
const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");
const btnDeleteAcc = document.querySelector(".close-account");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
const nav = document.querySelector("nav");
const modal = document.querySelector(".modal");

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
  getRemoveAcc(username) {
    this.accounts = this.accounts.filter((acc) => acc.username !== username);
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
});
btnSort.addEventListener("click", function () {
  accountManager.getAccounts().forEach((acc) => {
    if (acc.username === inputLoginUsername.value) {
      const sorterMovements = bank.getSort([...acc.movements]);
      acc.movements = sorterMovements;
      displayMovements(acc);
      bank.sort = !bank.sort;
    }
  });
});
btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();
  const senderUsername = inputLoginUsername.value;
  const receiverUsername = inputTransferTo.value;
  const transferAmount = Number(inputTransferAmount.value);

  const senderAccount = accountManager
    .getAccounts()
    .find((acc) => acc.username === senderUsername);
  const receiverAccount = accountManager
    .getAccounts()
    .find((acc) => acc.username === receiverUsername);
  if (!senderAccount || !receiverAccount) return;
  senderAccount.movements.push(-transferAmount);
  receiverAccount.movements.push(transferAmount);

  displayMovements(senderAccount);
  displayMovements(receiverAccount);

  const senderBalance = bank.getBalance(senderAccount.movements);
  labelBalance.textContent = `${senderBalance}€`;

  const receiverBalance = bank.getBalance(receiverAccount.movements);
});
btnLoan.addEventListener("click", function (event) {
  event.preventDefault();
  accountManager.getAccounts().forEach((acc) => {
    if (acc.username === inputLoginUsername.value) {
      const currentAmount = bank.getBalance(acc.movements);
      const maxLoan = 3 * currentAmount;
      const currentLoan = Number(inputLoanAmount.value);
      if (currentLoan <= maxLoan && currentLoan > 0) {
        acc.movements.push(currentLoan);
        displayMovements(acc);
        const updateBalance = bank.getBalance(acc.movements);
        labelBalance.textContent = `${updateBalance}€`;
      }
    }
  });
});
btnDeleteAcc.addEventListener("click", function (event) {
  event.preventDefault();
  const btnClose = document.querySelector(".close-modal");
  btnClose.addEventListener("click", function () {
    modal.style.display = "none";
  });
  modal.style.display = "block";
});
btnClose.addEventListener("click", function (event) {
  event.preventDefault();
  accountManager.getAccounts().forEach((acc) => {
    if (
      acc.username === inputCloseUsername.value &&
      acc.pin === Number(inputClosePin.value)
    ) {
      accountManager.getRemoveAcc(inputCloseUsername.value);
      modal.style.display = "none";
      containerApp.style.opacity = "0";
      nav.style.display = "flex";
    }
  });
});
