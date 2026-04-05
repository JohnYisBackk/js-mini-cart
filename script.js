// =============================================
// 1. DOM ELEMENTS
// =============================================

const productsGrid = document.getElementById("productsGrid");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartSidebar = document.getElementById("cartSidebar");
const cartTotal = document.getElementById("cartTotal");

const cartToggleBtn = document.getElementById("cartToggleBtn");
const cartCloseBtn = document.getElementById("cartCloseBtn");

const checkoutModal = document.getElementById("checkoutModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const checkoutBtn = document.querySelector(".checkout-btn");
const checkoutConfirmBtn = document.querySelector(".checkout-confirm-btn");

// =============================================
// 2. PRODUCTS DATA
// =============================================

const products = [
  {
    id: 1,
    title: "Black Essential Tee",
    category: "Apparel",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    description:
      "Minimal premium t-shirt with clean silhouette and soft fabric feel.",
  },
  {
    id: 2,
    title: "Urban Night Sneakers",
    category: "Footwear",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description:
      "Clean streetwear sneakers with bold profile and everyday comfort.",
  },
  {
    id: 3,
    title: "Midnight Steel Watch",
    category: "Accessories",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    description:
      "Elegant dark-tone watch with premium metal details and sharp design.",
  },
  {
    id: 4,
    title: "Shadow Wireless Headphones",
    category: "Audio",
    price: 119,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
    description: "Deep sound, minimalist shape, and premium matte dark finish.",
  },
];

// =============================================
// 3. CART STATE
// =============================================

let cart = [];

// =============================================
// 4. ADD TO CART
// =============================================

function addToCart(productId) {
  const selectedProduct = products.find((product) => product.id === productId);

  if (!selectedProduct) return;

  const existingCartItem = cart.find((item) => item.id === productId);

  if (existingCartItem) {
    existingCartItem.quantity += 1;
  } else {
    cart.push({
      id: selectedProduct.id,
      title: selectedProduct.title,
      price: selectedProduct.price,
      image: selectedProduct.image,
      quantity: 1,
    });
  }

  renderCart();
  updateCartTotal();
  updateCartCount();
  saveCartToLocalStorage();
}

// =============================================
// 5. LOAD CART FROM LOCAL STORAGE
// =============================================

function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cart");

  if (storedCart) {
    cart = JSON.parse(storedCart);
  } else {
    cart = [];
  }
}

// =============================================
// 6. SAVE CART TO LOCAL STORAGE
// =============================================

function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// =============================================
// 7. RENDER PRODUCTS
// =============================================

function renderProducts() {
  if (!products.length) {
    productsGrid.innerHTML = "<p>No products found.</p>";
    return;
  }

  let html = "";

  products.forEach((product) => {
    html += `
    <article class="product-card">
        <div class="product-image-wrap">
          <img
            src="${product.image}"
            alt="${product.title}"
            class="product-image"
          />
        </div>

        <div class="product-info">
          <p class="product-category">${product.category}</p>
          <h4 class="product-title">${product.title}</h4>
          <p class="product-description">${product.description}</p>

          <div class="product-bottom">
            <span class="product-price">€${product.price}</span>

            <button
              class="add-to-cart-btn"
              data-id="${product.id}"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    `;
  });

  productsGrid.innerHTML = html;
}

// =============================================
// 8. RENDER CART ITEMS
// =============================================

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = `
    <div class="cart-empty">
              <p>Your cart is empty.</p>
              <span>Add some premium products to get started.</span>
            </div>
    `;
    return;
  }

  let html = "";

  cart.forEach((item) => {
    html += `
     <article class="cart-item">
        <div class="cart-item-image-wrap">
          <img src="${item.image}" class="cart-item-image" />
        </div>

        <div class="cart-item-info">
          <h4>${item.title}</h4>
          <p>€${item.price}</p>

          <div class="cart-item-controls">
            <div class="quantity-controls">
              <button 
                data-id="${item.id}" 
                data-action="decrease"
              >-</button>

              <span>${item.quantity}</span>

              <button 
                data-id="${item.id}" 
                data-action="increase"
              >+</button>
            </div>

            <button 
              class="remove-btn"
              data-id="${item.id}"
            >
              Remove
            </button>
          </div>
        </div>
      </article>
    `;
  });

  cartItems.innerHTML = html;
}

// =============================================
// 9. REMOVE FROM CART
// =============================================

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);

  renderCart();
  updateCartTotal();
  updateCartCount();
  saveCartToLocalStorage();
}

// =============================================
// 10. INCREASE QUANTITY
// =============================================

function increaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);

  if (!item) return;

  item.quantity += 1;

  renderCart();
  updateCartTotal();
  updateCartCount();
  saveCartToLocalStorage();
}

// =============================================
// 11. DECREASE QUANTITY
// =============================================

function decreaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);

  if (!item) return;

  if (item.quantity === 1) {
    cart = cart.filter((item) => item.id !== productId);
  } else {
    item.quantity -= 1;
  }

  renderCart();
  updateCartTotal();
  updateCartCount();
  saveCartToLocalStorage();
}

// =============================================
// 12. UPDATE TOTAL PRICE
// =============================================

function updateCartTotal() {
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  cartTotal.textContent = `€${total}`;
}

// =============================================
// 13. UPDATE CART COUNT
// =============================================

function updateCartCount() {
  const totalCount = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  cartCount.textContent = totalCount;
}

// =============================================
// 14. PRODUCT BUTTON EVENTS
// =============================================

productsGrid.addEventListener("click", (e) => {
  const button = e.target.closest(".add-to-cart-btn");

  if (!button) return;

  const productId = Number(button.dataset.id);

  addToCart(productId);
});

// =============================================
// 15. CART BUTTON EVENTS
// =============================================

cartItems.addEventListener("click", (e) => {
  const button = e.target.closest("button");

  if (!button) return;

  const productId = Number(button.dataset.id);

  if (button.classList.contains("remove-btn")) {
    removeFromCart(productId);
    return;
  }

  if (button.dataset.action === "increase") {
    increaseQuantity(productId);
    return;
  }

  if (button.dataset.action === "decrease") {
    decreaseQuantity(productId);
    return;
  }
});

// =============================================
// 16. OPEN / CLOSE CART / MODAL
// =============================================

cartToggleBtn.addEventListener("click", () => {
  cartSidebar.classList.add("open");
});

cartCloseBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
});

checkoutBtn.addEventListener("click", () => {
  checkoutModal.classList.add("open");
});

modalCloseBtn.addEventListener("click", () => {
  checkoutModal.classList.remove("open");
});

checkoutModal.addEventListener("click", (e) => {
  if (e.target === checkoutModal) {
    checkoutModal.classList.remove("open");
  }
});

// =============================================
// CONFIRM ORDER
// =============================================

checkoutConfirmBtn.addEventListener("click", () => {
  cart = [];

  saveCartToLocalStorage();
  renderCart();
  updateCartTotal();
  updateCartCount();

  checkoutModal.classList.remove("open");

  alert("Order confirmed successfully!");
});

// =============================================
// 17. INITIALIZE APP
// =============================================

loadCartFromLocalStorage();
renderProducts();
renderCart();
updateCartTotal();
updateCartCount();
