document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const hero = document.querySelector('.hero');
    let heroHeight = 0;
    
    // Calculate hero height after all assets are loaded
    window.addEventListener('load', function() {
        if (hero) {
            heroHeight = hero.offsetHeight;
        }
    });
    
    // Update header class on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > heroHeight * 0.7) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });
    
    // Mobile menu toggle - enhanced for better reliability
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');
    
    // Debug output to make sure elements are found
    console.log('Menu Toggle:', menuToggle);
    console.log('Nav:', nav);
    
    if (menuToggle && nav) {
        // Ensure mobile menu starts closed
        nav.classList.remove('nav--active');
        menuToggle.classList.remove('menu-toggle--active');
        
        // Add click event with a direct toggle implementation
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Menu toggle clicked!');
            
            // Toggle active classes
            menuToggle.classList.toggle('menu-toggle--active');
            nav.classList.toggle('nav--active');
            
            // Set aria-expanded attribute
            const isExpanded = menuToggle.classList.contains('menu-toggle--active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            
            // Add staggered animation to nav items
            const navItems = document.querySelectorAll('.nav__item');
            navItems.forEach((item, index) => {
                item.style.setProperty('--item-index', index);
            });
            
            console.log('Nav active:', nav.classList.contains('nav--active'));
        });
        
        // Close menu when nav links are clicked
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('menu-toggle--active');
                nav.classList.remove('nav--active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});
