const API = 'http://localhost:5000/api';
const user = localStorage.getItem("user");
let people = JSON.parse(localStorage.getItem("people") || "[]");

// Show login modal if user not logged in
if (!user) {
  document.getElementById("login-modal").style.display = "flex";
} else {
  document.getElementById("login-modal").style.display = "none";
  initializeDashboard();
}

// Login Handler
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    return alert("Please enter both username and password.");
  }

  localStorage.setItem("user", username);
  alert(`Thanks for logging in, ${username}!`);
  document.getElementById("login-modal").style.display = "none";
  initializeDashboard();
});

// Sign Out
document.getElementById('sign-out-btn').addEventListener('click', () => {
  localStorage.removeItem("user");
  location.reload();
});

// Dark Mode Toggle
document.getElementById('toggle-theme')?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Add Person Handler
document.getElementById("person-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("person-name").value.trim();

  if (!name) return;

  if (people.includes(name)) {
    alert(`${name} is already added.`);
  } else {
    people.push(name);
    localStorage.setItem("people", JSON.stringify(people));
    alert(`${name} added to Split App.`);
  }

  document.getElementById("person-name").value = "";
});

// Initialize Dashboard
function initializeDashboard() {
  loadExpenses();
  fetchBalances();
  fetchSettlements();
}

// Add or Update Expense
document.getElementById('expense-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const payer = document.getElementById('payer').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const participants = document.getElementById('participants').value
    .split(',')
    .map(p => p.trim())
    .filter(p => p);
  const description = document.getElementById('description').value.trim();
  const isRecurring = document.getElementById('isRecurring').checked;

  // ✅ Validate payer and participants
  if (!people.includes(payer)) {
    alert(`❌ Payer "${payer}" has not been added. Please add them first.`);
    return;
  }

  const unknowns = participants.filter(p => !people.includes(p));
  if (unknowns.length > 0) {
    alert(`❌ These participants are not added yet: ${unknowns.join(", ")}`);
    return;
  }

  const editingId = document.getElementById('expense-form').dataset.editingId;
  const url = editingId ? `${API}/expenses/${editingId}` : `${API}/expenses`;
  const method = editingId ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payer, amount, participants, description, recurring: isRecurring })
    });

    if (!res.ok) throw new Error(`${method === 'POST' ? 'Adding' : 'Updating'} expense failed`);

    document.getElementById('expense-form').reset();
    delete document.getElementById('expense-form').dataset.editingId;
    document.querySelector('#expense-form button').textContent = "Add Expense";
    initializeDashboard();
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// Load Expenses
async function loadExpenses() {
  try {
    const res = await fetch(`${API}/expenses`);
    const { data } = await res.json();
    const list = document.getElementById('expense-list');
    list.innerHTML = '';

    window.allExpenses = data; // 🔍 Save for filter/export

    data.forEach(e => {
      const item = createExpenseItem(e);
      list.appendChild(item);
    });
  } catch (err) {
    document.getElementById('expense-list').innerHTML = '<li>Error loading expenses</li>';
  }
}

// Create List Item for Expense
function createExpenseItem(e) {
  const payer = e.payer || '(Unknown)';
  const item = document.createElement('li');

  item.innerHTML = `
    <strong>${payer}</strong> paid ₹${e.amount} for <em>${e.description || 'some expense'}</em> with ${e.participants.join(', ')} 
    ${e.recurring ? '<span style="color: green;">[Recurring]</span>' : ''}
    <button onclick="deleteExpense('${e._id}')" style="margin-left:10px; background:red; color:white; border:none; padding:4px 8px; border-radius:5px; cursor:pointer;">🗑️</button>
    <button onclick="editExpense('${e._id}', '${e.payer}', ${e.amount}, '${e.participants.join(', ')}', '${e.description || ''}')" style="margin-left:5px; background:#ffc107; color:black; border:none; padding:4px 8px; border-radius:5px; cursor:pointer;">✏️</button>
  `;
  return item;
}

// Delete Expense
async function deleteExpense(id) {
  if (!confirm("Are you sure you want to delete this expense?")) return;

  try {
    const res = await fetch(`${API}/expenses/${id}`, { method: 'DELETE' });
    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Failed to delete");

    alert(result.message || "Deleted successfully");
    initializeDashboard();
  } catch (err) {
    alert("Error: " + err.message);
  }
}

// Edit Expense
function editExpense(id, payer, amount, participants, description) {
  document.getElementById('payer').value = payer;
  document.getElementById('amount').value = amount;
  document.getElementById('participants').value = participants;
  document.getElementById('description').value = description;
  document.getElementById('expense-form').dataset.editingId = id;
  document.querySelector('#expense-form button').textContent = "Update Expense";
}

// Fetch Balances
async function fetchBalances() {
  try {
    const res = await fetch(`${API}/settlements/balances`);
    const data = await res.json();
    const list = document.getElementById('balance-list');
    list.innerHTML = '';

    Object.entries(data).forEach(([person, amount]) => {
      const label = person || '(Unknown)';
      const item = document.createElement('li');
      item.textContent = `${label}: ₹${amount.toFixed(2)}`;
      list.appendChild(item);
    });
  } catch {
    document.getElementById('balance-list').innerHTML = '<li>Error loading balances</li>';
  }
}

// Fetch Settlements
async function fetchSettlements() {
  try {
    const res = await fetch(`${API}/settlements`);
    const { settlements } = await res.json();
    const list = document.getElementById('settlement-list');
    list.innerHTML = '';

    settlements.forEach(({ from, to, amount }) => {
      const item = document.createElement('li');
      item.textContent = `${from} pays ₹${amount} to ${to}`;
      list.appendChild(item);
    });
  } catch {
    document.getElementById('settlement-list').innerHTML = '<li>Error loading settlements</li>';
  }
}

// 🔍 Filter Expenses
document.getElementById('filter-input')?.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const list = document.getElementById('expense-list');
  list.innerHTML = '';

  const filtered = window.allExpenses.filter(e => {
    return (
      e.payer.toLowerCase().includes(query) ||
      e.description?.toLowerCase().includes(query)
    );
  });

  if (filtered.length === 0) {
    list.innerHTML = '<li>No matching results</li>';
  } else {
    filtered.forEach(e => list.appendChild(createExpenseItem(e)));
  }
});

// ⬇️ Export to CSV
function exportToCSV() {
  const rows = [['Payer', 'Amount', 'Participants', 'Description', 'Recurring']];
  window.allExpenses.forEach(e => {
    rows.push([
      e.payer,
      e.amount,
      e.participants.join(', '),
      e.description,
      e.recurring ? 'Yes' : 'No'
    ]);
  });

  const csvContent = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'expenses.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
