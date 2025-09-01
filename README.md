# 🏡 Mortgage Repayment Calculator

A responsive mortgage repayment calculator built with **HTML, CSS, and JavaScript**.  
This project was created as part of the [Frontend Mentor Challenge](https://www.frontendmentor.io/challenges/mortgage-repayment-calculator-Galx1LXK73).

Users can enter their mortgage details and instantly see **monthly repayments** and the **total repayment** over the term. The calculator also works for **repayment** and **interest-only** mortgages.

---

## 📖 Overview

### Features

- ✅ Input mortgage amount, term, and interest rate
- ✅ Choose between **Repayment** and **Interest-Only** mortgage types
- ✅ See **calculated monthly and total repayment amounts**
- ✅ Responsive design for **desktop, tablet, and mobile**
- ✅ Form validation with error prompts if fields are empty or invalid

---

## 🛠️ Built With

- **HTML5** – Semantic and accessible structure
- **CSS3** – Custom styling with media queries for responsiveness
- **Vanilla JavaScript** – Handles form validation and mortgage calculations
- **Flexbox & Mobile-First Design** – Ensures layout adapts to all devices

---

## 💡 How It Works

1. Enter:
   - Mortgage Amount (£)
   - Mortgage Term (years)
   - Interest Rate (%)
2. Choose mortgage type:
   - **Repayment**: Calculates principal + interest over time
   - **Interest-Only**: Calculates only the interest per month
3. Click **Calculate Repayments** to see:
   - Monthly repayment
   - Total repayment over the full term

The calculations are formatted with commas for better readability.

---

## 📱 Responsive Design

We implemented **media queries** for:

- Mobile devices (`max-width: 768px`)
- Small mobile devices (`max-width: 480px`)

Optimizations include:

- No horizontal scroll
- Full-width components on mobile
- Proper input font sizes (16px+) to prevent iOS zooming
- Smooth scrolling experience

---

## 🚀 Live Demo

🔗 [View Live Project](#)  
(_Add your Netlify/Vercel/GitHub Pages link here_)

---

## 🧩 Code Highlights

- **Mortgage Calculation Formula (Repayment):**

```javascript
monthlyPayment =
  (amount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
  (Math.pow(1 + monthlyRate, totalMonths) - 1);
```
