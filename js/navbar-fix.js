/**
 * Fixed navbar functionality for Victoria Claims website
 * Ensures reliable mobile menu toggling
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log("navbar-fix.js loaded successfully");
    
    // Mobile menu toggle with enhanced reliability
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');
    const getInTouchBtn = document.querySelector('.header__cta-btn');
    
    console.log("Menu toggle element:", menuToggle);
    console.log("Nav element:", nav);
    
    if (menuToggle && nav) {
        // Direct click handler for menu toggle
        menuToggle.onclick = function(e) {
            e.preventDefault();
            console.log("Menu toggle clicked");
            
            // Toggle active classes
            nav.classList.toggle('nav--active');
            menuToggle.classList.toggle('menu-toggle--active');
            
            // Update accessibility
            const isExpanded = menuToggle.classList.contains('menu-toggle--active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            
            // Toggle visibility of "Get in touch" button
            if (getInTouchBtn) {
                if (isExpanded) {
                    getInTouchBtn.style.opacity = '0';
                    getInTouchBtn.style.visibility = 'hidden';
                } else {
                    getInTouchBtn.style.opacity = '1';
                    getInTouchBtn.style.visibility = 'visible';
                }
            }
            
            // Animation for nav items
            const navItems = document.querySelectorAll('.nav__item');
            navItems.forEach((item, index) => {
                item.style.setProperty('--item-index', index);
            });
            
            return false; // Prevent event bubbling
        };
        
        // Close menu when nav links are clicked
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log("Nav link clicked, closing menu");
                menuToggle.classList.remove('menu-toggle--active');
                nav.classList.remove('nav--active');
                menuToggle.setAttribute('aria-expanded', 'false');
                
                // Restore "Get in touch" button
                if (getInTouchBtn) {
                    getInTouchBtn.style.opacity = '1';
                    getInTouchBtn.style.visibility = 'visible';
                }
            });
        });
    } else {
        console.error("Could not find menu toggle or nav elements");
    }
});
