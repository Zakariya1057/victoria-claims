/**
 * Video handler for Victoria Claims website
 * Ensures proper video looping and playback on all devices
 */
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero__video');
    
    if (heroVideo) {
        // Force video to loop on all devices
        heroVideo.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        
        // Make sure video is playing after user interaction
        document.addEventListener('click', function() {
            if (heroVideo.paused) {
                heroVideo.play();
            }
        }, { once: true });
        
        // Ensure video plays properly on mobile
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            // Some mobile browsers might need additional help
            heroVideo.setAttribute('muted', '');
            heroVideo.setAttribute('playsinline', '');
            heroVideo.muted = true;
            heroVideo.play();
        }
    }
});
