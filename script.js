document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const speechBubble = document.getElementById('speech-bubble'); 
    
    // MUSIC & OVERLAY ELEMENTS
    const audio = document.getElementById('bg-music');
    const overlay = document.getElementById('music-overlay');
    const startBtn = document.getElementById('start-btn');

    // --- NEW: HANDLE START BUTTON ---
    if (startBtn && overlay && audio) {
        startBtn.addEventListener('click', () => {
            // 1. Play Music (Works because user clicked!)
            audio.volume = 0.5;
            audio.play().catch(err => console.log("Audio play error:", err));
            
            // 2. Fade out overlay
            overlay.classList.add('hidden');
        });
    }

    let yesScale = 1;
    let isFirstMove = true;
    
    // MESSAGES
    const messages = [
        "Don't you dare click NO!!!!!",
        "Just click YES already!",
        "If you say NO, I will cry... 😭",
        "Stop chasing the NO 💔",
        "I am absolutely NOT letting you click NO!",
        "The YES looks very tempting 🥺",
        "You can't escape the NO 😈"
    ];
    let messageIndex = 0; 

    const MAX_SCALE = 2.2; 
    
    if(yesBtn) {
        yesBtn.style.setProperty('--yes-scale', yesScale);
    }

    /* Move the "No" Button */
    const moveNoButton = () => {
        if (isFirstMove) {
            const rect = noBtn.getBoundingClientRect();
            noBtn.style.position = "absolute";
            noBtn.style.left = rect.left + "px";
            noBtn.style.top = rect.top + "px";
            void noBtn.offsetWidth; 
            isFirstMove = false;
        }

        const noWidth = noBtn.offsetWidth;
        const noHeight = noBtn.offsetHeight;
        const maxWidth = window.innerWidth - noWidth;
        const maxHeight = window.innerHeight - noHeight;
        const yesRect = yesBtn.getBoundingClientRect();

        let randomX, randomY;
        let overlap = false;
        let attempts = 0;

        do {
            randomX = Math.random() * maxWidth;
            randomY = Math.random() * maxHeight;

            const noLeft = randomX;
            const noRight = randomX + noWidth;
            const noTop = randomY;
            const noBottom = randomY + noHeight;

            overlap = (
                noLeft < yesRect.right + 10 &&
                noRight > yesRect.left - 10 &&
                noTop < yesRect.bottom + 10 &&
                noBottom > yesRect.top - 10
            );
            attempts++;
        } while (overlap && attempts < 50);

        noBtn.style.left = randomX + "px";
        noBtn.style.top = randomY + "px";

        if(speechBubble) {
            messageIndex = (messageIndex + 1) % messages.length;
            speechBubble.innerText = messages[messageIndex];
        }

        if (yesScale < MAX_SCALE) {
            yesScale += 0.2; 
            yesBtn.style.setProperty('--yes-scale', yesScale);
        }

        yesBtn.classList.remove('shake'); 
        void yesBtn.offsetWidth; 
        yesBtn.classList.add('shake');
    };

    /* Event Listeners */
    if(noBtn) {
        noBtn.addEventListener('mouseover', moveNoButton);
        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            moveNoButton();
        });
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveNoButton();
        });
    }

    if(yesBtn) {
        yesBtn.addEventListener('click', () => {
            window.location.href = "yay.html";
        });
    }
});
