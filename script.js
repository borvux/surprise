document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const speechBubble = document.getElementById('speech-bubble'); 
    const audio = document.getElementById('bg-music'); // Select the audio
    
    // --- MUSIC AUTOPLAY LOGIC ---
    // Try to play audio immediately
    if (audio) {
        audio.volume = 0.5; // Set volume to 50% so it's not too loud
        audio.play().catch(error => {
            // If autoplay is blocked, wait for the first interaction
            console.log("Autoplay blocked. Waiting for interaction.");
            
            const playAudio = () => {
                audio.play();
                // Remove listeners once it starts playing
                document.removeEventListener('click', playAudio);
                document.removeEventListener('touchstart', playAudio);
            };
            
            document.addEventListener('click', playAudio);
            document.addEventListener('touchstart', playAudio);
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
