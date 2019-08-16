// Constructor Function
let TypeWriter = function (typeSection, words, wait, speed) {
    this.typeSection = typeSection; // Section in which typing takes effect
    this.words = words; // Array of words to type
    this.wait = wait; // Wait at the end of each word before deleting
    this.speed = speed; // Typing Speed
    this.wordCount = 0; // Initialize count
    this.txt = ''; //Initialize letter
    this.isDeleting = false; // Toggle for Adding/Deleting
    this.type(); // Type Function
}

// Type Function
TypeWriter.prototype.type = function () {
    // Current Word Index
    let current = this.wordCount % this.words.length;

    // Current Word
    let currentWord = this.words[current];

    if (!this.isDeleting) {
        // Adding Text
        this.txt = currentWord.substring(0, this.txt.length + 1);
    } else {
        // Deleting Text
        this.txt = currentWord.substring(0, this.txt.length - 1);
    }

    // Display on page
    this.typeSection.innerHTML = `<span class='txt'>${this.txt}</span>`;

    // Increase typeSpeed for Deleting
    let typeSpeed = this.speed;
    if (this.isDeleting) {
        typeSpeed = this.speed / 2;
    }

    // End of first word
    if (!this.isDeleting && this.txt === currentWord) {
        // Toggle to Deleting
        this.isDeleting = true;

        // Pause after end
        typeSpeed = this.wait;
    } else if (this.isDeleting && this.txt === '') {
        // Toggle to Adding
        this.isDeleting = false;

        // Switch to next word
        this.wordCount++;

        // Restore type speed for start
        typeSpeed = this.speed;
    }

    // Repeat for continuous typing
    setTimeout(() => this.type(), typeSpeed);
}

// Init
function init() {
    const typeSection = document.querySelector('#data'); // Type Section
    const words = [
        'Build Responsive Web Applications',
        'Create Single Page Applications'
    ]; // Array of words
    const wait = 1000; // Wait after end of first word
    const speed = 200; // Typing Speed
    new TypeWriter(typeSection, words, wait, speed); // Create a TypeWriter object 
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', init);