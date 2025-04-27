document.addEventListener('DOMContentLoaded', function() {

    // --- Configurações ---
    const typingTextElement = document.getElementById('typing-effect');
    const textToType = "Estudante de Engenharia de Software | Backend Dev"; // Texto a ser digitado
    const typingSpeed = 70; // Velocidade de digitação (ms)
    const deletingSpeed = 40; // Velocidade de apagar (ms)
    const delayBeforeDelete = 1500; // Tempo antes de apagar
    const delayBeforeStart = 500; // Tempo antes de começar

    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const animatedSections = document.querySelectorAll('.animate-on-scroll');
    const currentYearElement = document.getElementById('currentYear');
    const profilePic = document.getElementById('profilePic'); // Elemento da foto de perfil

    // --- Efeito de Digitação ---
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = textToType;
        if (isDeleting) {
            // Apagando
            typingTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Digitanddo
            typingTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        // Verifica se terminou de digitar ou apagar
        if (!isDeleting && charIndex === currentText.length) {
            // Terminou de digitar, espera e começa a apagar
            setTimeout(() => isDeleting = true, delayBeforeDelete);
        } else if (isDeleting && charIndex === 0) {
            // Terminou de apagar, começa a digitar novamente
            isDeleting = false;
            // Poderia adicionar lógica para trocar o texto aqui se quisesse múltiplos textos
        }

        // Define a próxima chamada da função
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeEffect, speed);
    }
    // Inicia o efeito de digitação após um delay inicial
    if (typingTextElement) {
        setTimeout(typeEffect, delayBeforeStart);
    }


    // --- Botão Voltar ao Topo ---
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopBtn.style.display = "block";
            // Adiciona uma classe para animação de fade-in (opcional)
            setTimeout(() => scrollToTopBtn.style.opacity = "1", 10);
        } else {
            scrollToTopBtn.style.opacity = "0";
            // Esconde após a animação de fade-out
            setTimeout(() => {
                if (scrollToTopBtn.style.opacity === "0") { // Verifica se ainda está oculto
                    scrollToTopBtn.style.display = "none";
                }
            }, 300); // Deve corresponder à duração da transição CSS
        }
    }

    // Ação de clique para o botão Voltar ao Topo
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Rolagem Suave para Links Internos ---
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Previne o comportamento padrão do link
            const targetId = this.getAttribute('href'); // Pega o href (#projetos, #sobre, etc.)
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calcula a posição do elemento alvo e ajusta pela altura da navbar fixa
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 10; // -10 para um pequeno espaço extra

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Animação ao Rolar (Intersection Observer) ---
    const observerOptions = {
        root: null, // Observa em relação ao viewport
        rootMargin: '0px',
        threshold: 0.15 // Ativa quando 15% do elemento está visível
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Opcional: parar de observar após a animação
                // observer.unobserve(entry.target);
            } else {
                // Opcional: remover a classe se sair da tela (para reanimar)
                // entry.target.classList.remove('is-visible');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedSections.forEach(section => {
        observer.observe(section);
    });

    // --- Atualizar Ano no Rodapé ---
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // --- Efeito sutil na foto de perfil ao rolar (opcional) ---
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (profilePic) {
            if (st > lastScrollTop && st > 50) { // Rolando para baixo
                // profilePic.style.transform = 'scale(0.95)'; // Exemplo: diminuir um pouco
            } else { // Rolando para cima
                // profilePic.style.transform = 'scale(1)';
            }
        }
        lastScrollTop = st <= 0 ? 0 : st; // Para tratar o caso de rolagem para o topo
    }, false);


    console.log("Portfólio Interativo Carregado!");

});
// Fim do DOMContentLoaded