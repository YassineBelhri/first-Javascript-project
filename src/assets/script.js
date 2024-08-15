// Array holding details for each product, such as cost, name, quantity, ID, and image path.
const products = [
  {
    price: 3,
    name: "cherry",
    productId: 1,
    quantity: 0,
    image: "images/cherry.jpg"
  },
  {
    price: 5,
    name: "orange",
    productId: 2,
    quantity: 0,
    image: "images/orange.jpg"
  },
  {
    price: 7,
    name: "strawberry",
    productId: 3,
    quantity: 0,
    image: "images/strawberry.jpg"
  }
];

// Array used to monitor the items currently added to the shopping cart.
const cart = [];

// Function to locate a product by its ID within a specified list (such as products or cart).
function getProductByIdFromList(productId, list) {
  return list.find(item => item.productId === productId);
}

// Adds a product to the shopping cart or adjusts the quantity if it is already in the cart.
function addProductToCart(productId) {
  let product = getProductByIdFromList(productId, products);
  const cartItem = getProductByIdFromList(productId, cart);

  if (cartItem) {
    increaseQuantity(productId);
  } else {
    // Adds a product to the cart with an initial quantity of 1.
    cart.push({ price: product.price, name: product.name, productId: product.productId, image: product.image, quantity: 1 });
  }
}

// Function to decrease the quantity of a product in the cart or remove it if the quantity is 1.
function decreaseQuantity(productId) {
  const product = getProductByIdFromList(productId, cart);
  if (product && product.quantity > 1) {
    product.quantity--;
  } else if (product && product.quantity === 1) {
    removeProductFromCart(productId);
  }
}

// Function to completely delete a product from the cart based on its ID.
function removeProductFromCart(productId) {
  const index = cart.findIndex(item => item.productId === productId);
  if (index !== -1) {
    // Sets the quantity to zero before removing the product from the cart.
    cart[index].quantity = 0;
    cart.splice(index, 1);
  }
}

// Function to increase the quantity of a product that is already in the cart.
function increaseQuantity(productId) {
  const product = getProductByIdFromList(productId, cart);
  if (product) {
    product.quantity++;
  }
}

// Function that computes the total cost of all items in the cart.
function cartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Function to empty all items from the shopping cart.
function emptyCart() {
  cart.length = 0;
}

// Manages the payment process by verifying if the paid amount covers the total cart value.
let totalPaid = 0;

function pay(amount) {
  totalPaid += amount;
  const remaining = totalPaid - cartTotal();
  if (remaining >= 0) {
    emptyCart(); // Clears the cart after successful payment.
    totalPaid = 0; // Resets the total paid amount.
  }
  return remaining;
}

// Exporting functions and variables to be accessible in other parts of the application.
module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
  // Uncomment the following line if implementing a currency conversion feature.
  // currency,
};
