# Portfólio Pessoal - Rafael Dias Garcia

![Screenshot do Portfólio](src/assets/img/print-site.png) <!-- Opcional: Adicione um screenshot -->

Este repositório contém o código-fonte do meu portfólio pessoal, desenvolvido como uma vitrine para minhas habilidades, experiências e projetos como estudante de Engenharia de Software.

**🔗 Link:** **[Acesse o site aqui!](https://rafaeldiasgarcia.github.io/curriculo/)** <!-- Substitua pela URL real onde o site está hospedado -->

---

## ✨ Funcionalidades Principais

*   **Design Responsivo:** Layout adaptável para desktops, tablets e dispositivos móveis.
*   **Tema Dark/Light:** Botão para alternar entre modo escuro (padrão) e modo claro, com preferência salva no `localStorage`.
*   **Efeito de Digitação:** Animação no subtítulo da seção principal (Hero).
*   **Animações de Scroll:** Seções e elementos aparecem suavemente conforme o usuário rola a página (usando `IntersectionObserver`).
*   **Barra de Progresso de Scroll:** Indicador visual no topo da página que mostra o progresso da rolagem.
*   **Navegação:** Navbar fixa com links para seções e página de contato. Rolagem suave para links internos.
*   **Botões Flutuantes:** Botão "Voltar ao Topo" e botão para alternar o tema.
*   **Conteúdo Dinâmico (Parcial):** Ano no rodapé atualizado automaticamente.
*   **Seções Detalhadas:** Sobre Mim, Objetivos Profissionais, Experiência, Formação, Projetos (layout 2 colunas), Certificações (com links/downloads), Idiomas.
*   **Página de Contato:** Formulário funcional integrado com [Formspree](https://formspree.io/) para recebimento de mensagens por email.

---

## 🛠️ Tecnologias Utilizadas

*   **Frontend:**
    *   HTML5 (Estrutura semântica)
    *   CSS3 (Estilização com Variáveis CSS, Flexbox, Grid Layout, Animações, Responsividade)
    *   Vanilla JavaScript (Manipulação do DOM, Event Listeners, `localStorage`, `IntersectionObserver`, `Fetch API` - para o Formspree)
*   **Ícones:** Font Awesome (via CDN)
*   **Fontes:** Google Fonts (Poppins)
*   **Formulário Backend:** Formspree (Serviço externo)

---

## ⚙️ Como Executar Localmente

1.  Clone este repositório:
    ```bash
    git clone https://github.com/rafaeldiasgarcia/curriculo.git
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd curriculo
    ```
3.  Abra o arquivo `index.html` diretamente no seu navegador.

    *Observação:* Como é um site estático, a maioria das funcionalidades rodará diretamente do arquivo. Funcionalidades que dependem de protocolos específicos (raro neste caso) podem precisar de um servidor local simples (como a extensão "Live Server" do VS Code).

---

## 🔧 Configuração (Formulário de Contato)

Para que o formulário de contato funcione, você precisa:

1.  Criar uma conta no [Formspree](https://formspree.io/).
2.  Criar um novo formulário no painel do Formspree.
3.  Copiar o **Endpoint URL** fornecido pelo Formspree.
4.  Substituir `"https://formspree.io/f/SEU_CODIGO_UNICO"` no atributo `action` da tag `<form>` dentro do arquivo `contato.html` pela sua URL real.
5.  (Recomendado) Ativar o reCAPTCHA nas configurações do Formspree para evitar spam.

---

## 📝 Termos de Uso e Autoria

**Copyright (c) 2025 Rafael Dias Garcia**

Este projeto foi desenvolvido inteiramente por mim, **Rafael Dias Garcia**.

Você tem a permissão para:

*   Visualizar o código-fonte.
*   Copiar e modificar o código para **uso pessoal ou educacional**.
*   Distribuir cópias ou trabalhos derivados, **desde que seja de forma gratuita e sem fins lucrativos**.

**Restrições:**

*   **É estritamente proibido usar este projeto, ou qualquer parte dele, para fins comerciais ou em qualquer aplicação/serviço que gere lucro direto ou indireto.**
*   Ao utilizar ou distribuir, por favor, mantenha uma referência à autoria original (meu nome e, se possível, um link para o repositório).

Este projeto é fornecido "como está", sem garantias de qualquer tipo. O uso é por sua conta e risco.

---

## 📫 Contato

*   **Rafael Dias Garcia**
*   **Portfólio:** https://rafaeldiasgarcia.github.io/curriculo/
*   **LinkedIn:** www.linkedin.com/in/rafaeldiasgarcia
*   **Email:** rafdgar@gmail.com

---

*Feito com ❤️ e </> por Rafael Dias Garcia*