# 💸 Split App - Backend

A backend system to manage group expenses and calculate fair settlements. Inspired by apps like Splitwise, this app lets users track shared expenses, view balances, and determine who owes what to whom.

---

## 🚀 Features

### 1. Expense Tracking
- Add new expenses with amount, description, and the person who paid.
- Automatically add people from the expense (no separate person creation).
- View, edit, and delete existing expenses.
- Choose how to split the expense: equally, by percentage, or exact amount.

### 2. Settlement Calculations
- Determine how much each person has spent vs. their fair share.
- Simplify and optimize settlements to reduce the number of transactions.
- Display a clear summary of who owes money and who gets paid.

### 3. Data Validation & Error Handling
- Validate positive amounts, required fields, and valid names.
- Handle edge cases like empty expense lists or invalid calculations.
- Return helpful error messages and use proper HTTP status codes.

---

## 🧩 API Endpoints

### 🔹 Expense Management

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| GET    | `/expenses`          | List all expenses        |
| POST   | `/expenses`          | Add a new expense        |
| PUT    | `/expenses/:id`      | Update an expense        |
| DELETE | `/expenses/:id`      | Delete an expense        |

### 🔹 Settlements & People

| Method | Endpoint             | Description                        |
|--------|----------------------|------------------------------------|
| GET    | `/settlements`       | Get optimized settlement summary   |
| GET    | `/balances`          | Get current balances (owes/owed)   |
| GET    | `/people`            | List all involved people           |

---

## 🧪 Example Payloads

### ➤ Add Expense (`POST /expenses`)
```json
{
  "amount": 60.00,
  "description": "Dinner at restaurant",
  "paid_by": "Shantanu"
}
```

### ➤ Success Response
```json
{
  "success": true,
  "data": {
    "_id": "abc123",
    "amount": 60,
    "description": "Dinner at restaurant",
    "paid_by": "Shantanu"
  },
  "message": "Expense added successfully"
}
```

---

## 🧠 Sample Expenses (For Testing)

- Dinner (₹600, paid by Shantanu)
- Groceries (₹450, paid by Sanket)
- Petrol (₹300, paid by Om)
- Movie Tickets (₹500, paid by Shantanu)
- Pizza (₹280, paid by Sanket)

---

## 👥 People Derived

- Akhil
- Alice
- Bob
- Charlie

---

## ❗ Edge Case Testing

- Add invalid expense (negative amount)
- Add invalid expense (empty description)
- Add invalid expense (missing `paid_by`)
- Update/Delete non-existent expense
- Get balances when there are no expenses

---

## 🏗️ Project Structure

```
split-app-backend/
├── controllers/
├── routes/
├── models/
├── services/
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

---

## 🧰 Tech Stack

- **Backend:** Node.js (Express)
- **Database:** MongoDB (via MongoDB Atlas)
- **Deployment:** Railway / Render
- **Testing:** Postman (Collection Provided)

---

## 🧪 Postman Collection

A publicly shareable Postman collection is provided via GitHub Gist. It includes:
- All endpoints
- Pre-populated sample data
- Public deployment base URL
- Organized folder structure
- Clear documentation in each request
---

## ⚙️ Setup Instructions (Local Development)

1. **Clone the repo**
```bash
git clone https://github.com/Akhil70722/SplitApp.git
cd SplitApp
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a `.env` file**
```
PORT=5000
MONGO_URI=your-mongodb-uri
```

4. **Run the server**
```bash
npm start
```
