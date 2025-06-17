document.addEventListener('DOMContentLoaded', async () => {
  // Check if user is stored in localStorage
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "/login.html";
    return;
  }

  alert("✅ Thanks for logging in to the app!");
  await loadPeople();
  await loadExpenses();
  await loadAnalytics();
});

// Load People
async function loadPeople() {
  try {
    const res = await fetch('/api/people');
    const people = await res.json();

    const container = document.getElementById('peopleList');
    container.innerHTML = '<h3>People</h3>';
    people.forEach(person => {
      const div = document.createElement('div');
      div.textContent = person.name;
      container.appendChild(div);
    });
  } catch (err) {
    console.error('Error loading people:', err);
  }
}

// Load Expenses
async function loadExpenses() {
  try {
    const res = await fetch('/api/expenses');
    const expenses = await res.json();

    const container = document.getElementById('expensesList');
    container.innerHTML = '<h3>Expenses</h3>';
    expenses.forEach(exp => {
      const div = document.createElement('div');
      div.textContent = `${exp.description} - ₹${exp.amount} by ${exp.paidBy}`;
      container.appendChild(div);
    });
  } catch (err) {
    console.error('Error loading expenses:', err);
  }
}

// Load Analytics (Monthly Breakdown)
async function loadAnalytics() {
  try {
    const res = await fetch('/api/analytics/monthly');
    const data = await res.json();

    const container = document.getElementById('analytics');
    container.innerHTML = '<h3>Monthly Breakdown</h3>';

    for (const [month, total] of Object.entries(data)) {
      const div = document.createElement('div');
      div.textContent = `${month}: ₹${total}`;
      container.appendChild(div);
    }
  } catch (err) {
    console.error('Error loading analytics:', err);
  }
}
