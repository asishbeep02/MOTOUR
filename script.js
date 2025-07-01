// Cart functionality
let cart = [];
const cartContainer = document.createElement('div');
cartContainer.classList.add('cart');
cartContainer.innerHTML = `
    <h3>Your Cart</h3>
    <div class="cart-items"></div>
    <p class="cart-total">Total: $0.00</p>
    <button class="btn checkout">Checkout</button>
`;
document.body.appendChild(cartContainer);

const monuments = [
    { name: 'Eiffel Tower', price: 50.0 },
    { name: 'Great Wall of China', price: 70.0 },
    { name: 'Colosseum', price: 30.0 },
    { name: 'Taj Mahal', price: 20.0 },    
    { name: 'Statue of Liberty', price: 55.0 },
    { name: 'Machu Picchu', price: 80.0 }
];

const monumentItems = document.querySelectorAll('.monument-item');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const checkoutButton = cartContainer.querySelector('.checkout');

// Add item to cart on image click
monumentItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        addToCart(monuments[index]);
    });
});

function addToCart(monument) {
    cart.push(monument);
    updateCart();
}

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${ item.name}</p>
            <p>$${item.price.toFixed(2)}</p>
            <button class="btn remove" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price;
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;

    // Attach event listener to remove buttons
    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const indexToRemove = parseInt(e.target.getAttribute('data-index'));
            removeFromCart(indexToRemove);
        });
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Checkout functionality
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }

    let orderSummary = "You have booked tickets for:\n";
    cart.forEach(item => {
        orderSummary += `- ${item.name} ($${item.price.toFixed(2)})\n`;
    });

    orderSummary += "\nTickets booked successfully! 🎉";
    alert(orderSummary);
    
    // Clear cart after checkout
    cart = [];
    updateCart();
});