document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    
    let yesScale = 1;
    let isFirstMove = true; // Flag to track the first interaction

    /* Move the "No" Button */
    const moveNoButton = () => {
        
        // CRITICAL FIX: Handle the first move smoothly
        if (isFirstMove) {
            // 1. Get current position before moving
            const rect = noBtn.getBoundingClientRect();
            
            // 2. Set absolute position at the EXACT same spot it currently is
            noBtn.style.position = "absolute";
            noBtn.style.left = rect.left + "px";
            noBtn.style.top = rect.top + "px";
            
            // 3. Force a "reflow" (tell browser to update layout instantly)
            // This prevents the "jump" and enables the transition
            void noBtn.offsetWidth; 
            
            isFirstMove = false;
        }

        // Standard Logic: Calculate random position
        const maxWidth = window.innerWidth - noBtn.offsetWidth;
        const maxHeight = window.innerHeight - noBtn.offsetHeight;

        const randomX = Math.random() * maxWidth;
        const randomY = Math.random() * maxHeight;

        // Apply new position (now it will always animate smoothly)
        noBtn.style.left = randomX + "px";
        noBtn.style.top = randomY + "px";

        // Scale Yes Button
        yesScale += 0.2; 
        yesBtn.style.transform = `scale(${yesScale})`;
    };

    /* Event Listeners */
    noBtn.addEventListener('mouseover', moveNoButton);

    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    yesBtn.addEventListener('click', () => {
        window.location.href = "yay.html";
    });
});
