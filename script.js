const buttons = document.querySelectorAll(".services button");
const cartTableBody = document.getElementById("cartTableBody");
const totalAmount = document.getElementById("totalAmount");

let cart = [];
let total = 0;

buttons.forEach((btn) => {
  btn.onclick = function () {
    const row = btn.closest("tr");
    const serviceText = row.querySelector("td").innerText;
    const [name, priceStr] = serviceText.split("•");
    const serviceName = name.trim();
    const price = parseFloat(priceStr.replace("₹", "").trim());

    const existingIndex = cart.findIndex(item => item.name === serviceName);

    if (existingIndex === -1) {
      cart.push({ name: serviceName, price });
      total += price;

      btn.textContent = "Remove Item";
      btn.classList.add("remove-btn");
      
      const icon = document.createElement("img");
      icon.src = "minus.png";
      icon.alt = "";
      icon.style.marginLeft = "5px";
      icon.style.width = "13px"
      btn.appendChild(icon);

    } else {
      total -= cart[existingIndex].price;
      cart.splice(existingIndex, 1);

      btn.textContent = "Add Item";
      btn.classList.remove("remove-btn");

      const icon = document.createElement("img");
      icon.src = "plus.png";
      icon.alt = "";
      icon.style.marginLeft = "5px";
      icon.style.width = "13px"

      btn.appendChild(icon);
    }

    updateCartDisplay();
  };
});

function updateCartDisplay() {
  cartTableBody.innerHTML = "";

  const emptyState = document.getElementById("empty-state");

  if (cart.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }


  cart.forEach((item, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${item.name}</td>
      <td>₹${item.price.toFixed(2)}</td>
    `;
    cartTableBody.appendChild(row);
  });
  totalAmount.textContent = total.toFixed(2);
}

updateCartDisplay();

document.getElementById("book-Now").onclick = function(event){
    event.preventDefault();
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const addToCart = document.getElementById("add-to-cart");
    const fillField = document.getElementById("fill-field");
    const confirmation = document.getElementById("confirmationMsg");

    addToCart.style.display = "none";
    fillField.style.display = "none";
    confirmation.style.display = "none";

    if (cart.length === 0) {
      addToCart.style.display = "block";
      return;
    }

    if (!fullName || !email || !phone) {
      fillField.style.display = "block";
      return;
    }

    confirmation.style.display = "block";

    document.getElementById("booking-form").reset();
    cart = [];
    total = 0;
    updateCartDisplay();

     buttons.forEach((btn) => {
    btn.textContent = "Add Item";
    btn.classList.remove("remove-btn");

    const icon = document.createElement("img");
    icon.src = "plus.png";
    icon.alt = "";
    icon.style.marginLeft = "5px";
    icon.style.width = "13px";
    btn.appendChild(icon);
  });
};
