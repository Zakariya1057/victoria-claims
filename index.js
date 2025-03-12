// Victoria Claims Management - Main JavaScript File

// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeMobileMenu();
    initializeAccordion();
    initializeFormValidation();
    initializeSmoothScrolling();
    initializeScrollAnimation();
    initializeTestimonialSlider();
});

// Mobile Menu Toggle
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const closeButton = document.getElementById('close-menu');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__link');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Toggle active classes
            menuToggle.classList.toggle('menu-toggle--active');
            nav.classList.toggle('nav--active');
            
            // Add active class to nav items for animation once menu is active
            if (nav.classList.contains('nav--active')) {
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                document.body.style.overflow = ''; // Enable scrolling when menu is closed
            }
            
            // Manage accessibility
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !expanded);
        });
        
        // Close menu with close button
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                menuToggle.classList.remove('menu-toggle--active');
                nav.classList.remove('nav--active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = ''; // Re-enable scrolling
            });
        }
        
        // Close menu when nav link is clicked on mobile
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    menuToggle.classList.remove('menu-toggle--active');
                    nav.classList.remove('nav--active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = ''; // Re-enable scrolling
                }
            });
        });
    }
}

// FAQ Accordion
function initializeAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion__button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle current item
            const accordionItem = this.parentElement;
            const content = this.nextElementSibling;
            const icon = this.querySelector('.accordion__icon');
            
            accordionItem.classList.toggle('active');
            
            // Toggle icon
            if (icon) {
                icon.classList.toggle('fa-plus');
                icon.classList.toggle('fa-minus');
            }
            
            // Animate content
            if (accordionItem.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
}

// Form Validation
function initializeFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const resetFormButton = document.getElementById('resetForm');
    
    if (contactForm) {
        // Define validation patterns
        const patterns = {
            name: /^[a-zA-Z\s]{2,30}$/,
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            phone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
            message: /.{10,}/
        };
        
        // Error messages
        const errorMessages = {
            name: 'Please enter a valid name (2-30 characters)',
            email: 'Please enter a valid email address',
            phone: 'Please enter a valid phone number (e.g., 123-456-7890)',
            claimType: 'Please select a claim type',
            message: 'Please provide details (at least 10 characters)',
            consent: 'You must consent to be contacted'
        };
        
        // Add blur event listeners to all required fields
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(field);
            });
            
            // Also add input event for real-time validation feedback
            field.addEventListener('input', function() {
                if (field.classList.contains('invalid')) {
                    validateField(field);
                }
            });
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let formValid = true;
            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    formValid = false;
                }
            });
            
            if (formValid) {
                // Simulate form submission
                setTimeout(() => {
                    contactForm.classList.add('hidden');
                    formSuccess.classList.add('visible');
                }, 1000);
            }
        });
        
        // Reset form button
        if (resetFormButton) {
            resetFormButton.addEventListener('click', function() {
                contactForm.reset();
                contactForm.classList.remove('hidden');
                formSuccess.classList.remove('visible');
                
                // Clear validation states
                requiredFields.forEach(field => {
                    field.classList.remove('valid', 'invalid');
                    const errorElement = field.nextElementSibling;
                    if (errorElement && errorElement.classList.contains('form__error')) {
                        errorElement.textContent = '';
                    }
                });
            });
        }
        
        // Field validation function
        function validateField(field) {
            const fieldName = field.getAttribute('name');
            const errorElement = field.nextElementSibling;
            let isValid = true;
            
            // Check different field types
            if (field.type === 'checkbox') {
                isValid = field.checked;
            } else if (field.tagName === 'SELECT') {
                isValid = field.value !== '';
            } else if (patterns[fieldName]) {
                isValid = patterns[fieldName].test(field.value);
            } else {
                isValid = field.value.trim() !== '';
            }
            
            // Update field styling and error message
            if (isValid) {
                field.classList.remove('invalid');
                field.classList.add('valid');
                if (errorElement && errorElement.classList.contains('form__error')) {
                    errorElement.textContent = '';
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if (errorElement && errorElement.classList.contains('form__error')) {
                    errorElement.textContent = errorMessages[fieldName] || 'This field is required';
                }
            }
            
            return isValid;
        }
    }
}

// Header Scroll Effect
function initializeScrollAnimation() {
    const header = document.querySelector('.header');
    const scrollThreshold = 50;
    
    // Set active nav link based on section visibility
    function setActiveNavLink() {
        // Get all sections that have an ID defined
        const sections = document.querySelectorAll('section[id]');
        
        // Get current scroll position
        let scrollY = window.pageYOffset;
        
        // Loop through sections to get height, top and ID values
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Find the corresponding nav link and add active class
                document.querySelector(`.nav__link[href="#${sectionId}"]`)?.classList.add('nav__link--active');
            } else {
                // Remove active class from other links
                document.querySelector(`.nav__link[href="#${sectionId}"]`)?.classList.remove('nav__link--active');
            }
        });
    }
    
    // Add scrolled class to header when user scrolls down
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        
        // Update active nav link
        setActiveNavLink();
    });
    
    // Trigger once on page load
    setActiveNavLink();
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector('.header');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                // Calculate header height for accurate scrolling
                const headerHeight = header ? header.offsetHeight : 0;
                
                // Calculate target position with header offset
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Testimonial Slider
function initializeTestimonialSlider() {
    const slider = document.querySelector('.testimonials__slider');
    const prevBtn = document.querySelector('.testimonial-btn--prev');
    const nextBtn = document.querySelector('.testimonial-btn--next');
    const indicators = document.querySelectorAll('.testimonial-indicator');
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (slider && testimonials.length) {
        let currentIndex = 0;
        const testimonialWidth = testimonials[0].offsetWidth + parseInt(window.getComputedStyle(testimonials[0]).marginRight);
        const maxIndex = testimonials.length - 1;
        
        // Update indicators and scroll position
        function updateSlider() {
            // Update active indicator
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
            
            // Smooth scroll to current testimonial
            const scrollPosition = currentIndex * testimonialWidth;
            slider.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
        
        // Navigate to previous testimonial
        function goToPrev() {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : maxIndex;
            updateSlider();
        }
        
        // Navigate to next testimonial
        function goToNext() {
            currentIndex = (currentIndex < maxIndex) ? currentIndex + 1 : 0;
            updateSlider();
        }
        
        // Event Listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', goToPrev);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', goToNext);
        }
        
        // Click event for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });
        
        // Handle swipe on mobile devices
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left, go to next
                goToNext();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right, go to previous
                goToPrev();
            }
        }
        
        // Auto-scroll testimonials every 5 seconds
        let autoScrollInterval = setInterval(goToNext, 5000);
        
        // Pause auto-scroll when user interacts with testimonials
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(goToNext, 5000);
        });
        
        // Initialize first slide
        updateSlider();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            // Recalculate testimonial width on resize
            const newTestimonialWidth = testimonials[0].offsetWidth + parseInt(window.getComputedStyle(testimonials[0]).marginRight);
            if (newTestimonialWidth !== testimonialWidth) {
                // Force redraw of slider position after resize
                setTimeout(() => {
                    updateSlider();
                }, 200);
            }
        });
    }
}