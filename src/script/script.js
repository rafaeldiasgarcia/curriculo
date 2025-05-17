document.addEventListener('DOMContentLoaded', function() {

    const typingTextElement = document.getElementById('typing-effect');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const animatedSections = document.querySelectorAll('.animate-on-scroll');
    const currentYearElement = document.getElementById('currentYear');
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const progressBar = document.getElementById('scroll-progress-bar');
    const bodyElement = document.body;

    const textToType = "Estudante de Engenharia de Software | Backend Dev";
    const typingSpeed = 50;
    const deletingSpeed = 30;
    const delayBeforeDelete = 4000;
    const delayBeforeStart = 1700;
    let charIndex = 0;
    let isDeleting = false;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

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

    function handleScrollToTopButtonVisibility() {
        if (!scrollToTopBtn) return;

        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollPosition > 100) {
            if (scrollToTopBtn.style.display !== "block") {
                scrollToTopBtn.style.display = "block";
                setTimeout(() => { scrollToTopBtn.style.opacity = "1"; }, 10);
            }
        } else {
            if (scrollToTopBtn.style.opacity !== "0") {
                scrollToTopBtn.style.opacity = "0";
                setTimeout(() => {
                    if (scrollToTopBtn.style.opacity === "0") {
                        scrollToTopBtn.style.display = "none";
                    }
                }, 300);
            }
        }
    }

    if (scrollToTopBtn) {
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
                const offset = 20;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

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

    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

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

    function updateProgressBar() {
        if (!progressBar) return;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progressBar.style.transform = `scaleX(${scrollHeight <= 0 ? 0 : scrollTop / scrollHeight})`;
    }

    function handleScroll() {
        handleScrollToTopButtonVisibility();
        updateProgressBar();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScrollToTopButtonVisibility();
    updateProgressBar();

    if (document.querySelector('.project-swiper')) {
        const projectSwiper = new Swiper('.project-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            watchSlidesProgress: true,
            coverflowEffect: {
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            keyboard: {
                enabled: true,
                onlyInViewport: false,
            },
            a11y: {
                prevSlideMessage: 'Projeto anterior',
                nextSlideMessage: 'Próximo projeto',
                paginationBulletMessage: 'Ir para o projeto {{index}}',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.15,
                    spaceBetween: 10,
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 60,
                        modifier: 1.5,
                        slideShadows: false,
                    },
                },
                400: {
                    slidesPerView: 1.2,
                    spaceBetween: 15,
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 70,
                        modifier: 1.15,
                        slideShadows: false,
                    },
                },
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                    coverflowEffect: {
                        rotate: 20,
                        stretch: 0,
                        depth: 80,
                        modifier: 1,
                        slideShadows: true,
                    },
                },
                1024: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                    coverflowEffect: {
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    },
                }
            },
            on: {
                init: function() { this.update(); },
                resize: function() { this.update(); },
            }
        });
    }

    const dropdownToggles = document.querySelectorAll('.cert-action-dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            event.stopPropagation();
            const dropdownMenu = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            closeAllDropdowns(this);

            if (isExpanded) {
                dropdownMenu.classList.remove('is-active');
                this.setAttribute('aria-expanded', 'false');
                this.classList.remove('is-active');
            } else {
                dropdownMenu.classList.add('is-active');
                this.setAttribute('aria-expanded', 'true');
                this.classList.add('is-active');
            }
        });
    });

    function closeAllDropdowns(exceptThisToggle) {
        dropdownToggles.forEach(toggle => {
            if (toggle !== exceptThisToggle) {
                const menu = toggle.nextElementSibling;
                if (menu && menu.classList.contains('cert-dropdown-menu')) {
                    menu.classList.remove('is-active');
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.classList.remove('is-active');
                }
            }
        });
    }

    document.addEventListener('click', function(event) {
        dropdownToggles.forEach(toggle => {
            const dropdownMenu = toggle.nextElementSibling;
            if (dropdownMenu && dropdownMenu.classList.contains('is-active') &&
                !toggle.contains(event.target) &&
                !dropdownMenu.contains(event.target)) {

                dropdownMenu.classList.remove('is-active');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.classList.remove('is-active');
            }
        });
    });

    console.log("Portfólio Interativo Carregado. Swiper e Dropdowns de Certificados inicializados.");
});

/* Feito por Rafael Dias Garcia */
