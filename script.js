// Load the YouTube IFrame Player API code asynchronously
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Global variable for the player
let player;

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: '89l36qVc3lc',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'disablekb': 1,
            'fs': 0,
            'loop': 1,
            'modestbranding': 1,
            'mute': 0,
            'playlist': '89l36qVc3lc',
            'rel': 0,
            'showinfo': 0,
            'autohide': 1,
            'enablejsapi': 1,
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// The API calls this function when the video player is ready
function onPlayerReady(event) {
    const player = event.target;
    player.playVideo();
    
    // Try to unmute and play with sound
    function tryUnmute() {
        player.unMute();
        player.setVolume(100);
        player.playVideo();
        
        // Check if video is playing, if not, try again
        if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
            setTimeout(tryUnmute, 1000);
        }
    }
    
    // Start trying to unmute
    tryUnmute();
    
    // Start the countdown after the video is ready
    startCountdown();
}

// The API calls this function when the player's state changes
function onPlayerStateChange(event) {
    // If video ends, restart it
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
}

function startCountdown() {
    // Set the target date: September 21, 2025, 20:00:00
    const targetDate = new Date('September 21, 2025 20:00:00').getTime();
    
    // Update the countdown every second
    const countdown = setInterval(() => {
        // Get current date and time
        const now = new Date().getTime();
        
        // Calculate the difference between now and the target date
        const difference = targetDate - now;
        
        // If the countdown is over
        if (difference < 0) {
            clearInterval(countdown);
            document.querySelector('h1').textContent = 'Czas na wakacje w Turcji!';
            document.querySelector('.countdown').innerHTML = '<div class="celebration">Życzymy udanego wypoczynku! 🎉</div>';
            return;
        }
        
        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Update the display
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Add animation class for the last 10 seconds
        if (difference < 10000) {
            const timeBlocks = document.querySelectorAll('.time-block');
            timeBlocks.forEach(block => {
                block.style.animation = 'pulse 1s infinite';
            });
        }
    }, 1000);
}

// Add animation for the countdown blocks
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .celebration {
        font-size: 2rem;
        color: #ffd700;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
        animation: pulse 1.5s infinite;
    }
`;
document.head.appendChild(style);
