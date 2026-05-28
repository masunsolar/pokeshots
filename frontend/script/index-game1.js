// ============================================================
//  PokéShots — index-game1.js (VERSÃO CORRIGIDA)
// ============================================================

// 🔧 CONFIGURAÇÃO
const API_BASE = "http://localhost:8080";

const IMAGE_BASE = "images/pkm/";

function resolveImage(imageFile) {
  if (!imageFile) return "";
  if (imageFile.startsWith("http")) return imageFile;
  if (imageFile.startsWith("images/")) return imageFile;
  return IMAGE_BASE + imageFile;
}

// Estado global do jogo
const state = {
  validSelection: false,
  dailyId: null,
  dailyImage: null,
  gameOver: false,
  attempts: [],
  maxAttempts: 200,
};

// ============================================================
//  INICIALIZAÇÃO
// ============================================================
document.addEventListener("DOMContentLoaded", async () => {
  setupPokeballAnimation();
  setupInput();
  await loadDailyPokemon();
});

// ============================================================
//  BUSCA O POKÉMON DO DIA
// ============================================================
async function loadDailyPokemon() {
  try {
    const res = await fetch(`${API_BASE}/pokemons/daily`);

    if (!res.ok) {
      throw new Error("Erro ao buscar Pokémon do dia");
    }

    const data = await res.json();

    if (!data || !data.id) {
      throw new Error("Resposta inválida da API");
    }

    state.dailyId = data.id;
    state.dailyImage = data.imagem || data.image || data.IMAGEM;
    renderPokemonScreen(state.dailyImage, true);

  } catch (err) {
    console.error(err);
    showError("Erro ao conectar com a API.");
  }
}

// ============================================================
//  TELA DO POKÉMON
// ============================================================
function renderPokemonScreen(imageFile, hidden) {
  const pokemon = document.querySelector(".pokemon");
  const pokeic = document.querySelector(".pokeic");
  if (!pokemon) return;

  if (hidden) {
    pokemon.style.transition = "none";
    pokemon.style.opacity = "0";
    pokemon.style.filter = "brightness(0)";
    pokemon.style.backgroundImage = `url("${imageFile}")`;
    pokemon.style.backgroundSize = "contain";
    pokemon.style.backgroundRepeat = "no-repeat";
    pokemon.style.backgroundPosition = "center";
    if (pokeic) pokeic.style.opacity = "0.2";
  } else {
    pokemon.style.transition = "none";
    pokemon.style.opacity = "0";
    pokemon.style.filter = "brightness(0)";
    pokemon.style.backgroundImage = `url("${imageFile}")`;
    pokemon.style.backgroundSize = "contain";
    pokemon.style.backgroundRepeat = "no-repeat";
    pokemon.style.backgroundPosition = "center";
    if (pokeic) pokeic.style.opacity = "0";

    setTimeout(() => {
      pokemon.style.transition = "opacity 0.6s ease, filter 0.6s ease";
      pokemon.style.opacity = "1";
      pokemon.style.filter = "none";
    }, 50);
  }
}

async function mostrarPokemonErrado(nome) {
  try {
    const res = await fetch(`${API_BASE}/pokemons/name/${nome}`);
    if (!res.ok) return;

    const pk = await res.json();
    const img = pk.imagem || pk.image || pk.IMAGEM;
    if (!img) return;

    const pokemon = document.querySelector(".pokemon");
    if (!pokemon) return;

    pokemon.style.backgroundImage = `url('${resolveImage(img)}')`;
    pokemon.style.backgroundSize = "contain";
    pokemon.style.backgroundRepeat = "no-repeat";
    pokemon.style.backgroundPosition = "center";

    // mantém escondido (efeito do jogo)
    pokemon.style.filter = "brightness(0)";
    pokemon.style.opacity = "1";

  } catch (err) {
    console.error(err);
  }
}

function revealPokemon() {
  const pokemon = document.querySelector(".pokemon");
  if (!pokemon) return;

  pokemon.style.transition = "opacity 0.4s ease, filter 0.4s ease";
  pokemon.style.opacity = "1";
  pokemon.style.filter = "none";
}

// ============================================================
//  ANIMAÇÃO DA POKÉBOLA
// ============================================================
function setupPokeballAnimation() {
  const poke = document.querySelector(".poke");
  if (!poke) return;

  poke.addEventListener("click", () => {
    if (state.gameOver) return;
    animatePokeball();
  });
}

function animatePokeball() {
  const poke = document.querySelector(".poke");
  const telapkm = document.querySelector(".telapkm");
  if (!poke || !telapkm) return;

  poke.style.transition = "none";
  poke.style.transform = "translate(0, 0)";

  poke.offsetHeight;

  const pr = poke.getBoundingClientRect();
  const tr = telapkm.getBoundingClientRect();
  const dx = (tr.left + tr.width / 2) - (pr.left + pr.width / 2);
  const dy = (tr.top + tr.height / 2) - (pr.top + pr.height / 2);

  poke.style.transition = "transform 0.5s ease-out";
  poke.style.transform = `translate(${dx}px, ${dy}px) rotate(360deg)`;

  setTimeout(() => {
    poke.style.transform = "translate(0, 0)";
  }, 900);
}

function shakePokeball() {
  const poke = document.querySelector(".poke");
  if (!poke) return;

  poke.classList.remove("shake");
  void poke.offsetWidth;
  poke.classList.add("shake");
}

// ============================================================
//  INPUT + AUTOCOMPLETE
// ============================================================
function setupInput() {
  const entradadado = document.querySelector(".entradadado");
  if (!entradadado) return;

  const input = document.createElement("input");
  input.type = "text";
  input.id = "pokemon-input";
  input.placeholder = "Digite o nome do Pokémon...";
  input.autocomplete = "off";

  const dropdown = document.createElement("div");
  dropdown.id = "autocomplete-dropdown";

  entradadado.insertBefore(input, entradadado.firstChild);
  entradadado.appendChild(dropdown);

  const envia = document.querySelector(".envia");

  input.addEventListener("input", async () => {
    state.validSelection = false;

    const q = input.value.trim();
    dropdown.innerHTML = "";
    if (q.length < 2) { dropdown.style.display = "none"; return; }

    try {
      const res = await fetch(`${API_BASE}/pokemons/autocomplete?q=${encodeURIComponent(q)}`);
      const names = await res.json();

      if (!names.length) { dropdown.style.display = "none"; return; }

      names.slice(0, 8).forEach(name => {
        const item = document.createElement("div");
        item.className = "autocomplete-item";
        item.textContent = name;
        item.addEventListener("mousedown", (e) => {
          e.preventDefault();
          input.value = name;
          dropdown.style.display = "none";
        });
        dropdown.appendChild(item);
      });

      dropdown.style.display = "block";

    } catch {
      dropdown.style.display = "none";
    }
  });

  document.addEventListener("click", (e) => {
    if (!entradadado.contains(e.target)) dropdown.style.display = "none";
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      dropdown.style.display = "none";
      const val = input.value.trim();
      animatePokeball();
      input.value = "";
      submitGuess(val);
    }
  });

  if (envia) {
    envia.addEventListener("click", () => {
      const val = input?.value?.trim();
      animatePokeball();
      if (val) {
        submitGuess(val);
      }
    });
  }
}

const SHARD_COLORS = ['#e42839','#cc0000','#ff4444','#ff8800','#ffcc00','#ffffff','#ff6600'];

function criarShards() {
  const container = document.getElementById('explosion-container');
  container.innerHTML = '';
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  for (let i = 0; i < 28; i++) {
    const s = document.createElement('div');
    s.className = 'shard';
    const size = 8 + Math.random() * 22;
    const angle = (Math.PI * 2 * i) / 28 + Math.random() * 0.4;
    const dist = 100 + Math.random() * 250;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    const rot = Math.random() * 720 - 360;
    s.style.cssText = `
      width:${size}px; height:${size * (0.4 + Math.random() * 0.8)}px;
      left:${cx - size/2}px; top:${cy - size/2}px;
      background:${SHARD_COLORS[Math.floor(Math.random() * SHARD_COLORS.length)]};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      opacity:0;
    `;
    s.dataset.tx = tx;
    s.dataset.ty = ty;
    s.dataset.rot = rot;
    container.appendChild(s);
  }
}

async function animacaoCaptura(imgSrc, nomePokemon) {
  const flash = document.getElementById('flash-capture');
  const container = document.getElementById('explosion-container');
  const overlay = document.getElementById('capture-overlay');
  const reveal = document.getElementById('pokemon-reveal');
  const img = document.getElementById('pk-reveal-img');
  const msg = document.getElementById('capture-msg');
  const shock = document.getElementById('shockwave');

  img.src = imgSrc;
  msg.textContent = `${nomePokemon} foi capturado com sucesso!`;

  criarShards();
  overlay.style.opacity = '1';

  // Flash
  flash.animate([
    {opacity:0},{opacity:1},{opacity:1},{opacity:0}
  ], {duration:300, fill:'forwards'});

  await new Promise(r => setTimeout(r, 80));

  // Shards explodindo
  container.querySelectorAll('.shard').forEach((s, i) => {
    const tx = parseFloat(s.dataset.tx);
    const ty = parseFloat(s.dataset.ty);
    const rot = parseFloat(s.dataset.rot);
    s.animate([
      {opacity:1, transform:'translate(0,0) rotate(0deg)'},
      {opacity:1, transform:`translate(${tx*0.3}px,${ty*0.3}px) rotate(${rot*0.3}deg)`},
      {opacity:0, transform:`translate(${tx}px,${ty}px) rotate(${rot}deg)`}
    ], {duration:700, easing:'cubic-bezier(0.25,0.46,0.45,0.94)', fill:'forwards', delay: i * 8});
  });

  // Shockwave
  shock.style.cssText += 'left:50%; top:50%; margin-left:-10px; margin-top:-10px;';
  shock.animate([
    {opacity:0.8, transform:'scale(1)', borderWidth:'3px'},
    {opacity:0, transform:'scale(15)', borderWidth:'1px'}
  ], {duration:600, easing:'ease-out', fill:'forwards', delay:100});

  await new Promise(r => setTimeout(r, 200));

  // Pokémon aparece
 reveal.animate([
  {opacity:0, transform:'translate(-50%, -50%) scale(0.1)'},
  {opacity:1, transform:'translate(-50%, -50%) scale(1.15)'},
  {opacity:1, transform:'translate(-50%, -50%) scale(1)'}
  ], {
  duration:500,
  easing:'cubic-bezier(0.34,1.56,0.64,1)',
  fill:'forwards'
  });

  await new Promise(r => setTimeout(r, 400));

  // Mensagem aparece
  msg.animate([
    {opacity:0, transform:'translateX(-50%) translateY(10px)'},
    {opacity:1, transform:'translateX(-50%) translateY(0)'}
  ], {duration:300, easing:'ease-out', fill:'forwards'});

  // Aguarda 2.5 segundos e some
  await new Promise(r => setTimeout(r, 2500));

  overlay.animate([{opacity:1},{opacity:0}], {duration:400, fill:'forwards'});
  await new Promise(r => setTimeout(r, 400));

  overlay.style.opacity = '0';
  container.innerHTML = '';
}

// ============================================================
//  ENVIO DO PALPITE
// ============================================================
async function submitGuess(name) {
  const input = document.getElementById("pokemon-input");
  const dropdown = document.getElementById("autocomplete-dropdown");

  if (input) input.value = "";

  state.validSelection = false;

  if (state.attempts.some(a => a.guessedName.toLowerCase() === name.toLowerCase())) {
    showMessage("Você já tentou esse Pokémon!", "error");
    setTimeout(() => resetInitialMessage(), 1500);
    return;
  }

  if (!name || state.gameOver) return;
  if (!state.dailyId) return showError("O pokémon fugiu!");
  if (state.attempts.length >= state.maxAttempts) return;

  try {
    const res = await fetch(`${API_BASE}/pokemons/guess/${state.dailyId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const text = await res.text();

    if (!res.ok) {
      throw new Error(text || "Erro na API");
    }

    const guess = JSON.parse(text);

    state.attempts.push(guess);
    renderAttempts();

    if (input) input.value = "";
    if (dropdown) dropdown.style.display = "none";

    // =========================
    // ✔️ ACERTOU
    // =========================
 if (guess.won) {
  state.gameOver = true;

  const pkRes = await fetch(`${API_BASE}/pokemons/${state.dailyId}`);
  const pk = await pkRes.json();
  const img = pk.imagem || pk.image || pk.IMAGEM;

  await animacaoCaptura(resolveImage(img), guess.guessedName);

  input.disabled = true;
  return;

   } else {
  // =========================
  // ❌ PERDEU (esgotou tentativas)
  // =========================
  if (state.attempts.length >= state.maxAttempts) {
    state.gameOver = true;

    const pkRes = await fetch(`${API_BASE}/pokemons/${state.dailyId}`);
    const pk = await pkRes.json();
    const img = pk.imagem || pk.image || pk.IMAGEM;

    renderPokemonScreen(resolveImage(img), false);
    showMessage(`😔 Era ${pk.name}. Tente novamente em 30 minutos!`, "error");
    input.disabled = true;

    setTimeout(() => {
      renderPokemonScreen(resolveImage(img), true);
      resetInitialMessage();
    }, 4000);

    return;
  }

  // =========================
  // ❌ ERROU — ainda tem tentativas
  // =========================

  await mostrarPokemonErrado(name); // 🔥 AQUI

  setTimeout(() => {
    shakePokeball();
  }, 750);

  showMessage("Não foi dessa vez. O Pokémon fugiu!", "error");

  setTimeout(() => {
    resetInitialMessage();
  }, 2000);
  }

    } catch (err) {
    console.error(err);
    showMessage("Erro na API ou Pokémon não encontrado.", "error");
    }
}

function resetInitialMessage() {
  const container = document.querySelector(".mensagem");
  if (!container) return;

  const span = container.querySelector("span");
  if (!span) return;

  span.textContent = "Um pokémon selvagem apareceu...";
  container.className = "mensagem";
}

// ============================================================
//  RENDERIZA TENTATIVAS
// ============================================================
function renderAttempts() {
  const tentativas = document.querySelector(".tentativas");
  if (!tentativas) return;

  tentativas.innerHTML = "";

  state.attempts.forEach((guess) => {
    const tbox = document.createElement("div");
    tbox.className = "tbox";

    const cols = [
      { result: guess.nameResult,    value: guess.guessedName,        hint: null },
      { result: guess.type1Result,   value: guess.guessedType1,       hint: null },
      { result: guess.type2Result,   value: guess.guessedType2 || "—", hint: null },
      { result: guess.habitatResult, value: guess.guessedHabitat,     hint: null },
      { result: guess.colorResult,   value: guess.guessedColor,       hint: null },
      { result: guess.heightHint,    value: guess.guessedHeight,      hint: guess.heightHint },
      { result: guess.phaseResult,   value: guess.guessedPhase,       hint: null },
    ];

    cols.forEach(({ result, value, hint }) => {
      const titem = document.createElement("div");
      titem.className = "titem";
      titem.style.background = colorForResult(result);

      if (hint === "higher") {
        titem.innerHTML += "▲ ";
      } else if (hint === "lower") {
        titem.innerHTML += "▼ ";
      }

      const span = document.createElement("span");
      span.textContent = value || "—";
      span.style.color = "white";

      titem.appendChild(span);
      tbox.appendChild(titem);
    });

    tentativas.appendChild(tbox);
  });

  setTimeout(() => {
    tentativas.scrollTop = tentativas.scrollHeight;
    const estatistica = document.querySelector(".estatistica");
    if (estatistica) estatistica.scrollTop = estatistica.scrollHeight;
  }, 50);
}

// ============================================================
//  HELPERS
// ============================================================
function colorForResult(result) {
  switch (result) {
    case "correct":  return "#02ae36";
    case "partial":  return "#fdc13f";
    case "higher":
    case "lower":    return "#fdc13f";
    default:         return "#e42839";
  }
}

function showMessage(text, type) {
  const container = document.querySelector(".mensagem");
  if (!container) return;

  const span = container.querySelector("span");
  if (!span) return;

  span.textContent = text;
  container.className = `mensagem mensagem--${type}`;
}

function showError(text) {
  showMessage(text, "error");
}