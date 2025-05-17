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

    // --- Swiper Carrossel de Projetos ---
    if (document.querySelector('.project-swiper')) {
        const projectSwiper = new Swiper('.project-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            watchSlidesProgress: true, // Importante para aplicar estilos CSS baseados no progresso
            // loop: false, // Loop desabilitado conforme preferência anterior

            coverflowEffect: { // Configuração padrão para desktop
                rotate: 30,
                stretch: 0,     // Sem "esticamento"
                depth: 100,     // Profundidade da perspectiva
                modifier: 1,    // Multiplicador do efeito (1 = normal, <1 = menos efeito, >1 = mais efeito)
                slideShadows: true, // Sombras internas do coverflow nos slides laterais
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
                // Telas muito pequenas (e.g., iPhone SE)
                320: {
                    slidesPerView: 1.15, // Ver um pouco do próximo slide
                    spaceBetween: 10,
                    coverflowEffect: {
                        rotate: 0,          // Sem rotação para evitar embaçamento
                        stretch: 0,
                        depth: 50,          // Menor profundidade, slides mais "planos"
                        modifier: 1.2,      // Slides laterais um pouco menores, mas não muito. Ajuste este valor.
                        slideShadows: false, // Sem sombras internas para evitar escurecimento/embaçamento
                    },
                },
                // Telas pequenas (e.g., iPhone 14 Pro Max - 430px)
                400: { // Este breakpoint deve cobrir o seu caso de 430px
                    slidesPerView: 1.2, // Ver um pouco do próximo slide
                    spaceBetween: 15,
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 60,          // Profundidade sutil
                        modifier: 1.15,     // Slides laterais ligeiramente menores. Ajuste este valor.
                                            // Valores mais próximos de 1 significam que os slides laterais são maiores/mais próximos.
                        slideShadows: false,
                    },
                },
                // Telas médias (tablets pequenos em modo retrato)
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
                // Telas grandes (desktop)
                1024: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                    coverflowEffect: { // Herda do global ou pode ser redefinido
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    },
                }
            },
            on: {
                init: function () { this.update(); },
                resize: function () { this.update(); },
                tap: function (swiper, event) { // Evento 'tap' para cliques em mobile
                    const clickedElement = event.target;
                    // Tenta encontrar um link clicável subindo na árvore DOM a partir do elemento clicado
                    const link = clickedElement.closest('.project-link[href]');

                    // Verifica se o link existe, tem um href e está dentro do slide ATIVO
                    if (link && link.closest('.swiper-slide-active')) {
                        // Não precisa de event.preventDefault() aqui se o Swiper já não o fez
                        // e queremos que o comportamento padrão do link (navegar) ocorra.
                        // console.log('Swiper tap event on link:', link.href);

                        // Se o link deve abrir em nova aba
                        if (link.target === '_blank') {
                            window.open(link.href, '_blank', 'noopener noreferrer');
                        } else {
                            // Se não for nova aba, apenas navega
                            window.location.href = link.href;
                        }
                    }
                }
            }
        });
    }
    console.log("Portfólio Interativo Carregado. Carrossel JS atualizado.");
});
// <!--Feito por Rafael Dias Garcia-->