document.addEventListener('DOMContentLoaded', function() {
    const typingTextElement = document.getElementById('typing-effect');
    const textToType = "Estudante de Engenharia de Software | Backend Dev";
    const typingSpeed = 50;
    const deletingSpeed = 30;
    const delayBeforeDelete = 4000;
    const delayBeforeStart = 1700;
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const animatedSections = document.querySelectorAll('.animate-on-scroll');
    const currentYearElement = document.getElementById('currentYear');
    const profilePic = document.getElementById('profilePic');
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const bodyElement = document.body;
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
    function scrollFunction() {
        if (!scrollToTopBtn) return;
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopBtn.style.display = "block";
            setTimeout(() => {
                if (scrollToTopBtn.style.display === "block") {
                    scrollToTopBtn.style.opacity = "1";
                }
            }, 10);
        } else {
            scrollToTopBtn.style.opacity = "0";
            setTimeout(() => {
                if (scrollToTopBtn.style.opacity === "0") {
                    scrollToTopBtn.style.display = "none";
                }
            }, 300);
        }
    }
    if (scrollToTopBtn) {
        window.addEventListener('scroll', scrollFunction);
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 10;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    if (animatedSections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                }
            });
        };
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        animatedSections.forEach(section => {
            observer.observe(section);
        });
    }
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        if (!profilePic) return;
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop && st > 50) {
        } else {
        }
        lastScrollTop = st <= 0 ? 0 : st;
    }, false);
    const currentTheme = localStorage.getItem('theme');
    function applyTheme(theme) {
        if (theme === 'light') {
            bodyElement.classList.add('light-mode');
        } else {
            bodyElement.classList.remove('light-mode');
            if (theme !== 'dark') {
                localStorage.setItem('theme', 'dark');
            }
        }
    }
    if (currentTheme) {
        applyTheme(currentTheme);
    } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            applyTheme('dark');
        } else {
            applyTheme('dark');
        }
    }
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            let newTheme;
            if (bodyElement.classList.contains('light-mode')) {
                bodyElement.classList.remove('light-mode');
                newTheme = 'dark';
            } else {
                bodyElement.classList.add('light-mode');
                newTheme = 'light';
            }
            localStorage.setItem('theme', newTheme);
        });
    }
    console.log("Portfólio Interativo Carregado!");
});