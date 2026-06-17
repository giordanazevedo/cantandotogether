document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('play-btn');
    const record = document.getElementById('record');
    const audio = document.getElementById('audio-player');
    const instruction = document.querySelector('.instruction');
    
    let isPlaying = false;

    // Simulate auto-play attempt when page loads (browsers usually block this without interaction)
    // We add an interaction listener to start the experience
    
    // Sync UI with actual audio state
    if (audio) {
        audio.addEventListener('play', () => {
            isPlaying = true;
            record.classList.add('spin');
            instruction.style.opacity = '0';
            playBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 28px; height: 28px;">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
            `;
            playBtn.style.paddingLeft = '0';
        });

        audio.addEventListener('pause', () => {
            isPlaying = false;
            record.classList.remove('spin');
            instruction.style.opacity = '0.5';
            instruction.textContent = 'Pausado';
            playBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="play-icon" style="width: 28px; height: 28px; margin-left: 4px;">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
            `;
        });
    }

    document.body.addEventListener('click', function initPlay() {
        if (audio && audio.paused) {
            audio.play().catch(e => console.log("Autoplay blocked by browser until interaction:", e));
        }
        document.body.removeEventListener('click', initPlay);
    }, { once: true });

    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (audio) {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    });
});
