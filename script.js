const hamburger = document.getElementById("hamburger"); // Get the navigation links container
const navLinks = document.getElementById("navLinks"); // Get the hamburger menu button
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

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
