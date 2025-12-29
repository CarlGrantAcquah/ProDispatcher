document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: false,
            mirror: false,
            offset: 100,
            easing: 'ease-out-cubic',
        });
    }

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

    if (menuBtn) {
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
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });

    // 4. Audio Player Simulation (Actual Audio)
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const playRing = document.getElementById('play-ring');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const waveform = document.getElementById('waveform');
    const liveIndicator = document.getElementById('live-indicator');
    const playerGlow = document.getElementById('player-glow');
    const container = document.getElementById('audio-player-container');
    const audio = document.getElementById('main-audio');

    if (playBtn && audio) {
        let isPlaying = false;
        let waveformInterval;

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
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        });

        audio.addEventListener('play', () => {
            isPlaying = true;
            updatePlayerState(true);
            waveformInterval = setInterval(animateWaveform, 100);
        });

        audio.addEventListener('pause', () => {
            isPlaying = false;
            updatePlayerState(false);
            clearInterval(waveformInterval);
            resetWaveform();
        });

        audio.addEventListener('ended', () => {
            isPlaying = false;
            updatePlayerState(false);
            clearInterval(waveformInterval);
            resetWaveform();
            audio.currentTime = 0;
        });

        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                const percent = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = `${percent}%`;
                
                const minutes = Math.floor(audio.currentTime / 60);
                const seconds = Math.floor(audio.currentTime % 60);
                currentTimeEl.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        });

        function updatePlayerState(playing) {
            if (playing) {
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
                playRing.classList.add('hidden');
                
                container.classList.add('border-brand-orange/50', 'shadow-[0_0_50px_-10px_rgba(249,115,22,0.4)]');
                container.classList.remove('border-white/10', 'shadow-2xl');
                
                playerGlow.classList.remove('bg-brand-blue/10', 'opacity-50');
                playerGlow.classList.add('bg-brand-orange/20', 'opacity-100');

                liveIndicator.classList.remove('bg-slate-700/50');
                liveIndicator.classList.add('bg-red-500/10');
                liveIndicator.querySelector('.indicator-dot').classList.remove('bg-slate-500');
                liveIndicator.querySelector('.indicator-dot').classList.add('bg-red-500', 'animate-pulse');
                liveIndicator.querySelector('.indicator-text').innerText = 'Live';
                liveIndicator.querySelector('.indicator-text').classList.remove('text-slate-500');
                liveIndicator.querySelector('.indicator-text').classList.add('text-red-500');
            } else {
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
                playRing.classList.remove('hidden');

                container.classList.remove('border-brand-orange/50', 'shadow-[0_0_50px_-10px_rgba(249,115,22,0.4)]');
                container.classList.add('border-white/10', 'shadow-2xl');

                playerGlow.classList.add('bg-brand-blue/10', 'opacity-50');
                playerGlow.classList.remove('bg-brand-orange/20', 'opacity-100');

                liveIndicator.classList.add('bg-slate-700/50');
                liveIndicator.classList.remove('bg-red-500/10');
                liveIndicator.querySelector('.indicator-dot').classList.add('bg-slate-500');
                liveIndicator.querySelector('.indicator-dot').classList.remove('bg-red-500', 'animate-pulse');
                liveIndicator.querySelector('.indicator-text').innerText = 'Ready';
                liveIndicator.querySelector('.indicator-text').classList.add('text-slate-500');
                liveIndicator.querySelector('.indicator-text').classList.remove('text-red-500');
            }
        }

        function animateWaveform() {
            for(let bar of bars) {
                bar.classList.remove('bg-slate-600');
                bar.classList.add('bg-brand-orange');
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
    }

    // 5. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const button = item.querySelector('button');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.icon-chevron');

        button.addEventListener('click', () => {
            const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
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

    // 6. Modals (Privacy, Terms, and Contact)
    const privacyModal = document.getElementById('privacy-modal');
    const termsModal = document.getElementById('terms-modal');
    const contactModal = document.getElementById('contact-modal');
    
    const openPrivacy = document.getElementById('open-privacy');
    const openTerms = document.getElementById('open-terms');
    const openContactBtns = document.querySelectorAll('.open-contact-modal');
    
    const closeButtons = document.querySelectorAll('.close-modal, .close-contact-modal, .modal-backdrop');

    function toggleModal(modal, show) {
        if(show) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden'; 
        } else {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }
    }

    if(openPrivacy) openPrivacy.addEventListener('click', (e) => { e.preventDefault(); toggleModal(privacyModal, true); });
    if(openTerms) openTerms.addEventListener('click', (e) => { e.preventDefault(); toggleModal(termsModal, true); });
    
    openContactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleModal(contactModal, true);
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleModal(privacyModal, false);
            toggleModal(termsModal, false);
            toggleModal(contactModal, false);
        });
    });

    // 7. Contact Form Submission (Fixed for CORS)
    const form = document.getElementById('strategy-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');

    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            submitBtn.disabled = true;
            btnText.innerText = "Sending...";
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
            btnSpinner.classList.remove('hidden');

            // Convert FormData to URLSearchParams (Standard Form Encoding)
            // This format combined with no-cors mode allows the request to pass through
            const formData = new FormData(form);
            const urlEncodedData = new URLSearchParams(formData);

            try {
                // We use mode: 'no-cors'. This allows the browser to send the data 
                // to n8n without waiting for a permission slip (CORS header).
                // Note: The response will be "opaque", meaning we can't read the text response,
                // but if it doesn't throw a network error, it went through.
                await fetch('https://n8n-w0tv.onrender.com/webhook/6b26e309-5e56-4e98-96ad-27f9f7c1508c', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: urlEncodedData,
                });

                // Assume success if no error was thrown
                btnText.innerText = "Request Sent!";
                btnSpinner.classList.add('hidden');
                submitBtn.classList.remove('bg-brand-orange', 'hover:bg-orange-600');
                submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                
                setTimeout(() => {
                    form.reset();
                    toggleModal(contactModal, false);
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('opacity-75', 'cursor-not-allowed', 'bg-green-600', 'hover:bg-green-700');
                        submitBtn.classList.add('bg-brand-orange', 'hover:bg-orange-600');
                        btnText.innerText = "Submit Request";
                    }, 500);
                }, 2000);

            } catch (error) {
                console.error('Error:', error);
                btnText.innerText = "Error. Try Again.";
                btnSpinner.classList.add('hidden');
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            }
        });
    }
});
