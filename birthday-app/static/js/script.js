// Flip card functionality
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Celebration function with confetti
function celebrate() {
    // Add celebration class to body
    document.body.classList.add('celebration');
    
    // Create confetti
    createConfetti();
    
    // Show celebration message
    showCelebrationMessage();
    
    // Remove celebration class after animation
    setTimeout(() => {
        document.body.classList.remove('celebration');
    }, 1000);
}

// Create confetti animation
function createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ff6347', '#ffd700', '#98fb98'];
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 100; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';
        confettiPiece.style.left = Math.random() * 100 + '%';
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.animationDelay = Math.random() * 2 + 's';
        confettiPiece.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confettiContainer.appendChild(confettiPiece);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
        document.body.removeChild(confettiContainer);
    }, 5000);
}

// Show celebration message
function showCelebrationMessage() {
    const messages = [
        "🎉 Feliz Aniversário, Amor! 🎉",
        "💕 Te amo muito, Bê! 💕",
        "🌟 Você é incrível! 🌟",
        "💖 Minha princesa linda! 💖",
        "🎂 Parabéns, meu amor! 🎂"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff6b6b, #ee5a24);
        color: white;
        padding: 30px 40px;
        border-radius: 25px;
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        animation: celebration-message 3s ease-in-out;
    `;
    messageElement.textContent = randomMessage;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebration-message {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(messageElement);
    
    // Remove message after animation
    setTimeout(() => {
        document.body.removeChild(messageElement);
        document.head.removeChild(style);
    }, 3000);
}

// Add touch-friendly interactions for mobile
document.addEventListener('DOMContentLoaded', function() {
    // Add touch feedback to interactive elements
    const interactiveElements = document.querySelectorAll('.reason-card, .celebration-btn, .photo-placeholder');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Auto-flip cards on mobile after a delay
    const reasonCards = document.querySelectorAll('.reason-card');
    reasonCards.forEach((card, index) => {
        setTimeout(() => {
            if (window.innerWidth <= 768) {
                card.classList.add('flipped');
                setTimeout(() => {
                    card.classList.remove('flipped');
                }, 2000);
            }
        }, (index + 1) * 3000);
    });
});

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.love-message, .reasons-section, .gallery-section, .wishes-section, .final-message');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize scroll animations when page loads
document.addEventListener('DOMContentLoaded', addScrollAnimations);

// Add romantic background music (optional - user can uncomment)
function playBackgroundMusic() {
    // Uncomment the lines below to add background music
    // const audio = new Audio('path/to/romantic-song.mp3');
    // audio.loop = true;
    // audio.volume = 0.3;
    // audio.play().catch(e => console.log('Audio autoplay prevented'));
}

// Easter egg: Double tap anywhere to create hearts
let tapCount = 0;
let tapTimer = null;

document.addEventListener('touchend', function(e) {
    tapCount++;
    
    if (tapCount === 1) {
        tapTimer = setTimeout(() => {
            tapCount = 0;
        }, 300);
    } else if (tapCount === 2) {
        clearTimeout(tapTimer);
        tapCount = 0;
        createFloatingHeart(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
});

function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 1000;
        animation: float-up 2s ease-out forwards;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-up {
            0% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-100px) scale(1.5); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        document.body.removeChild(heart);
        document.head.removeChild(style);
    }, 2000);
}
