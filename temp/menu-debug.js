// Standalone menu toggle script to help debug mobile menu issues
document.addEventListener('DOMContentLoaded', function() {
    console.log("Menu debug script loaded!");
    
    // Get elements
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav'); // Using ID instead of class
    
    // Log elements to ensure they're found
    console.log('Menu Toggle found:', !!menuToggle);
    console.log('Nav found:', !!nav);
    
    // Direct implementation with simpler toggle 
    if (menuToggle && nav) {
        console.log('Setting up click handler');
        
        // Add simple click handler
        menuToggle.addEventListener('click', function(e) {
            console.log('Menu toggle clicked');
            
            // Add/remove active class
            if (nav.classList.contains('nav--active')) {
                nav.classList.remove('nav--active');
                menuToggle.classList.remove('menu-toggle--active');
                console.log('Menu closed');
            } else {
                nav.classList.add('nav--active');
                menuToggle.classList.add('menu-toggle--active');
                console.log('Menu opened');
            }
            
            // Set aria-expanded
            menuToggle.setAttribute('aria-expanded', 
                menuToggle.classList.contains('menu-toggle--active'));
        });
        
        // Add click listeners to nav links to close menu when clicked
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('nav--active');
                menuToggle.classList.remove('menu-toggle--active');
                menuToggle.setAttribute('aria-expanded', 'false');
                console.log('Nav link clicked, menu closed');
            });
        });
    }
});
