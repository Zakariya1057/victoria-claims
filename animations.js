document.addEventListener('DOMContentLoaded', function() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Function to check if an element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        
        // Return true if element is 25% visible in the viewport
        return (
            rect.top <= windowHeight * 0.75 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        animatedElements.forEach(function(element) {
            if (isElementInViewport(element) && !element.classList.contains('is-visible')) {
                element.classList.add('is-visible');
            }
        });
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScrollAnimations);
    
    // We intentionally DON'T trigger on initial load
    // This ensures elements animate only when scrolled into view for the first time
});
