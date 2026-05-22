// Telegram Countdown Page Script - Enhanced Japanese Style
document.addEventListener('DOMContentLoaded', function () {
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const progressBar = document.getElementById('progressBar');
    const countdownSection = document.querySelector('.countdown-section');
    const particlesContainer = document.getElementById('particles');
    const petalsContainer = document.getElementById('petals');

    // Total time: 30 seconds
    const totalTime = 30;
    let timeRemaining = totalTime;

    // Performance-aware particle count
    const isMobile = window.innerWidth <= 480;
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const particleCount = isMobile || isLowEnd ? 10 : 18;
    const petalCount = isMobile || isLowEnd ? 10 : 16;

    createParticles(particleCount);
    createPetals(petalCount);

    // Start countdown
    const countdownInterval = setInterval(function () {
        timeRemaining--;

        if (timeRemaining <= 0) {
            timeRemaining = 0;
            clearInterval(countdownInterval);
            onCountdownComplete();
        }

        updateDisplay();
        updateProgress();
    }, 1000);

    // Initial display
    updateDisplay();
    updateProgress();

    function updateDisplay() {
        const mins = Math.floor(timeRemaining / 60);
        const secs = timeRemaining % 60;

        const newMins = String(mins).padStart(2, '0');
        const newSecs = String(secs).padStart(2, '0');

        // Add pulse animation on change
        if (minutesEl.textContent !== newMins) {
            minutesEl.style.transform = 'scale(1.1)';
            setTimeout(() => { minutesEl.style.transform = 'scale(1)'; }, 150);
        }
        if (secondsEl.textContent !== newSecs) {
            secondsEl.style.transform = 'scale(1.1)';
            setTimeout(() => { secondsEl.style.transform = 'scale(1)'; }, 150);
        }

        minutesEl.textContent = newMins;
        secondsEl.textContent = newSecs;
    }

    function updateProgress() {
        const elapsed = totalTime - timeRemaining;
        const percentage = (elapsed / totalTime) * 100;
        progressBar.style.width = percentage + '%';
    }

    function onCountdownComplete() {
        // Update countdown section style
        countdownSection.classList.add('completed');

        // Update label
        const label = countdownSection.querySelector('.countdown-label');
        label.textContent = '✓ Timer Complete';

        // Set progress to 100%
        progressBar.style.width = '100%';

        // Add celebration burst
        createCelebrationBurst();

        // Redirect to Telegram link after a brief delay
        setTimeout(function () {
            window.location.href = 'https://t.me/MohiniLive?text=hello';
        }, 1500);
    }

    function createParticles(count) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 5 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = (Math.random() * 6) + 's';
            particle.style.animationDuration = (Math.random() * 4 + 5) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    function createPetals(count) {
        for (let i = 0; i < count; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDuration = (Math.random() * 5 + 7) + 's';
            petal.style.animationDelay = (Math.random() * 10) + 's';
            const size = Math.random() * 8 + 6;
            petal.style.width = size + 'px';
            petal.style.height = size + 'px';
            petal.style.opacity = Math.random() * 0.5 + 0.3;
            petalsContainer.appendChild(petal);
        }
    }

    function createCelebrationBurst() {
        const burstCount = 20;
        for (let i = 0; i < burstCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.borderRadius = '50%';
            particle.style.top = '50%';
            particle.style.left = '50%';
            particle.style.zIndex = '100';
            particle.style.pointerEvents = 'none';

            const colors = ['#34d399', '#6ee7b7', '#a7f3d0', '#ffb7c5', '#c084fc'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            const angle = (Math.PI * 2 * i) / burstCount;
            const distance = 80 + Math.random() * 60;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            particle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            particle.style.opacity = '1';
            particle.style.boxShadow = '0 0 6px ' + particle.style.background;

            document.body.appendChild(particle);

            requestAnimationFrame(() => {
                particle.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
                particle.style.opacity = '0';
            });

            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    // Smooth digit transition
    const digits = document.querySelectorAll('.time-digit');
    digits.forEach(digit => {
        digit.style.transition = 'transform 0.15s ease-out';
    });

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Prevent layout thrashing on resize
        }, 250);
    });
});