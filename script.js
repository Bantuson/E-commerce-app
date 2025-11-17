// Product catalog with ZAR pricing
const products = [
  // Phones
  {
    id: 1,
    name: 'Samsung Galaxy S23',
    description: '256GB, Phantom Black, 5G Ready',
    price: 18999,
    category: 'Phones',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    featured: true
  },
  {
    id: 2,
    name: 'iPhone 14',
    description: '128GB, Midnight, iOS 16',
    price: 19999,
    category: 'Phones',
    image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=400',
    featured: true
  },
  {
    id: 3,
    name: 'Huawei P50 Pro',
    description: '256GB, Golden Black',
    price: 12499,
    category: 'Phones',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
    featured: false
  },
  {
    id: 4,
    name: 'Samsung Galaxy A54',
    description: '128GB, Awesome Violet',
    price: 8999,
    category: 'Phones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    featured: false
  },
  {
    id: 5,
    name: 'Xiaomi Redmi Note 12',
    description: '128GB, Midnight Black',
    price: 4999,
    category: 'Phones',
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400',
    featured: false
  },

  // Laptops
  {
    id: 6,
    name: 'Dell XPS 15',
    description: 'Intel i7, 16GB RAM, 512GB SSD',
    price: 24999,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400',
    featured: true
  },
  {
    id: 7,
    name: 'HP Pavilion 14',
    description: 'Intel i5, 8GB RAM, 256GB SSD',
    price: 12999,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    featured: false
  },
  {
    id: 8,
    name: 'Lenovo ThinkPad',
    description: 'Intel i7, 16GB RAM, 1TB SSD',
    price: 18999,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
    featured: false
  },
  {
    id: 9,
    name: 'Acer Aspire 5',
    description: 'AMD Ryzen 5, 8GB RAM, 512GB SSD',
    price: 9999,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400',
    featured: false
  },
  {
    id: 10,
    name: 'ASUS VivoBook',
    description: 'Intel i3, 8GB RAM, 256GB SSD',
    price: 7999,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400',
    featured: false
  },

  // Accessories
  {
    id: 11,
    name: 'Sony WH-1000XM4',
    description: 'Wireless Noise Canceling Headphones',
    price: 5999,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcf?w=400',
    featured: true
  },
  {
    id: 12,
    name: 'Logitech MX Master 3',
    description: 'Advanced Wireless Mouse',
    price: 1499,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
    featured: false
  },
  {
    id: 13,
    name: 'Mechanical Keyboard RGB',
    description: 'Gaming Keyboard, RGB Backlit',
    price: 2499,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
    featured: false
  },
  {
    id: 14,
    name: 'USB-C Fast Charger',
    description: '65W Power Delivery',
    price: 399,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400',
    featured: false
  },
  {
    id: 15,
    name: 'Premium Phone Case',
    description: 'Shockproof, Clear Design',
    price: 299,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400',
    featured: false
  },
  {
    id: 16,
    name: 'Tempered Glass Screen Protector',
    description: '9H Hardness, Anti-Scratch',
    price: 149,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400',
    featured: false
  }
];

// Utility function to format price in ZAR
function formatPrice(price) {
  return 'R' + price.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// LocalStorage utilities
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Cart management
let cart = getFromLocalStorage('techVibeCart') || [];

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveToLocalStorage('techVibeCart', cart);
  updateCartCount();

  // Show feedback with visual confirmation
  showCartNotification(`${product.name} added to cart!`);
}

function showCartNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 1000;
    font-weight: 500;
    animation: slideIn 0.3s ease;
  `;

  // Add to page
  document.body.appendChild(notification);

  // Remove after 2 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
}

function updateQuantity(productId, quantity) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  item.quantity = quantity;
  saveToLocalStorage('techVibeCart', cart);
  loadCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveToLocalStorage('techVibeCart', cart);
  loadCart();
  updateCartCount();
}

function calculateCartTotal() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.15; // 15% VAT
  const total = subtotal + tax;

  return { subtotal, tax, total };
}

function clearCart() {
  if (confirm('Are you sure you want to clear your cart?')) {
    cart = [];
    saveToLocalStorage('techVibeCart', cart);
    loadCart();
    updateCartCount();
  }
}

// Product rendering functions
function createProductCard(product) {
  return `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${formatPrice(product.price)}</span>
          <button class="btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
}

// Home page - Featured products
function loadFeaturedProducts() {
  const container = document.getElementById('featured-products');
  if (!container) return;

  const featuredProducts = products.filter(p => p.featured);
  container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

// Products page - All products with filtering
let currentFilter = 'all';

function filterProducts(category, clickEvent) {
  currentFilter = category;

  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  if (clickEvent) {
    clickEvent.target.classList.add('active');
  }

  loadAllProducts();
}

function loadAllProducts() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  let filteredProducts = products;
  if (currentFilter !== 'all') {
    filteredProducts = products.filter(p => p.category.toLowerCase() === currentFilter.toLowerCase());
  }

  if (filteredProducts.length === 0) {
    container.innerHTML = '<p class="no-products">No products found in this category.</p>';
    return;
  }

  container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

// Cart page
function loadCart() {
  const cartItems = document.getElementById('cart-items');
  const cartSummary = document.getElementById('cart-summary');

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <a href="products.html" class="btn-primary">Shop Now</a>
      </div>
    `;
    if (cartSummary) {
      cartSummary.innerHTML = '';
    }
    return;
  }

  // Render cart items
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p class="cart-item-price">${formatPrice(item.price)}</p>
      </div>
      <div class="cart-item-quantity">
        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
      </div>
      <div class="cart-item-total">
        <p>${formatPrice(item.price * item.quantity)}</p>
      </div>
      <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
    </div>
  `).join('');

  // Render cart summary
  const { subtotal, tax, total } = calculateCartTotal();
  if (cartSummary) {
    cartSummary.innerHTML = `
      <h3>Order Summary</h3>
      <div class="summary-line">
        <span>Subtotal:</span>
        <span>${formatPrice(subtotal)}</span>
      </div>
      <div class="summary-line">
        <span>VAT (15%):</span>
        <span>${formatPrice(tax)}</span>
      </div>
      <div class="summary-line total">
        <span>Total:</span>
        <span>${formatPrice(total)}</span>
      </div>
      <a href="checkout.html" class="btn-checkout">Proceed to Checkout</a>
      <button onclick="clearCart()" class="btn-clear-cart">Clear Cart</button>
    `;
  }
}

// Checkout page
function loadOrderSummary() {
  const orderItems = document.getElementById('order-items');
  const orderTotal = document.getElementById('order-total');

  if (!orderItems) return;

  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  // Render order items
  orderItems.innerHTML = cart.map(item => `
    <div class="order-item">
      <span>${item.name} � ${item.quantity}</span>
      <span>${formatPrice(item.price * item.quantity)}</span>
    </div>
  `).join('');

  // Render total
  const { subtotal, tax, total } = calculateCartTotal();
  orderTotal.innerHTML = `
    <div class="order-summary-line">
      <span>Subtotal:</span>
      <span>${formatPrice(subtotal)}</span>
    </div>
    <div class="order-summary-line">
      <span>VAT (15%):</span>
      <span>${formatPrice(tax)}</span>
    </div>
    <div class="order-summary-line total">
      <span><strong>Total:</strong></span>
      <span><strong>${formatPrice(total)}</strong></span>
    </div>
  `;
}

function validateCheckoutForm() {
  const form = document.getElementById('checkout-form');
  if (!form) return false;

  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add('error');
    } else {
      field.classList.remove('error');
    }
  });

  return isValid;
}

function placeOrder(event) {
  event.preventDefault();

  if (!validateCheckoutForm()) {
    alert('Please fill in all required fields.');
    return;
  }

  const termsCheckbox = document.getElementById('terms');
  if (!termsCheckbox.checked) {
    alert('Please accept the terms and conditions.');
    return;
  }

  // Simulate order placement
  alert('Order placed successfully! Thank you for your purchase.');

  // Clear cart
  cart = [];
  saveToLocalStorage('techVibeCart', cart);
  updateCartCount();

  // Redirect to home
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

// Contact form
function handleContactForm(event) {
  event.preventDefault();

  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const subject = document.getElementById('contact-subject').value;
  const message = document.getElementById('contact-message').value;

  if (!name || !email || !subject || !message) {
    alert('Please fill in all fields.');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Simulate form submission
  alert('Thank you for contacting us! We will get back to you soon.');
  document.getElementById('contact-form').reset();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // Load appropriate content based on current page
  if (document.getElementById('featured-products')) {
    loadFeaturedProducts();
  }

  if (document.getElementById('products-grid')) {
    loadAllProducts();

    // Add event listeners to filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const category = event.target.getAttribute('data-category');
        filterProducts(category, event);
      });
    });
  }

  if (document.getElementById('cart-items')) {
    loadCart();
  }

  if (document.getElementById('order-items')) {
    loadOrderSummary();
  }
});
