document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const navbar = document.getElementById('navbar');
    const chatBtn = document.getElementById('chat-btn');
    const chatPopup = document.getElementById('chat-popup');
    const closeChat = document.getElementById('close-chat');
    
    // --- Theme Toggle (Dark/Light Mode) ---
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', newTheme);
        
        // Update Icon
        const icon = themeToggle.querySelector('i');
        if (newTheme === 'light') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // --- Sticky Navbar on Scroll ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Chat Popup Toggle ---
    chatBtn.addEventListener('click', () => {
        chatPopup.classList.toggle('active');
    });

    closeChat.addEventListener('click', () => {
        chatPopup.classList.remove('active');
    });

    // --- Scroll Reveal Animations utilizing IntersectionObserver ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop tracking once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Animated Counters ---
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false; // Prevent re-animating

    const counterOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true; // Set flag
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        
                        // Calculate increment step based on target size
                        const inc = target / 50; // Smoothness factor
                        
                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 30);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        });
    }, counterOptions);

    const statsSection = document.getElementById('stats-counter');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }
    
    // --- Smooth Scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

});
