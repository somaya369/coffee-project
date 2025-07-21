const modal = document.getElementById('welcomeModal');
const startBtn = document.getElementById('startBtn');
const yesBtn = modal.querySelector('button.yes');
const noBtn = modal.querySelector('button.no');

function showAlert(message) {
  alert(message);
}
function handleWelcomeResponse(isNew) {
  modal.classList.add('hidden');
  if (isNew) {
    showAlert("Welcome new customer! Please log in.");
  } else {
    showAlert("Welcome back! Let's start your order.");
  }
  startBtn.style.display = 'inline-flex';
  startBtn.focus();
}
function login() {
  const username = prompt("Enter your username (admin or user):");
  if (username !== "admin" && username !== "user") {
    showAlert("Invalid username!");
    return null;
  }

  const password = prompt("Enter your password:");
  if (password !== "1234") {
    showAlert("Incorrect password!");
    return null;
  }

  const role = username;
  const securityLevel = username === "admin" ? "high" : "low";
  showAlert(`Successfully logged in as ${role.toUpperCase()} (Security level: ${securityLevel})`);
  return { role, securityLevel };
}

function orderCoffee() {
  const name = prompt("What is your name?");
  if (!name) {
    showAlert("Name is required.");
    return null;
  }

  const ageStr = prompt("How old are you?");
  const age = Number(ageStr);
  if (isNaN(age) || age <= 0) {
    showAlert("Invalid age.");
    return null;
  }

  const coffee = prompt("Which coffee do you want? (espresso, latte, cappuccino)").toLowerCase();
  let pricePerCup;
  if (coffee === "espresso") pricePerCup = 2.5;
  else if (coffee === "latte") pricePerCup = 3.5;
  else if (coffee === "cappuccino") pricePerCup = 4.0;
  else {
    showAlert("Invalid coffee type.");
    return null;
  }

  const qtyStr = prompt("How many cups?");
  const quantity = Number(qtyStr);
  if (isNaN(quantity) || quantity <= 0) {
    showAlert("Invalid quantity.");
    return null;
  }

  const originalTotal = pricePerCup * quantity;
  const discount = (age < 18 || age > 60) ? originalTotal * 0.1 : 0;
  const finalTotal = originalTotal - discount;

  return { name, age, coffee, quantity, originalTotal, discount, finalTotal };
}

function splitBill(finalTotal) {
  const splitStr = prompt("How many people are splitting the bill? (1, 2, or 3)");
  const split = Number(splitStr);
  if (![1, 2, 3].includes(split)) {
    showAlert("Invalid number of people to split.");
    return null;
  }

  const tipStr = prompt("Tip percentage? (0, 5, 10, or 15)");
  const tipPercent = Number(tipStr);
  if (![0, 5, 10, 15].includes(tipPercent)) {
    showAlert("Invalid tip percentage.");
    return null;
  }

  const tip = finalTotal * (tipPercent / 100);
  const totalWithTip = finalTotal + tip;
  const perPerson = totalWithTip / split;

  return { tip, totalWithTip, perPerson, split, tipPercent };
}

function startAssistant() {
  const user = login();
  if (!user) return;

  const order = orderCoffee();
  if (!order) return;

  const bill = splitBill(order.finalTotal);
  if (!bill) return;

  const output = `
Hello ${order.name}!
You ordered ${order.quantity} cup(s) of ${order.coffee}.
Original total: $${order.originalTotal.toFixed(2)}
Discount: $${order.discount.toFixed(2)}
Tip (${bill.tipPercent}%): $${bill.tip.toFixed(2)}
Total with tip: $${bill.totalWithTip.toFixed(2)}
Split between ${bill.split} person(s): $${bill.perPerson.toFixed(2)} each
  `;
  alert(output.trim());
}


yesBtn.addEventListener('click', () => handleWelcomeResponse(true));
noBtn.addEventListener('click', () => handleWelcomeResponse(false));
startBtn.addEventListener('click', startAssistant);
