document.addEventListener('DOMContentLoaded', function() {

    // =============================================
    // --- Seletores de Elementos DOM ---
    // =============================================
    const typingTextElement = document.getElementById('typing-effect');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const animatedSections = document.querySelectorAll('.animate-on-scroll');
    const currentYearElement = document.getElementById('currentYear');
    const profilePic = document.getElementById('profilePic'); // Mantido, embora o efeito esteja comentado
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const progressBar = document.getElementById('scroll-progress-bar');
    const bodyElement = document.body;


    // =============================================
    // --- Configurações e Constantes ---
    // =============================================
    // Configs Efeito de Digitação
    const textToType = "Estudante de Engenharia de Software | Backend Dev";
    const typingSpeed = 50;
    const deletingSpeed = 30;
    const delayBeforeDelete = 4000;
    const delayBeforeStart = 1700;
    let charIndex = 0;
    let isDeleting = false;

    // Configs Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };


    // =============================================
    // --- Efeito de Digitação (Typing Effect) ---
    // =============================================
    function typeEffect() {
        if (!typingTextElement) return; // Sai se o elemento não existir

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

        // Lógica de inversão (digitar -> apagar -> digitar)
        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => { isDeleting = true; }, delayBeforeDelete);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Poderia adicionar lógica para trocar o texto aqui se quisesse múltiplos textos
        }

        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeEffect, speed);
    }

    // Inicia o efeito de digitação após um delay
    if (typingTextElement) {
        setTimeout(typeEffect, delayBeforeStart);
    }


    // =============================================
    // --- Botão Voltar ao Topo ---
    // =============================================
    function handleScrollToTopButtonVisibility() {
        if (!scrollToTopBtn) return; // Sai se o botão não existir

        const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

        if (scrollPosition > 100) {
            // Mostra o botão com fade-in suave
            if (scrollToTopBtn.style.display !== "block") {
                scrollToTopBtn.style.display = "block";
                // Pequeno timeout para garantir que o display block foi aplicado antes da opacidade
                setTimeout(() => { scrollToTopBtn.style.opacity = "1"; }, 10);
            }
        } else {
            // Esconde o botão com fade-out suave
            if (scrollToTopBtn.style.opacity !== "0") {
                scrollToTopBtn.style.opacity = "0";
                // Espera a transição da opacidade terminar antes de aplicar display none
                setTimeout(() => {
                    // Verifica novamente caso o usuário role para baixo rapidamente
                    if (scrollToTopBtn.style.opacity === "0") {
                        scrollToTopBtn.style.display = "none";
                    }
                }, 300); // Deve corresponder à duração da transição CSS
            }
        }
    }

    // Adiciona evento de clique ao botão para rolar suavemente para o topo
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // =============================================
    // --- Rolagem Suave para Links Internos ---
    // =============================================
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Previne o comportamento padrão do link de âncora
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0; // Altura da navbar (se existir)
                const offset = 10; // Pequeno espaço extra acima da seção
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // =============================================
    // --- Animação ao Rolar (Intersection Observer) ---
    // =============================================
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Descomente a linha abaixo para animar cada seção apenas uma vez
                // observer.unobserve(entry.target);
            } else {
                // Descomente a linha abaixo se quiser que a animação ocorra novamente ao sair e entrar na viewport
                // entry.target.classList.remove('is-visible');
            }
        });
    };

    if (animatedSections.length > 0) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        animatedSections.forEach(section => {
            observer.observe(section);
        });
    }


    // =============================================
    // --- Atualizar Ano no Rodapé ---
    // =============================================
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }


    // =============================================
    // --- Efeito sutil na foto de perfil ao rolar (FUNCIONALIDADE COMENTADA) ---
    // =============================================
    /*
    let lastScrollTop = 0;
    function handleProfilePicScrollEffect() {
        if (!profilePic) return; // Sai se a imagem não existir
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop && currentScroll > 50) {
            // Rolando para baixo - poderia diminuir um pouco
            // profilePic.style.transform = 'scale(0.95)';
        } else {
            // Rolando para cima ou no topo - volta ao normal
            // profilePic.style.transform = 'scale(1)';
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Para lidar com rolagem negativa em alguns browsers/dispositivos
    }
    */


    // =============================================
    // --- Toggle Light/Dark Mode ---
    // =============================================
    // Verifica tema salvo no localStorage ou preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    function applyTheme(theme) {
        if (theme === 'light') {
            bodyElement.classList.add('light-mode');
        } else {
            bodyElement.classList.remove('light-mode');
            // Garante que 'dark' seja o padrão se não houver tema salvo ou se for inválido
            if (theme !== 'dark') {
                localStorage.setItem('theme', 'dark'); // Força dark como padrão no storage
            }
        }
    }

    // Aplica o tema inicial
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Define 'dark' como padrão inicial se não houver preferência salva
        // ou se a preferência do sistema for dark. Pode ajustar para 'light' se preferir.
        applyTheme(prefersDark ? 'dark' : 'dark');
    }

    // Adiciona evento de clique ao botão de toggle
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            // Alterna a classe no body
            const isLightMode = bodyElement.classList.toggle('light-mode');
            // Define o novo tema baseado na presença da classe
            const newTheme = isLightMode ? 'light' : 'dark';
            // Salva a preferência no localStorage
            localStorage.setItem('theme', newTheme);
            // Atualiza a aplicação do tema (embora o toggle já tenha feito visualmente)
            // applyTheme(newTheme); // Desnecessário se o toggle já atualiza visualmente
        });
    }


    // =============================================
    // --- Barra de Progresso de Scroll ---
    // =============================================
    function updateProgressBar() {
        if (!progressBar) return; // Sai se a barra não existir

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        // Evita divisão por zero e garante estado inicial 0% se não houver scroll
        if (scrollHeight <= 0) {
            progressBar.style.transform = 'scaleX(0)';
            return;
        }

        // Calcula a fração de progresso (0 a 1)
        const scrollProgress = scrollTop / scrollHeight;

        // Atualiza a escala horizontal da barra
        progressBar.style.transform = `scaleX(${scrollProgress})`;
    }


    // =============================================
    // --- Event Listener de Scroll Combinado ---
    // =============================================
    // Otimização: Executa todas as funções que dependem do evento de scroll
    // a partir de um único listener para melhorar a performance.
    function handleScroll() {
        handleScrollToTopButtonVisibility();
        updateProgressBar();
        // Descomente a linha abaixo se for usar o efeito na foto de perfil
        // handleProfilePicScrollEffect();
    }

    window.addEventListener('scroll', handleScroll);


    // =============================================
    // --- Chamadas Iniciais ---
    // =============================================
    // Executa funções que precisam definir um estado inicial correto no carregamento da página
    handleScrollToTopButtonVisibility(); // Define visibilidade inicial do botão
    updateProgressBar(); // Define estado inicial da barra de progresso (geralmente 0%)


    // =============================================
    // --- Log de Confirmação ---
    // =============================================
    console.log("Portfólio Interativo Carregado e Scripts Executados!");

}); // Fim do DOMContentLoaded

<!--Feito por Rafael Dias Garcia-->