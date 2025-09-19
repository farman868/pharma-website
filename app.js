let cart = [];

function toggleCart() {
  const modal = document.getElementById('cartModal');
  if (!modal) return;
  if (modal.style.display === 'flex') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'flex';
  }
}

function closeCart() {
  const modal = document.getElementById('cartModal');
  if (modal) modal.style.display = 'none';
}

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCartUI();
}

function increaseItem(index) {
  cart[index].quantity++;
  updateCartUI();
}

function decreaseItem(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  updateCartUI();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cartTotal');

  if (!cartItemsContainer || !cartCount || !cartTotal) return;

  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <p>${item.name}</p>
      <div class="cart-item-controls">
        <button onclick="decreaseItem(${index})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseItem(${index})">+</button>
        <button onclick="removeItem(${index})">&times;</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });

  cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartTotal.innerText = total.toFixed(2);
}
