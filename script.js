// Array of romantic messages
const romanticMessages = [
    "To my beautiful wife, you make every day feel like a celebration.",
    "Another year older, and still as stunning as the day we met.",
    "Your smile brightens my world more than any birthday candle ever could.",
    "Wishing the happiest of birthdays to the woman who stole my heart.",
    "You're not just a year older, you're a year more wonderful.",
    "Every moment with you is a gift. Happy birthday, my love!",
    "Your love is the greatest present I could ever receive. Happy birthday!",
    "Today we celebrate you, but for me, every day is special because of you.",
    "You're the reason for every happy moment in my life. Happy birthday, darling!",
    "Growing older with you is the greatest adventure of my life."
];

// Array of image URLs
const images = [
    "images/Image.jpg",
    "images/Image (1).jpg",
    "images/Image (2).jpg",
    "images/Image (3).jpg",
    "images/Image (4).jpg",
    "images/Image (5).jpg",
    "images/Image (6).jpg",
    "images/Image (7).jpg",
    "images/Image (8).jpg",
    "images/Image (9).jpg",
    "images/Image (10).jpg",
    "images/Image (11).jpg",
    "images/Image (12).jpg",
];

// Function to reveal greeting message
function revealGreeting() {
    const greetingMessage = document.getElementById('greeting-message');
    const randomMessage = romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
    greetingMessage.textContent = randomMessage;
    greetingMessage.style.opacity = 0;
    fadeIn(greetingMessage);
    showConfetti();
}

// Function to change inside image
function changeInsideImage() {
    const insideImage = document.getElementById('inside-image');
    const randomImage = images[Math.floor(Math.random() * images.length)];
    insideImage.style.opacity = 0;
    setTimeout(() => {
        insideImage.src = randomImage;
        fadeIn(insideImage);
    }, 500);
}

// Function to update signature
function updateSignature() {
    console.log("Updating signature..."); // Debug log
    const signatureName = document.getElementById('signature-name');
    const signatureDate = document.getElementById('signature-date');
    
    if (signatureName && signatureDate) {
        console.log("Signature elements found"); // Debug log
        // Set the current date
        const currentDate = new Date();
        signatureDate.textContent = currentDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    } else {
        console.warn("Signature elements not found"); // Debug log
    }
}

// Fade in animation
function fadeIn(element) {
    let opacity = 0;
    const timer = setInterval(() => {
        if (opacity >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = opacity;
        opacity += 0.1;
    }, 50);
}

// Initialize card functionality
function initCard() {
    console.log("Initializing card...");
    
    const coverImage = document.getElementById('cover-image');
    console.log("Cover image element:", coverImage);
    
    const insideImage = document.getElementById('inside-image');
    console.log("Inside image element:", insideImage);
    
    if (insideImage) {
        insideImage.src = images[0];
    } else {
        console.warn("Inside image element not found");
    }

    // Event listeners
    const greeting = document.getElementById('greeting');
    if (greeting) {
        greeting.addEventListener('click', revealGreeting);
    } else {
        console.warn("Greeting element not found");
    }
    
    if (insideImage) {
        insideImage.addEventListener('click', changeInsideImage);
    }
    
    // Initialize signature
    updateSignature();

    // Add hover effect to cover image
    if (coverImage) {
        coverImage.addEventListener('mouseover', () => {
            coverImage.style.transform = 'scale(1.05)';
            coverImage.style.transition = 'transform 0.3s ease-in-out';
        });
        coverImage.addEventListener('mouseout', () => {
            coverImage.style.transform = 'scale(1)';
        });
    }
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    initCard();
});

function showConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Music toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded, initializing music toggle...");
    
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');

    if (musicToggle && bgMusic) {
        console.log("Music elements found, setting up event listener");
        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().catch(e => console.error("Error playing audio:", e));
                musicToggle.textContent = '🔇';
            } else {
                bgMusic.pause();
                musicToggle.textContent = '🎵';
            }
        });
    } else {
        console.warn('Music toggle or background music element not found');
        if (!musicToggle) console.warn('musicToggle element is missing');
        if (!bgMusic) console.warn('bgMusic element is missing');
    }
});

// Image gallery functionality
let currentImageIndex = 0;
const galleryImages = document.querySelectorAll('.gallery-image');
const nextButton = document.getElementById('nextImage');

function showImage(index) {
    galleryImages.forEach((img, i) => {
        img.style.display = i === index ? 'block' : 'none';
    });
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage(currentImageIndex);
}

// Add click event to next button
nextButton.addEventListener('click', nextImage);

// Add click event to each gallery image
galleryImages.forEach((img) => {
    img.addEventListener('click', () => {
        nextButton.click(); // Trigger next button click
    });
});

// Previous button functionality (unchanged)
document.getElementById('prevImage').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentImageIndex);
});

showImage(currentImageIndex);  // Show the first image initially

// Countdown timer functionality
function updateCountdown() {
    const birthday = new Date("2024-10-17T00:00:00").getTime(); // Set the birthday date
    const now = new Date().getTime();
    const distance = birthday - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("timer").innerHTML = "Happy Birthday!";
    }
}

const countdownTimer = setInterval(updateCountdown, 1000);

// Rose confetti functionality
function createRosePetal() {
    const petal = document.createElement('div');
    petal.classList.add('rose-petal');
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = Math.random() * 2 + 3 + 's';
    petal.style.opacity = Math.random() * 0.5 + 0.5;
    return petal;
}

function shootRoseConfetti() {
    const confettiContainer = document.getElementById('rose-confetti');
    for (let i = 0; i < 50; i++) {
        const petal = createRosePetal();
        confettiContainer.appendChild(petal);
        setTimeout(() => petal.remove(), 5000);
    }
}

document.getElementById('cover-image').addEventListener('click', shootRoseConfetti);

// Add these variables at the top of your script
let player;
let isMuted = true;

// Add this function to your script
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '360',
        width: '640',
        videoId: 'LgZjI7JRi1I', // YouTube ID for "Ain't No Mountain High Enough"
        playerVars: {
            'autoplay': 1,
            'mute': 1,
            'controls': 0,
            'showinfo': 0,
            'rel': 0,
            'loop': 1,
            'playlist': 'LgZjI7JRi1I' // Same as videoId for looping
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // ... your existing code ...

    const toggleSoundButton = document.getElementById('toggleSound');
    if (toggleSoundButton) {
        toggleSoundButton.addEventListener('click', () => {
            if (isMuted) {
                player.unMute();
                toggleSoundButton.textContent = 'Mute';
            } else {
                player.mute();
                toggleSoundButton.textContent = 'Unmute';
            }
            isMuted = !isMuted;
        });
    }
});

// Closing message functionality
document.addEventListener('DOMContentLoaded', () => {
    const closingMessage = document.getElementById('closing-message');
    const finalMessage = document.getElementById('final-message');

    if (closingMessage && finalMessage) {
        closingMessage.addEventListener('click', () => {
            closingMessage.classList.add('hidden');
            finalMessage.classList.remove('hidden');
            showConfetti(); // Trigger confetti for the final reveal
            
            // You could also add a special animation here
            finalMessage.style.animation = 'fadeIn 2s ease-in-out';
        });
    } else {
        console.warn('Closing message or final message element not found');
    }
});

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, calling updateSignature"); // Debug log
    updateSignature();
});
