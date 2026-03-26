const hamburger = document.getElementById("hamburger"); // Get the navigation links container
const navLinks = document.getElementById("navLinks"); // Get the hamburger menu button
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const cart = [];
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => { // Add click event listener to the hamburger menu button
        navLinks.classList.toggle("active"); // Toggle the "active" class on the navigation links container to show/hide the menu
    });
}


let currentIndex = 0; // Initialize the current index for the slideshow

function showSlide(index) { 
    slides.forEach((slide) => { //  Iterate through all slides
        slide.classList.remove("active"); // Remove the "active" class from all slides to hide them
    });

    slides[index].classList.add("active"); // Add the "active" class to the current slide to display it
}

if (slides.length && nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
        currentIndex++; // Increment the current index to show the next slide
        if (currentIndex >= slides.length) { // If the current index exceeds the number of slides, reset it to 0
            currentIndex = 0; // Loop back to the first slide
        }
        showSlide(currentIndex); // Call the function to display the current slide based on the updated index
    });

    prevBtn.addEventListener("click", () => { //    Add click event listener to the previous button
        currentIndex--; // Decrement the current index to show the previous slide
        if (currentIndex < 0) { // If the current index is less than 0, set it to the last slide index  
            currentIndex = slides.length - 1; // Loop back to the last slide
        }
        showSlide(currentIndex); // 
    });
}


addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const menuCard = event.target.closest(".menu-card");

        if (!menuCard) {
            return;
        }

        const itemName = menuCard.dataset.name;
        const itemPrice = Number.parseFloat(menuCard.dataset.price);

        if (!itemName || Number.isNaN(itemPrice)) {
            return;
        }

        addToCart(itemName, itemPrice);
    });
});

function addToCart(name, price) { // Function to add an item to the cart
    const existingItem = cart.find((item) => item.name === name); // Check if the item already exists in the cart by searching for it based on its name

    if (existingItem) { // If the item already exists in the cart, increment its quantity
        existingItem.quantity++;
    } else { // If the item does not exist in the cart, add it as a new entry with a quantity of 1
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    renderCart();
}

function removeFromCart(name) { // Function to remove an item from the cart
    const itemIndex = cart.findIndex((item) => item.name === name);

    if (itemIndex !== -1) { //  If the item is found in the cart, decrement its quantity
        cart[itemIndex].quantity--;

        if (cart[itemIndex].quantity === 0) { // If the quantity reaches 0, remove the item from the cart
            cart.splice(itemIndex, 1); // Remove the item from the cart array
        }
    }

    renderCart();
}

function renderCart() { // Function to render the cart items and total price in the cart section
    if (!cartItemsContainer || !cartTotal) {
        return;
    }

    cartItemsContainer.innerHTML = ""; // Clear the cart items container before rendering the updated cart

    if (cart.length === 0) { // If the cart is empty, display a message indicating that the cart is empty and set the total price to 0
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "0.00";
        return;
    }

    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const cartItemInfo = document.createElement("div");
        cartItemInfo.classList.add("cart-item-info");
        cartItemInfo.innerHTML = `
            <strong>${item.name}</strong>
            <p>Price: $${item.price.toFixed(2)} | Quantity: ${item.quantity}</p>
        `;

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            removeFromCart(item.name);
        });

        cartItem.appendChild(cartItemInfo);
        cartItem.appendChild(removeButton);

        cartItemsContainer.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);
}

if (clearCartButton) { // Add click event listener to the clear cart button
    clearCartButton.addEventListener("click", () => { 
        cart.length = 0;
        renderCart();
    });
}

renderCart();
