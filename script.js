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
    if (navbar) {
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
    }

    // 3. Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (menuBtn && mobileMenu && menuIcon) {
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
    }

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
    const audio = document.getElementById('main-audio');

    if (playBtn && audio && waveform) {
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

    // Helper to reset contact form state
    function resetContactModal() {
        const formContainer = document.getElementById('contact-form-container');
        const successMessage = document.getElementById('success-message');
        const form = document.getElementById('strategy-form');
        const submitBtn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');

        if(formContainer && successMessage && form) {
            formContainer.classList.remove('hidden');
            successMessage.classList.add('hidden');
            successMessage.classList.remove('flex');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-75', 'cursor-not-allowed', 'bg-green-600', 'hover:bg-green-700');
            submitBtn.classList.add('bg-brand-orange', 'hover:bg-orange-600');
            btnText.innerText = "Submit Request";
        }
    }

    // FIXED: Toggle Modal with Safety Check
    function toggleModal(modal, show) {
        if (!modal) return; // Stop if modal doesn't exist to prevent crash

        if(show) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden'; 
        } else {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
            
            // Reset contact form if it's the contact modal being closed
            if (modal.id === 'contact-modal') {
                setTimeout(resetContactModal, 300); 
            }
        }
    }

    if(openPrivacy) openPrivacy.addEventListener('click', (e) => { e.preventDefault(); toggleModal(privacyModal, true); });
    if(openTerms) openTerms.addEventListener('click', (e) => { e.preventDefault(); toggleModal(termsModal, true); });
    
    if(openContactBtns) {
        openContactBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleModal(contactModal, true);
            });
        });
    }

    if(closeButtons) {
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleModal(privacyModal, false);
                toggleModal(termsModal, false);
                toggleModal(contactModal, false);
            });
        });
    }

    // 7. Contact Form Submission (Hidden Iframe Method)
    const form = document.getElementById('strategy-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    const formContainer = document.getElementById('contact-form-container');
    const successMessage = document.getElementById('success-message');
    const hiddenIframe = document.getElementById('hidden_iframe');

    if(form && hiddenIframe) {
        form.addEventListener('submit', (e) => {
            // Do NOT prevent default; let form submit to iframe
            
            // Show loading state
            if(submitBtn) {
                submitBtn.disabled = true;
                btnText.innerText = "Sending...";
                submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
                btnSpinner.classList.remove('hidden');
            }

            // Handle response via iframe onload
            hiddenIframe.onload = function() {
                if(btnText) btnText.innerText = "Success!";
                if(btnSpinner) btnSpinner.classList.add('hidden');
                
                // Show Thank You Message
                if(formContainer) formContainer.classList.add('hidden');
                if(successMessage) {
                    successMessage.classList.remove('hidden');
                    successMessage.classList.add('flex');
                }

                // Remove the handler
                hiddenIframe.onload = null;
            };
        });
    }
});
