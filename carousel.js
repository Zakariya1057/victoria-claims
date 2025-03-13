document.addEventListener('DOMContentLoaded', function() {
    // Set up carousel functionality
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselViewport = document.querySelector('.carousel-viewport');
    
    if (!carouselContainer || carouselItems.length === 0 || !carouselViewport) return;
    
    const totalItems = carouselItems.length;
    let currentIndex = 0;
    let isAnimating = false;
    
    // Get item width based on screen size
    function getItemWidth() {
        const viewportWidth = window.innerWidth;
        if (viewportWidth <= 767) {
            return 85; // Mobile width
        } else if (viewportWidth <= 991) {
            return 100; // Tablet width
        } else if (viewportWidth <= 1200) {
            return 120; // Medium screen width
        } else {
            return 130; // Large screen width
        }
    }
    
    // Calculate visible items based on viewport and item width
    function getVisibleItemsCount() {
        const viewportWidth = carouselViewport.offsetWidth;
        return Math.floor(viewportWidth / getItemWidth());
    }
    
    // Initialize carousel
    function initializeCarousel() {
        // Clone all items for seamless looping
        const allItems = [...carouselItems];
        
        // Append clones for continuous scrolling
        for (let i = 0; i < totalItems; i++) {
            const clone = allItems[i].cloneNode(true);
            carouselContainer.appendChild(clone);
            
            // Add event listeners to cloned items
            addHoverEffectToItem(clone);
        }
        
        // Set the initial width for all items to ensure they're fully visible
        const itemWidth = getItemWidth();
        carouselItems.forEach(item => {
            item.style.width = `${itemWidth}px`;
        });
        
        // Also set for cloned items
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.style.width = `${itemWidth}px`;
        });
    }
    
    // Add hover effect to an item
    function addHoverEffectToItem(item) {
        item.addEventListener('mouseenter', () => {
            const img = item.querySelector('img');
            if (img) {
                img.style.filter = 'grayscale(0%)';
                img.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const img = item.querySelector('img');
            if (img) {
                img.style.filter = 'grayscale(100%) brightness(0.9)';
                img.style.transform = 'scale(1)';
            }
        });
    }
    
    // Shift carousel by one item, ensuring full logo visibility
    function shiftCarousel() {
        if (isAnimating) return;
        isAnimating = true;
        
        const itemWidth = getItemWidth();
        currentIndex++;
        
        // Animate the shift by exactly one item width
        carouselContainer.style.transition = 'transform 0.8s ease';
        carouselContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        
        // When reaching the end of original items, quickly reset
        if (currentIndex >= totalItems) {
            setTimeout(() => {
                carouselContainer.style.transition = 'none';
                currentIndex = 0;
                carouselContainer.style.transform = 'translateX(0)';
                isAnimating = false;
            }, 800);
        } else {
            setTimeout(() => {
                isAnimating = false;
            }, 800);
        }
    }
    
    // Initialize carousel
    initializeCarousel();
    
    // Shift carousel every 5 seconds
    setInterval(shiftCarousel, 5000);
    
    // Recalculate on window resize
    window.addEventListener('resize', function() {
        // Wait for resize to finish
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(function() {
            const itemWidth = getItemWidth();
            
            // Reset all item widths
            document.querySelectorAll('.carousel-item').forEach(item => {
                item.style.width = `${itemWidth}px`;
            });
            
            // Reset position without animation
            carouselContainer.style.transition = 'none';
            carouselContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        }, 250);
    });
    
    // Add hover effect to original items
    carouselItems.forEach(item => {
        addHoverEffectToItem(item);
    });
});
