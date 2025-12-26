document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        once: false,
        mirror: false,
        offset: 100,
        easing: 'ease-out-cubic',
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('bg-slate-900/90', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-white/5');
            navbar.classList.remove('py-2', 'bg-transparent');
            navbar.classList.add('py-0');
        } else {
            navbar.classList.remove('bg-slate-900/90', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-white/5', 'py-0');
            navbar.classList.add('py-2', 'bg-transparent');
        }
    });

    // 3. Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        } else {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });

    // 4. Audio Player Simulation
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const playRing = document.getElementById('play-ring');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const waveform = document.getElementById('waveform');
    const liveIndicator = document.getElementById('live-indicator');
    const playerGlow = document.getElementById('player-glow');
    const container = document.getElementById('audio-player-container');

    let isPlaying = false;
    let timerInterval;
    let currentTime = 0;
    const duration = 45; // seconds

    // Generate static waveform bars
    for(let i=0; i<30; i++) {
        const bar = document.createElement('div');
        bar.className = 'w-1.5 rounded-t-sm transition-all duration-300 bg-slate-600';
        bar.style.height = `${20 + Math.random() * 40}%`;
        bar.dataset.initialHeight = bar.style.height;
        waveform.appendChild(bar);
    }

    const bars = waveform.children;

    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        updatePlayerState();
    });

    function updatePlayerState() {
        if (isPlaying) {
            // UI Changes
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
            playRing.classList.add('hidden'); // Hide ping animation
            
            // Container Glow
            container.classList.add('border-brand-orange/50', 'shadow-[0_0_50px_-10px_rgba(249,115,22,0.4)]');
            container.classList.remove('border-white/10', 'shadow-2xl');
            
            // Background Glow
            playerGlow.classList.remove('bg-brand-blue/10', 'opacity-50');
            playerGlow.classList.add('bg-brand-orange/20', 'opacity-100');

            // Live Indicator
            liveIndicator.classList.remove('bg-slate-700/50');
            liveIndicator.classList.add('bg-red-500/10');
            liveIndicator.querySelector('.indicator-dot').classList.remove('bg-slate-500');
            liveIndicator.querySelector('.indicator-dot').classList.add('bg-red-500', 'animate-pulse');
            liveIndicator.querySelector('.indicator-text').innerText = 'Live';
            liveIndicator.querySelector('.indicator-text').classList.remove('text-slate-500');
            liveIndicator.querySelector('.indicator-text').classList.add('text-red-500');

            // Start Timer
            timerInterval = setInterval(() => {
                currentTime += 0.1; // speed up slightly for demo feel
                if (currentTime >= duration) {
                    currentTime = 0;
                    isPlaying = false;
                    updatePlayerState();
                }
                updateProgress();
                animateWaveform();
            }, 100);

        } else {
            // Stop UI
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            playRing.classList.remove('hidden');

            // Reset Container
            container.classList.remove('border-brand-orange/50', 'shadow-[0_0_50px_-10px_rgba(249,115,22,0.4)]');
            container.classList.add('border-white/10', 'shadow-2xl');

            // Reset Glow
            playerGlow.classList.add('bg-brand-blue/10', 'opacity-50');
            playerGlow.classList.remove('bg-brand-orange/20', 'opacity-100');

            // Reset Indicator
            liveIndicator.classList.add('bg-slate-700/50');
            liveIndicator.classList.remove('bg-red-500/10');
            liveIndicator.querySelector('.indicator-dot').classList.add('bg-slate-500');
            liveIndicator.querySelector('.indicator-dot').classList.remove('bg-red-500', 'animate-pulse');
            liveIndicator.querySelector('.indicator-text').innerText = 'Ready';
            liveIndicator.querySelector('.indicator-text').classList.add('text-slate-500');
            liveIndicator.querySelector('.indicator-text').classList.remove('text-red-500');

            clearInterval(timerInterval);
            resetWaveform();
        }
    }

    function updateProgress() {
        const percent = (currentTime / duration) * 100;
        progressBar.style.width = `${percent}%`;
        
        const seconds = Math.floor(currentTime);
        currentTimeEl.innerText = `00:${seconds.toString().padStart(2, '0')}`;
    }

    function animateWaveform() {
        for(let bar of bars) {
            bar.classList.remove('bg-slate-600');
            bar.classList.add('bg-brand-orange');
            // Randomize height for "talking" effect
            bar.style.height = `${Math.random() * 100}%`;
        }
    }

    function resetWaveform() {
        for(let bar of bars) {
            bar.classList.add('bg-slate-600');
            bar.classList.remove('bg-brand-orange');
            bar.style.height = bar.dataset.initialHeight;
        }
    }

    // 5. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const button = item.querySelector('button');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.icon-chevron');

        button.addEventListener('click', () => {
            const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
            
            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.querySelector('.faq-content').style.maxHeight = '0px';
                otherItem.querySelector('.faq-content').classList.remove('opacity-100');
                otherItem.querySelector('.icon-chevron').classList.remove('rotate-180');
            });

            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add('opacity-100');
                icon.classList.add('rotate-180');
            }
        });
    });

    // 6. Modals (Privacy & Terms)
    const privacyModal = document.getElementById('privacy-modal');
    const termsModal = document.getElementById('terms-modal');
    const openPrivacy = document.getElementById('open-privacy');
    const openTerms = document.getElementById('open-terms');
    const closeButtons = document.querySelectorAll('.close-modal, .modal-backdrop');

    function toggleModal(modal, show) {
        if(show) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden'; // prevent background scrolling
        } else {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }
    }

    openPrivacy.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal(privacyModal, true);
    });

    openTerms.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal(termsModal, true);
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleModal(privacyModal, false);
            toggleModal(termsModal, false);
        });
    });
});