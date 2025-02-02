const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const addBtn = document.getElementById("add-btn");
const resetBtn = document.getElementById("reset-btn");

const entriesList = document.getElementById("entries-list");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const netBalance = document.getElementById("net-balance");

const filterAll = document.getElementById("all");
const filterIncome = document.getElementById("income");
const filterExpense = document.getElementById("expense");

let entries = [];

function addEntry() {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;

  if (description && amount) {
    entries.push({ description, amount, type });
    localStorage.setItem("entries", JSON.stringify(entries));
    descriptionInput.value = "";
    amountInput.value = "";
    updateSummary();
    Entries();
  } else {
    alert("Please fill in both description and amount.");
  }
}

function updateSummary() {
  let income = 0;
  let expense = 0;

  for (let i = 0; i < entries.length; i++) {
    if (entries[i].type === "income") {
      income += entries[i].amount;
    } else if (entries[i].type === "expense") {
      expense += entries[i].amount;
    }
  }

  totalIncome.textContent = income;
  totalExpense.textContent = expense;
  netBalance.textContent = income - expense;
}

function Entries(filter = "all") {
  entriesList.innerHTML = "";

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    if (filter === "all" || entry.type === filter) {
      const li = document.createElement("li");
      li.innerHTML = `
                <span>${entry.description}   : ${entry.amount} (${entry.type})</span>
                <div>
                    <button class="edit-btn" onclick="editEntry(${i})">Edit</button>
                    <button onclick="deleteEntry(${i})">Delete</button>
                </div>
            `;
      entriesList.appendChild(li);
    }
  }
}
const savedEntries = localStorage.getItem("entries");

if (savedEntries) {
  entries = JSON.parse(savedEntries);
  Entries();
  updateSummary();
}

function editEntry(index) {
  const entry = entries[index];
  descriptionInput.value = entry.description;
  amountInput.value = entry.amount;
  typeInput.value = entry.type;
  deleteEntry(index);
}

function deleteEntry(index) {
  entries.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(entries));
  updateSummary();
  Entries();
}

function resetEntries() {
  entries = [];
  localStorage.removeItem("entries");
  updateSummary();
  Entries();
}

addBtn.addEventListener("click", addEntry);
resetBtn.addEventListener("click", resetEntries);

filterAll.addEventListener("change", function () {
  Entries("all");
});

filterIncome.addEventListener("change", function () {
  Entries("income");
});

filterExpense.addEventListener("change", function () {
  Entries("expense");
});
