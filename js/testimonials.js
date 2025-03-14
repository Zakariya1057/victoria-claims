document.addEventListener('DOMContentLoaded', function() {
    // Animation when scrolled into view
    const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    animateOnScroll.forEach(element => {
        observer.observe(element);
    });
    
    // Testimonial rotation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dotNavs = document.querySelectorAll('.testimonials__dot-nav');
    let currentIndex = 0;
    let interval;
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Remove active class from all dots
        dotNavs.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected testimonial
        testimonialCards[index].classList.add('active');
        
        // Add active class to the corresponding dot
        dotNavs[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // Add click event listeners to dots
    dotNavs.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
            restartInterval();
        });
    });
    
    // Function to rotate testimonials automatically
    function rotateTestimonials() {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showTestimonial(currentIndex);
    }
    
    // Function to start/restart the interval
    function restartInterval() {
        clearInterval(interval);
        interval = setInterval(rotateTestimonials, 10000); // Change testimonial every 10 seconds
    }
    
    // Initialize
    if (testimonialCards.length > 0) {
        showTestimonial(0);
        restartInterval();
    }
    
    // Style adjustments
    testimonialCards.forEach(card => {
        card.style.transitionDuration = '1.5s';
    });
});
