<style>
    @import url('https://fonts.cdnfonts.com/css/pokemon-solid');

    body {
        background: #29acfb;
        margin: -15px;
        padding: 2;
        overflow-x: hidden;
    }

    .pokemon-font {
        font-family: 'Pokemon Solid', sans-serif;
        font-weight: normal;
    }

    .text-box {
        background-color: #2e2e2e; 
        color: #a3a3a3;
        padding: 40px;
        margin: 0 50px ;
        font-size: 16px;
        line-height: 1.6;
    }

    .head {
        position: relative;
        width: 100vw;
        margin-left: calc(-50vw + 50%);
        padding-top: 20px;
        padding-bottom: 50px;
        z-index: 10; 
    }

    .head::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1; 
        background-image: url('./sprites/sky.webp');
        background-repeat: repeat-x;
        background-size: cover;
        background-position: top;
 
        -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
        mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
    }

    .main {
        position: relative; 
        width: 100vw;
        margin-left: calc(-50vw + 50%);
        padding-bottom: 110px;
        z-index: 1;
    }

    .main::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1; 
        background-image: url('./sprites/cenario.webp');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: bottom;

        -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 40%);
        mask-image: linear-gradient(to bottom, transparent 0%, black 40%);
    }


    .about{
        background-image: url('./sprites/cave.png');
        background-repeat: repeat-x;
        background-size: cover;
        background-position: bottom;
        width: 100vw;
        margin-left: calc(-50vw + 50%);
        padding-top: 50px;
        padding-bottom: 110px;
    }

    .footer{
        color: #000;
        background-image: url('./sprites/town.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom;
        width: 100vw;
        margin-left: calc(-50vw + 50%);
        padding-top: 50px;
        padding-bottom: 110px;
    }

    .pokeball-banner {
        height: 100px;
        width: 100%;
        border: 2px solid #222222;
        background: radial-gradient(circle at center,
                #ffffff 0px, #ffffff 6px,
                #222222 7px, #222222 8px,
                #ffffff 9px, #ffffff 18px,
                #222222 19px, #222222 21px,
                transparent 22px),
            linear-gradient(to bottom,
                #E3350D 0%, #E3350D calc(50% - 2px),
                #222222 calc(50% - 2px), #222222 calc(50% + 2px),
                #ffffff calc(50% + 2px), #ffffff 100%);
        color: #000;
        font-size: 60px;
    }

    .pokeball-text-bg {
        margin-top: -17px;
        padding: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-shadow: 2px 2px 0px #FFF, -2px -2px 0px #FFF, 2px -2px 0px #FFF, -2px 2px 0px #FFF;
    }


    hr {
        border: 0;
        border-top: 2px solid #ccc;
        margin: 30px 0;
    }

    .subtitle {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 24px;
        text-align: center;
    }

    .section-title {
        font-size: 30px;
        text-align: center;
        margin-top: 30px;
    }

    .animation-track {
        position: relative;
        width: 100%;
        height: 100px;
    }

    .char-sprite {
        position: absolute;
        top: 50%;
        animation-name: moverVirar;
        animation-duration: 10s;
        animation-iteration-count: infinite;
        animation-direction: normal;
    }

    .info-grid {
        display: grid;
        grid-template-columns: 180px 1fr; 
        gap: 12px 20px; 
        font-family: sans-serif;
        font-size: 15px;
        line-height: 1.4;
    }

    .info-label {
        text-align: right; 
        color: #888888;    
    }

    .info-value {
        text-align: left;
        color: #d1d1d1;    
    }

    .itch-link {
        color: #29acfb; 
        text-decoration: none;
    }
    
    .itch-link:hover {
        text-decoration: underline;
    }

    @keyframes moverVirar {
        0% {
            left: 0%;
            transform: translateY(-50%) scaleX(-1);
        }

        45% {
            left: calc(100% - 80px);
            transform: translateY(-50%) scaleX(-1);
        }

        50% {
            left: calc(100% - 80px);
            transform: translateY(-50%) scaleX(1);
        }

        95% {
            left: 0%;
            transform: translateY(-50%) scaleX(1);
        }

        100% {
            left: 0%;
            transform: translateY(-50%) scaleX(1);
        }
    }
</style>

<section class="head">
<div style="color: #000">

<div class="pokeball-banner pokemon-font">
    <div class="pokeball-text-bg">
        <div style="width: 100%; text-align: center;">
            Pokeshots
        </div>
    </div>
</div>

<hr>

<div class="subtitle pokemon-font">
    Um jogo de adivinhação no universo Pokémon!
</div>

<hr>

<div class="animation-track">
    <img src="./sprites/char2.gif" alt="charmander" class="char-sprite" />
</div>
</section>

<section class="main" style="color: #2b2b2b;">
    <div class="section-title pokemon-font">
        O Desafio!
    </div>
    <br>
<div class="text-box">
    Imagina um mundo onde os desafios não são apenas batalhas de ginásio, mas também de advinhação! Em PokéShots, o objetivo é simples: acertar o Pokémon secreto em poucas tentativas, testando sua memória, estratégia e paixão pelo universo Pokémon.
</div>

<div class="section-title pokemon-font">
    Estratégia e Evolução!
</div>
<br>

<div class="text-box">
    Gostamos de Pokémon e achamos que seria divertido criar um jogo onde a gente descobre qual é o Pokémon, baseando-se nas características dele. Além disso, o jogo também ajuda aos fãs a conhecerem um pouco mais sobre esses tão amados monstrinhos de bolso.
</div>

<div class="section-title pokemon-font">
    Mais que um jogo!
</div>
<br>
<div class="text-box">
    PokéShots não é só diversão, ele também nasceu de uma ideia acadêmica, colocando em prática o que aprendemos nas "quests" da sala de aula. Cada partida é como um treino, a gente evolui, aplica conhecimento e cria algo que gera impacto positivo na comunidade. Esperamos que PokéShots traga diversão e conhecimento para você e agradecemos seu acesso. Bom jogo!
</div>

</section>

<section class="about" style="color: #fff;">

---

<div class="section-title pokemon-font">
    Sobre o Jogo
</div>

<div style="text-align: center; margin-top: 40px; margin-bottom: 20px; font-size: 20px; font-family: 'Pokemon Solid', sans-serif;">
O jogo foi desenvolvido em HTML, CSS, JS e Java com Spring Boot. 
</div>

<br>
<div class="text-box">
    Se trata de um jogo de adivinhar qual o Pokémon do dia. Você digita o Pokémon e ele vai te retornar se está certo ou errado, passando quais parâmetros estão certos e quais estão errados. Baseado nisso, conforme você vai juntando as características dos Pokémon que errou, fica mais fácil adivinhar qual seria o do dia.
</div>

<div style="text-align: center; margin-top: 40px; margin-bottom: 20px; font-size: 20px; font-family: 'Pokemon Solid', sans-serif;">

O que vem por aí:
</div>

<div class="text-box">
    - 🌑 **Modo Sombra:** Tente acertar o Pokémon apenas pela sua silhueta!
    - 🃏 **Modo Carta:** Adivinhe baseado na carta oficial do Pokémon.
    - 📖 **Pokédex Pessoal:** Um local no jogo que servirá como uma Pokédex, mostrando todos os Pokémon que você já acertou.
</div>

---

<div class="section-title pokemon-font">
    CONTROLES:
</div>
<br>
<div class="text-box">
    <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
            <tr>
                <th style="border-bottom: 2px solid #a3a3a3; padding: 10px;">Tecla / Ação</th>
                <th style="border-bottom: 2px solid #a3a3a3; padding: 10px;">Função</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border-bottom: 1px solid #555555; padding: 10px;"><strong>Teclado</strong></td>
                <td style="border-bottom: 1px solid #555555; padding: 10px;">Digitar o nome do Pokémon para o palpite.</td>
            </tr>
            <tr>
                <td style="border-bottom: 1px solid #555555; padding: 10px;"><strong>Mouse / Enter</strong></td>
                <td style="border-bottom: 1px solid #555555; padding: 10px;">Confirmar o palpite e visualizar as dicas na tela.</td>
            </tr>
        </tbody>
    </table>
</div>

</section>
<section class="footer">

---

<div class="section-title pokemon-font" style="color: #ff0000; text-shadow: 2px 2px 0px #FFF, -2px -2px 0px #FFF, 2px -2px 0px #FFF, -2px 2px 0px #FFF;">
    Mais Informações
</div>
<br>

<div class="text-box">
    <div class="info-grid">
        <div class="info-label">Atualizado</div>
        <div class="info-value">⏱️ Em desenvolvimento</div>
        <div class="info-label">Plataformas</div>
        <div class="info-value"><span class="itch-link">Web (Navegador)</span></div>
        <div class="info-label">Integrantes</div>
        <div class="info-value">Igor Hernandes, Matheus L Ferreira, Daniel Nunes Becaria</div>
        <div class="info-label">Gênero</div>
        <div class="info-value">
            <span class="itch-link">Puzzle</span>, 
            <span class="itch-link">Trivia</span>, 
            <span class="itch-link">Adivinhação</span>
        </div>
        <div class="info-label">Feito com</div>
        <div class="info-value">
            <span class="itch-link">HTML</span>, 
            <span class="itch-link">CSS</span>, 
            <span class="itch-link">JavaScript</span>, 
            <span class="itch-link">Java (Spring Boot)</span>
        </div>
        <div class="info-label">Motivo</div>
        <div class="info-value">Projeto de extensão curricular desenvolvido com a professora Tania.</div>
        <div class="info-label">Tags</div>
        <div class="info-value">
            <span class="itch-link">pokemon</span>, 
            <span class="itch-link">guess</span>, 
            <span class="itch-link">wordle-like</span>, 
            <span class="itch-link">web-game</span>, 
            <span class="itch-link">fangame</span>, 
            <span class="itch-link">spring-boot</span>
        </div>
    </div>
</div>

</section>