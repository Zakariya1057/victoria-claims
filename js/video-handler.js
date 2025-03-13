/**
 * Video handler for Victoria Claims website
 * Ensures proper video looping and playback on all devices
 * With special handling for iOS Safari
 */
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero__video');
    const videoContainer = document.querySelector('.hero__video-container');
    
    if (heroVideo) {
        console.log("Video element found");
        
        // iOS Detection
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        console.log("iOS device detected:", isIOS);
        
        if (isIOS) {
            // Create a click handler for iOS that will play the video after user interaction
            document.body.addEventListener('touchstart', function() {
                if (heroVideo.paused) {
                    console.log("Attempting to play video after user interaction on iOS");
                    
                    // Remove and reapply attributes for iOS
                    heroVideo.removeAttribute('muted');
                    heroVideo.muted = true;
                    heroVideo.setAttribute('muted', '');
                    heroVideo.setAttribute('playsinline', '');
                    
                    // Attempt to play video
                    const playPromise = heroVideo.play();
                    
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => console.log("iOS video playback started successfully"))
                            .catch(error => {
                                console.error("iOS video playback failed:", error);
                                
                                // Force a poster image if video can't play
                                if (videoContainer) {
                                    videoContainer.style.backgroundImage = "url('../assets/poster-image.jpg')";
                                }
                            });
                    }
                }
            }, { once: true });
        }
        
        // Standard video looping and playback handling
        heroVideo.addEventListener('ended', function() {
            console.log("Video ended, restarting");
            this.currentTime = 0;
            this.play()
                .then(() => console.log("Video restarted successfully"))
                .catch(error => console.error("Error restarting video:", error));
        }, false);
        
        // Handle errors
        heroVideo.addEventListener('error', function(e) {
            console.error("Video error:", e);
            
            // Fall back to poster image 
            if (videoContainer) {
                videoContainer.style.backgroundImage = "url('../assets/poster-image.jpg')";
            }
        });
        
        // Force play for cases where autoplay may not work
        if (heroVideo.paused) {
            console.log("Video is paused, attempting to play");
            heroVideo.play()
                .then(() => console.log("Video playback started successfully"))
                .catch(error => console.error("Error starting video:", error));
        }
    }
});
