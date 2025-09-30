/* ==========================================================================
   Bootstrap 5 Custom Scripts - Rafael Dias Garcia Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {

    // Elements
    const typingTextElement = document.getElementById('typing-effect');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const animatedSections = document.querySelectorAll('.animate-on-scroll');
    const currentYearElement = document.getElementById('currentYear');
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const progressBar = document.getElementById('scroll-progress-bar');
    const bodyElement = document.body;

    // ==========================================================================
    // Typing Effect
    // ==========================================================================
    
    const textToType = "Estudante de Engenharia de Software | Backend Dev";
    const typingSpeed = 50;
    const deletingSpeed = 30;
    const delayBeforeDelete = 4000;
    const delayBeforeStart = 1700;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typingTextElement) return;

        const currentText = textToType;
        let textContent = '';

        if (isDeleting) {
            textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        typingTextElement.textContent = textContent;

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => { isDeleting = true; }, delayBeforeDelete);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
        }

        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeEffect, speed);
    }

    if (typingTextElement) {
        setTimeout(typeEffect, delayBeforeStart);
    }

    // ==========================================================================
    // Scroll to Top Button
    // ==========================================================================
    
    function handleScrollToTopButtonVisibility() {
        if (!scrollToTopBtn) return;

        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollPosition > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================================================
    // Smooth Scroll for Links
    // ==========================================================================
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const offset = 20;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ==========================================================================
    // Intersection Observer for Animations
    // ==========================================================================
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    };

    if (animatedSections.length > 0) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        animatedSections.forEach(section => observer.observe(section));
    }

    // ==========================================================================
    // Current Year in Footer
    // ==========================================================================
    
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // ==========================================================================
    // Theme Toggle (Light/Dark Mode)
    // ==========================================================================
    
    const savedTheme = localStorage.getItem('theme');

    function applyTheme(theme) {
        if (theme === 'light') {
            bodyElement.classList.add('light-mode');
        } else {
            bodyElement.classList.remove('light-mode');
            if (theme !== 'dark' && theme !== 'light') {
                localStorage.setItem('theme', 'dark');
            }
        }
    }

    applyTheme(savedTheme || 'dark');

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const isLightMode = bodyElement.classList.toggle('light-mode');
            const newTheme = isLightMode ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
        });
    }

    // ==========================================================================
    // Progress Bar
    // ==========================================================================
    
    function updateProgressBar() {
        if (!progressBar) return;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progressBar.style.transform = `scaleX(${scrollHeight <= 0 ? 0 : scrollTop / scrollHeight})`;
    }

    // ==========================================================================
    // Main Scroll Handler
    // ==========================================================================
    
    function handleScroll() {
        handleScrollToTopButtonVisibility();
        updateProgressBar();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScrollToTopButtonVisibility();
    updateProgressBar();

    // Close navbar on mobile after clicking a link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    // ==========================================================================
    // Form Status Handler (Contact Page)
    // ==========================================================================
    
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(e) {
            // Formspree handles the submission, but we can show a loading state
            formStatus.innerHTML = '<div class="alert alert-info">Enviando mensagem...</div>';
        });
    }

    // ==========================================================================
    // Console Log
    // ==========================================================================
    
    console.log("✅ Portfólio com Bootstrap 5 carregado com sucesso!");
    console.log("📦 Usando Bootstrap 5.3.2 (100% nativo)");
    console.log("🎨 Tema: " + (savedTheme || 'dark'));
    console.log("🎠 Carousel: Bootstrap Carousel nativo");
    
});

/* Feito por Rafael Dias Garcia */
