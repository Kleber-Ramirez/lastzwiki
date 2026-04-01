// ===========================
// CARRUSEL PRINCIPAL
// ===========================

const carrusel      = document.querySelector('.carrusel-container');
const btnPrev       = document.querySelector('.carrusel-prev');
const btnNext       = document.querySelector('.carrusel-next');
const dotsContainer = document.getElementById('carruselDots');

let items         = document.querySelectorAll('.carrusel-item');
let index         = 0;
let originalCount = 0;
let autoPlay;
let userPaused    = false;
let resumeTimer;

// Touch tracking
let touchStartX   = 0;
const SWIPE_THRESHOLD = 50;

function getVisibleItems() {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 2;
  return 3;
}

// ── Setup ────────────────────────────────────────────
function setupCarrusel() {
  document.querySelectorAll('.carrusel-item.clone').forEach(c => c.remove());

  items         = document.querySelectorAll('.carrusel-item');
  originalCount = items.length;
  const vis     = getVisibleItems();

  for (let i = 0; i < vis; i++) {
    const clone = items[i].cloneNode(true);
    clone.classList.add('clone');
    carrusel.appendChild(clone);
  }

  index = 0;
  carrusel.style.transition = 'none';
  carrusel.style.transform  = 'translateX(0)';

  document.querySelectorAll('.carrusel-item').forEach(item => {
    item.style.flex = `0 0 ${100 / vis}%`;
  });

  buildDots();
  updateDots();
}

// ── Dots ─────────────────────────────────────────────
function buildDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  for (let i = 0; i < originalCount; i++) {
    const dot = document.createElement('button');
    dot.className = 'carrusel-dot';
    dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
    dot.addEventListener('click', () => { goToSlide(i); onUserInteraction(); });
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  document.querySelectorAll('.carrusel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === (index % originalCount));
  });
}

// ── Ir a slide específico ────────────────────────────
function goToSlide(i) {
  const vis = getVisibleItems();
  index = Math.max(0, Math.min(i, originalCount - 1));
  carrusel.style.transition = 'transform 0.5s ease';
  carrusel.style.transform  = `translateX(-${index * (100 / vis)}%)`;
  updateDots();
}

// ── Mover adelante / atrás ───────────────────────────
function moveCarrusel(direction) {
  const vis   = getVisibleItems();
  const total = document.querySelectorAll('.carrusel-item').length;

  if (direction === -1) {
    if (index > 0) {
      index--;
    } else {
      index = originalCount - 1;
    }
    carrusel.style.transition = 'transform 0.5s ease';
    carrusel.style.transform  = `translateX(-${index * (100 / vis)}%)`;
    updateDots();
    return;
  }

  index++;
  carrusel.style.transition = 'transform 0.5s ease';
  carrusel.style.transform  = `translateX(-${index * (100 / vis)}%)`;
  updateDots();

  if (index >= total - vis) {
    setTimeout(() => {
      carrusel.style.transition = 'none';
      index = 0;
      carrusel.style.transform  = 'translateX(0)';
      updateDots();
    }, 500);
  }
}

// ── Autoplay ─────────────────────────────────────────
function startAutoPlay() {
  clearInterval(autoPlay);
  if (!userPaused) {
    autoPlay = setInterval(() => moveCarrusel(1), 3000);
  }
}

// Pausa 5s al interactuar manualmente, luego reanuda
function onUserInteraction() {
  userPaused = true;
  clearInterval(autoPlay);
  clearTimeout(resumeTimer);
  resumeTimer = setTimeout(() => {
    userPaused = false;
    startAutoPlay();
  }, 5000);
}

// ── Botones ← → ──────────────────────────────────────
btnPrev?.addEventListener('click', () => { moveCarrusel(-1); onUserInteraction(); });
btnNext?.addEventListener('click', () => { moveCarrusel(1);  onUserInteraction(); });

// ── Swipe táctil ─────────────────────────────────────
carrusel.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

carrusel.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > SWIPE_THRESHOLD) {
    moveCarrusel(diff > 0 ? 1 : -1);
    onUserInteraction();
  }
}, { passive: true });

// ── Resize ───────────────────────────────────────────
window.addEventListener('resize', () => {
  setupCarrusel();
  userPaused = false;
  startAutoPlay();
});

// ── Arrancar ─────────────────────────────────────────
setupCarrusel();
startAutoPlay();


// ===========================
// CARRUSELES INTERNOS DE TIPS
// ===========================

document.querySelectorAll('.tip-carousel').forEach(carousel => {
  const imgs = carousel.querySelectorAll('img');
  let idx = 0;
  setInterval(() => {
    imgs[idx].classList.remove('active');
    idx = (idx + 1) % imgs.length;
    imgs[idx].classList.add('active');
  }, 3000);
});
// ===========================
// MODAL DE TIPS
// ===========================

const tipContent = {

tip1: `
  <h2>🏕️ Melhores Refugiados para Recrutar</h2>
  <img src="../img-tip-refugiados-1.jpg" alt="Refugiados">
  
  <h3>🎯 Os 2 Refugiados Mais Importantes</h3>
  <p>No Last Z, os refugiados concedem <b>habilidades passivas permanentes</b> que melhoram seu progresso. Porém, <b>NEM TODOS os refugiados são igualmente úteis</b>.</p>
  
  <p>Estes são os <b>2 refugiados que você DEVE priorizar</b> conseguir:</p>

  <h3>🏗️ #1 - Mordomo</h3>
  
  <div class="refugiado-box" style="background: rgba(196, 30, 58, 0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
    <p><b>Habilidade Principal:</b> Velocidade de Construção</p>
    <p><b>Bônus Extra:</b> Tempo de aceleração gratuito</p>
  </div>
  
  <p><b>Por que é o melhor?</b></p>
  <ul>
    <li><b>Reduz drasticamente</b> o tempo de construção de edifícios</li>
    <li>A construção é o <b>maior gargalo</b> do jogo</li>
    <li>Fornece tempo de <b>aceleração gratuita</b> adicional ao construir</li>
    <li>Útil durante <b>toda a sua progressão</b>, do nível 1 até o endgame</li>
    <li>Economiza <b>dias ou semanas</b> de espera acumulada</li>
  </ul>

  <img src="../img-tip-refugiados-2.jpg" alt="Mordomo">

  <h3>🤝 #2 - Diplomata</h3>
  
  <div class="refugiado-box" style="background: rgba(88, 137, 232, 0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
    <p><b>Habilidade Principal:</b> Limite de Ajuda de Aliança</p>
    <p><b>Bônus Extra:</b> Tempo reduzido por cada ajuda</p>
  </div>
  
  <p><b>Por que é o melhor?</b></p>
  <ul>
    <li>Aumenta <b>quantas ajudas você pode receber</b> da aliança</li>
    <li>Cada ajuda <b>reduz mais tempo</b> em construções/pesquisas</li>
    <li>Combina perfeitamente com o <b>Mordomo</b></li>
    <li>Em alianças ativas, você pode <b>completar construções quase instantaneamente</b></li>
    <li>Funciona para <b>edifícios, pesquisas e curas</b></li>
  </ul>

  <h3>💡 Por que esses 2 são os melhores?</h3>
  
  <p>A combinação de <b>Mordomo + Diplomata</b> cria uma sinergia poderosa:</p>
  
  <ol>
    <li><b>Mordomo</b> reduz o tempo base de construção</li>
    <li><b>Diplomata</b> permite receber mais ajudas</li>
    <li>Cada ajuda reduz <b>ainda mais tempo</b> graças ao Diplomata</li>
    <li>Resultado: Construções que levariam dias são concluídas em <b>horas ou minutos</b></li>
  </ol>

  <h3>🌟 Sobre as Raridades</h3>
  
  <p>Tanto o Mordomo quanto o Diplomata vêm em <b>diferentes raridades</b>:</p>
  
  <ul>
    <li>🟢 <b>Verde</b> (Comum) - Bônus básicos</li>
    <li>🔵 <b>Azul</b> (Raro) - Bônus melhorados</li>
    <li>🟣 <b>Roxo</b> (Épico) - Bônus altos</li>
    <li>🟠 <b>Laranja</b> (Lendário) - Bônus máximos</li>
  </ul>
  
  <p><b>Importante:</b> Mesmo um Mordomo ou Diplomata <b>verde</b> é melhor que outros refugiados de raridade superior. Priorize <b>o tipo de refugiado</b> acima da raridade.</p>

  <h3>⚠️ Outros Refugiados</h3>
  
  <p>Existem muitos outros refugiados no jogo, mas a maioria tem habilidades <b>muito menos impactantes</b>:</p>
  
  <ul>
    <li>Bônus de produção de recursos (você obtém recursos facilmente de outras formas)</li>
    <li>Bônus de treinamento de tropas (útil mas não crítico)</li>
    <li>Bônus de ataque/defesa (marginais comparado com heróis e equipamentos)</li>
  </ul>
  
  <p>Nenhum deles se compara ao <b>impacto massivo</b> que o Mordomo e o Diplomata têm na sua velocidade de progressão.</p>

  <h3>🎯 Estratégia de Recrutamento</h3>
  
  <p><b>Prioridade 1:</b> Consiga um <b>Mordomo</b> o mais rápido possível.</p>
  <p><b>Prioridade 2:</b> Consiga um <b>Diplomata</b> em seguida.</p>
  <p><b>Prioridade 3:</b> Melhore a raridade de ambos quando puder.</p>
  
  <div class="club-tip destacado" style="background: rgba(196, 30, 58, 0.15); padding: 1rem; border-left: 4px solid var(--acento); margin: 1.5rem 0; border-radius: 4px;">
    <p>💎 <strong>Dica F2P:</strong> Vale a pena gastar diamantes ou cupons para conseguir esses 2 refugiados. São um dos <b>melhores investimentos</b> que você pode fazer no jogo, superando inclusive muitos heróis.</p>
  </div>

  <h3>🏢 Como Conseguir Refugiados?</h3>
  
  <p>Os refugiados são recrutados no <a href="edificios.html#club-refugiados" class="edificio-link" style="color: var(--acento); background: rgba(196, 30, 58, 0.1); padding: 0.3rem 0.8rem; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">🏢 Club</a> usando <b>Cupons de Refugiado</b> ou <b>Diamantes</b>.</p>
  
  <p><b>Custos de recrutamento:</b></p>
  <ul>
    <li>1º Refugiado: 500 cupons/diamantes</li>
    <li>2º Refugiado: 2.000 cupons/diamantes</li>
    <li>3º Refugiado: 5.000 cupons/diamantes</li>
  </ul>
  
  <p>Os refugiados disponíveis <b>mudam a cada 12 horas</b>, e você pode usar uma <b>atualização gratuita</b> após cada recrutamento para mudar as opções disponíveis.</p>
  
  <p>📖 <b>Para más detalles sobre el sistema de reclutamiento, costos y estrategias óptimas, visita la sección de</b> <a href="edificios.html#club-refugiados" class="edificio-link" style="color: var(--acento); background: rgba(196, 30, 58, 0.1); padding: 0.3rem 0.8rem; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">🏢 Club - Refugiados</a>.</p>

  <h3>🔥 Conclusão</h3>
  
  <p><b>Mordomo e Diplomata</b> são os refugiados mais importantes do jogo. Seu impacto na velocidade de progressão é <b>insuperável</b>. Consiga-os o mais rápido possível e você notará uma diferença enorme no ritmo de avanço. 🚀</p>
`,  
  
tip2: `
  <h2>⚔️ Melhore o ataque das suas formações</h2>
  <img src="../img-tip-ataque1.jpg" alt="Formaciones">
  
  <p>No Last Z existem <b>3 facções de heróis</b>: <span style="color:#ff4757">🔴 Rosa Sangrenta</span>, <span style="color:#5889e8">🔵 Asas do Amanhecer</span> y <span style="color:#f1c40f">🟡 Guardião</span>.</p>
  
  <p>O máximo de heróis por formação é <b>5</b>. Ao alinhar <b>5 heróis da mesma facção</b>, você obtém <b>ATQ de Tropa +115%</b>.</p>

  <h3>🎯 Ordem Recomendada de Formações</h3>
  
  <p><b>1ª Formação: Rosa Sangrenta (Vermelho)</b><br>
  Esta deve ser sua <b>formação principal</b> porque:</p>
  <ul>
    <li>Você consegue heróis dessa facção <b>mais facilmente</b> no início do jogo.</li>
    <li>Possui o edifício <b>Jardim da Névoa Tóxica</b> que melhora diretamente o ATQ dessa tropa.</li>
  </ul>

  <p><b>2ª Formação: Asas do Amanhecer (Azul)</b><br>
  Sua segunda tropa mais forte:</p>
  <ul>
    <li>Melhore esta formação com o edifício <b>Torre do Amanhecer</b>.</li>
  </ul>

  <p><b>3ª Formação: Guardião (Amarelo)</b><br>
  Sua terceira tropa:</p>
  <ul>
    <li>Melhore esta formação com o edifício <b>Fábrica de Aço</b>.</li>
  </ul>

  <h3>🏗️ Edifícios de Facção - Melhore seu ATQ</h3>
  
  <p>Cada facção tem um <b>edifício exclusivo</b> que potencializa diretamente essa formação. <b>Melhore esses edifícios na ordem das suas formações</b>:</p>
  
  <p><b>1. Jardim da Névoa Tóxica</b> (Rosa Sangrenta) → <span style="color:#4cd137">Prioridade ALTA</span><br>
  Melhora o ATQ da sua <b>1ª formação</b>. Priorize subir este edifício primeiro.</p>

  <p><b>2. Torre do Amanhecer</b> (Asas do Amanhecer) → <span style="color:#fbc531">Prioridade MÉDIA</span><br>
  Melhora o poder da sua <b>2ª formação</b>.</p>

  <p><b>3. Fábrica de Aço</b> (Guardião) → <span style="color:#fbc531">Prioridade MÉDIA</span><br>
  Melhora o poder da sua <b>3ª formação</b>.</p>

  <h3>💡 Estratégia Correta</h3>
  
  <p><b>✅ O que FAZER:</b></p>
  <ul>
    <li>Concentre recursos em <b>5 heróis de Rosa Sangrenta</b> para sua 1ª formação.</li>
    <li>Melhore o <b>Jardim da Névoa Tóxica</b> primeiro para potencializar sua tropa principal.</li>
    <li>Mantenha formações <b>puras</b> (5 heróis da mesma facção).</li>
  </ul>

  <p><b>❌ O que NÃO FAZER:</b></p>
  <ul>
    <li><b>Evite misturar heróis de facções diferentes</b> na mesma tropa (você perde o buff +115%).</li>
    <li>Não melhore os 3 edifícios ao mesmo tempo — priorize conforme a ordem das suas formações.</li>
    <li>Não invista em uma 4ª formação até ter as 3 primeiras completas.</li>
  </ul>

  <h3>📈 Progressão Recomendada</h3>
  
  <p><b>Fase 1:</b> Complete sua <b>1ª formação Rosa Sangrenta</b> + melhore o Jardim da Névoa Tóxica.<br>
  <b>Fase 2:</b> Complete sua <b>2ª formação Asas do Amanhecer</b> + melhore a Torre do Amanhecer.<br>
  <b>Fase 3:</b> Complete sua <b>3ª formação Guardião</b> + melhore a Fábrica de Aço.</p>

  <p><b>Dica F2P:</b> Essa estratégia maximiza seu poder de ataque sem gastar dinheiro. O buff +115% é <b>enorme</b> e faz diferença em PvP e eventos.</p>
`,
  
tip3: `
  <h2>🎯 Rotação de Armaduras na Caravana</h2>
  <img src="../img-tip-caravana-1.jpg" alt="Caravana">
  
  <h3>🏛️ O que é a Caravana?</h3>
  <p>A <b>Caravana</b> é um edifício onde você enfrenta ondas de zumbis em <b>3 campos de batalha separados</b>:</p>
  <ul>
    <li>🔴 <b>Campo de Batalha - Rosa Sangrenta</b></li>
    <li>🔵 <b>Campo de Batalha - Asas do Amanhecer</b></li>
    <li>🟡 <b>Campo de Batalha - Guardião da Ordem</b></li>
  </ul>
  
  <p>Cada campo tem <b>ondas progressivas de zumbis</b> que ficam mais fortes. Você avança até sua formação não aguentar mais.</p>

  <h3>⚙️ Estratégia de Rotação de Armaduras</h3>
  
  <p>Normalmente, suas <b>melhores armaduras</b> (rank S e A melhoradas) estão equipadas na sua <b>1ª formação (Rosa Sangrenta)</b>. Veja como maximizar suas recompensas:</p>

  <p><b>Passo 1: Campo Rosa Sangrenta</b><br>
  Entre com sua 1ª formação com as melhores armaduras. Avance o máximo possível e saia do campo.</p>

  <p><b>Passo 2: Transferir Armaduras para a 2ª Formação</b><br>
  Remova as armaduras S/A da sua 1ª formação e equipe-as na 2ª formação (Asas do Amanhecer). Isso aumenta temporariamente o poder dela.</p>

  <p><b>Passo 3: Campo Asas do Amanhecer</b><br>
  Entre com sua 2ª formação agora potencializada e avance o máximo possível.</p>

  <p><b>Passo 4: Transferir Armaduras para a 3ª Formação</b><br>
  Repita o processo: remova armaduras da 2ª formação e equipe-as na 3ª formação (Guardião).</p>

  <p><b>Passo 5: Campo Guardião da Ordem</b><br>
  Entre com sua 3ª formação potencializada e avance o máximo possível.</p>

  <p><b>Passo 6: Restaurar Armaduras</b><br>
  Após terminar a Caravana, devolva as armaduras para sua 1ª formação. Tudo volta ao normal.</p>

  <h3>💡 Por que essa estratégia funciona?</h3>
  
  <ul>
    <li>Suas 2ª e 3ª formações normalmente são mais fracas.</li>
    <li>Ao transferir armaduras S/A melhoradas, você aumenta temporariamente o poder delas.</li>
    <li>Isso permite <b>avançar mais rodadas</b> em cada campo = <b>melhores recompensas</b>.</li>
    <li>É uma estratégia <b>apenas para a Caravana</b> — depois você restaura tudo.</li>
  </ul>

  <h3>✅ Vantagens e Considerações</h3>
  
  <p><b>Vantagens:</b></p>
  <ul>
    <li>Você maximiza recompensas nos 3 campos.</li>
    <li>Não precisa gastar recursos melhorando armaduras adicionais.</li>
    <li>Estratégia 100% F2P friendly.</li>
  </ul>

  <p><b>Desvantagens:</b></p>
  <ul>
    <li>Leva tempo transferir armaduras manualmente.</li>
    <li>Você deve lembrar de restaurar as armaduras depois.</li>
    <li>Não funciona se você estiver no meio de um evento PvP.</li>
  </ul>

  <h3>🎯 Dica Extra</h3>
  
  <p>Se sua 1ª formação tem <b>armadura S+10</b> e a 2ª tem <b>armadura B+5</b>, a troca temporária fará uma <b>diferença ENORME</b> em quantas rodadas você consegue avançar.</p>

  <p><b>Melhor momento:</b> Quando a Caravana reinicia (geralmente semanal) e você tem tempo para se dedicar.</p>

  <p><b>Não esqueça:</b> Ao terminar, devolva as armaduras para sua 1ª formação para que esteja pronta para combates normais, eventos e PvP.</p>
`,

tip4: `
  <h2>🎮 Criar Contas Secundárias (Farms)</h2>
  <img src="../img-tip-farm-1.jpg" alt="Cuenta Farm">
  
  <h3>O que são Contas Farm?</h3>
  <p>Personagens adicionais que você usa para <b>gerar recursos extras</b> e enviá-los para sua conta principal via comércio ou doações de aliança.</p>

  <h3>📱 Método 1: Dual Space (Recomendado)</h3>
  <p><b>Passo a passo:</b></p>
  <ol>
    <li>Baixe o app <b>Dual Space</b> (Android/iOS)</li>
    <li>Instale uma segunda cópia do jogo dentro do Dual Space</li>
    <li>Complete o tutorial inicial</li>
    <li>Vá em <b>Perfil → Conta → Gerenciamento de Personagem</b></li>
    <li>Clique em <b>"Criar Novo Personagem"</b></li>
    <li>Selecione sua <b>zona de guerra/servidor atual</b></li>
  </ol>
  <img src="../img-tip-farm-2.jpg" alt="Dual Space">

  <h3>🚀 Método 2: Teletransporte Gratuito</h3>
  <p><b>Aproveite eventos com TP grátis (sábados):</b></p>
  <ol>
    <li>Na <b>Guerra de Servidores</b> ou <b>Versus de Aliança</b>, teletransporte-se para outra zona</li>
    <li>Vá em <b>Perfil → Conta → Gerenciamento de Personagem</b></li>
    <li>Clique em <b>"Criar Novo Personagem"</b></li>
    <li>Selecione seu <b>servidor original</b></li>
  </ol>
  <p><b>Vantagem:</b> Não precisa de apps externos, usa o TP gratuito do evento.</p>

  <h3>💡 Dicas para Farms Eficientes</h3>
  <ul>
    <li><b>Entre na sua própria aliança</b> para facilitar doações</li>
    <li><b>Foque na produção:</b> melhore fazendas, serrarias e minas primeiro</li>
    <li><b>Não desenvolva militarmente</b> (apenas recursos)</li>
    <li><b>Use escudos baratos</b> para se proteger de ataques</li>
    <li><b>Mantenha poder baixo</b> para evitar ser alvo</li>
  </ul>

  <h3>⚠️ Importante</h3>
  <p>Verifique as regras do jogo sobre multi-contas. <b>Evite usar farms para manipular rankings</b> ou violar os termos de serviço.</p>
`,

tip5: `
  <h2>💰 Otimizar Caixas de Recursos</h2>
  <img src="../img-tip-cajas-1.jpg" alt="Cajas de recursos">
  
  <h3>📦 Tipos de Caixas de Recursos</h3>
  <p>Ao completar missões e eventos, você recebe <b>caixas de recursos</b> de diferentes qualidades:</p>
  
  <ul>
    <li>🟦 <b>Caixa Azul</b> → Recursos básicos</li>
    <li>🟪 <b>Caixa Roxa</b> → Recursos médios</li>
    <li>🟨 <b>Caixa Dourada/Amarela</b> → Recursos altos</li>
  </ul>

  <h3>🔑 Segredo: As Caixas Escalam com seu Nível</h3>
  
  <p><b>O que poucos sabem:</b> A quantidade de recursos que você obtém de cada caixa <b>aumenta conforme seu nível de Sede</b>.</p>

  <p>Ejemplo:</p>
  <ul>
    <li>Uma caixa dourada no <b>nível 15</b> pode dar <b>50.000 de comida</b>.</li>
    <li>A <b>mesma caixa</b> no <b>nível 27</b> pode dar <b>500.000 de comida</b>.</li>
  </ul>

  <p>Isso significa que <b>guardar caixas e usá-las em níveis altos</b> dá <b>muito mais valor</b>.</p>

  <h3>📈 Estratégia Recomendada</h3>

  <p><b>Caixas Azuis:</b><br>
  • Use quando precisar.<br>
  • Não vale muito a pena guardá-las (valor baixo).</p>

  <p><b>Caixas Roxas:</b><br>
  • Guarde até o <b>nível 20-23</b>.<br>
  • Use quando precisar de recursos para uma melhoria importante.</p>

  <p><b>Caixas Douradas/Amarelas:</b><br>
  • <b>GUARDE!</b> Não as use no início.<br>
  • Espere até o <b>nível 27+</b> (alguns esperam até o nível 30+).<br>
  • Nesses níveis, os recursos que elas dão são <b>MUITO maiores</b>.</p>

  <h3>💡 Por que funciona?</h3>

  <ul>
    <li>Em níveis baixos (1-20), as melhorias requerem poucos recursos.</li>
    <li>Em níveis altos (27+), as melhorias requerem <b>bilhões de recursos</b>.</li>
    <li>Se você usar as caixas douradas em nível baixo, <b>desperdiça o potencial delas</b>.</li>
    <li>Se guardar para nível alto, <b>obtém 10x-20x mais valor</b>.</li>
  </ul>

  <h3>🎯 Dica Prática</h3>

  <p><b>Níveis 1-15:</b><br>
  • Use apenas caixas azuis.<br>
  • Guarde TODAS as roxas e douradas.</p>

  <p><b>Níveis 16-23:</b><br>
  • Use caixas azuis livremente.<br>
  • Use caixas roxas apenas se necessário.<br>
  • NÃO toque nas douradas.</p>

  <p><b>Níveis 24-26:</b><br>
  • Use caixas azuis e roxas conforme necessário.<br>
  • Continue guardando as douradas.</p>

  <p><b>Nível 27+:</b><br>
  • Agora sim! Use as caixas douradas que guardou.<br>
  • Você verá uma <b>diferença ENORME</b> na quantidade de recursos.</p>

  <h3>⚠️ Erros Comuns</h3>

  <p><b>❌ O que NÃO FAZER:</b></p>
  <ul>
    <li>Usar caixas douradas no nível 10-15 "porque preciso de recursos agora".</li>
    <li>Abrir todas as caixas assim que as recebe.</li>
    <li>Não ter paciência para guardá-las.</li>
  </ul>

  <p><b>✅ O que FAZER:</b></p>
  <ul>
    <li>Acumular caixas douradas no inventário.</li>
    <li>Administrar recursos com caixas de menor qualidade.</li>
    <li>Ser paciente — a recompensa vale a pena.</li>
  </ul>

  <h3>🔥 Dica F2P</h3>

  <p>Essa estratégia é <b>FUNDAMENTAL para jogadores F2P</b>. Em níveis altos, os recursos são o maior gargalo. Ter um <b>banco de caixas douradas guardadas</b> permite fazer melhorias críticas sem gastar dinheiro real.</p>

  <p><b>Exemplo real:</b> Um jogador que guardou 50 caixas douradas do nível 10 até o nível 28, ao abrir todas obteve <b>mais de 20 bilhões de recursos</b> — suficiente para várias melhorias importantes.</p>

  <p><b>Lembre-se:</b> A paciência neste jogo é recompensada. Guarde essas caixas douradas! 💎</p>
`,

tip6: `
  <h2>🏛️ Cargos Oficiais do Servidor: Buffs Grátis para Todo Jogador</h2>

  <h3>📍 Como Acessar o Governo do seu Servidor?</h3>
  <p>Siga estes passos para acessar a interface de governo:</p>
  <ol>
    <li>Clique no <b>seu perfil</b> (sua foto ou nome na tela).</li>
    <li>Abaixo do nome da sua aliança você verá sua <b>Zona de Batalha</b> — clique nesse número.</li>
    <li>Isso leva diretamente à <b>interface de governo do servidor</b>.</li>
    <li>Procure o cargo que lhe interessa conforme o buff que precisa.</li>
    <li>Se estiver disponível ou com fila livre, pressione <b>"Solicitar"</b>. Pronto!</li>
  </ol>

  <h3>⚠️ Requisitos para Solicitar</h3>
  <ul>
    <li>Sua <b>Sede deve ser nível 26 ou superior</b> (varia conforme o Presidente atual).</li>
    <li>Você só pode ocupar <b>um cargo por vez</b>.</li>
    <li>O Presidente define <b>quais cargos estão disponíveis</b> para solicitar e seus requisitos.</li>
  </ul>

  <h3>⏱️ Quanto Tempo Dura o Cargo?</h3>
  <ul>
    <li>Ao solicitar, você recebe o cargo por <b>mínimo 10 minutos</b>.</li>
    <li>Se <b>ninguém mais solicitar</b>, você o mantém indefinidamente.</li>
    <li>Se houver fila de espera, ao encerrar seu tempo passa para o próximo.</li>
    <li>O Presidente pode <b>remover seu cargo</b> a qualquer momento.</li>
    <li>Há uma <b>fila de até 50 solicitações</b> por cargo.</li>
  </ul>

  <h3>👑 Hierarquia e Buffs de Cada Cargo</h3>
  <p>Escolha o cargo conforme seu estilo de jogo:</p>

  <p><b>👑 Presidente</b><br>
  • ATQ de Tropa <b>+15%</b><br>
  • DEF de Tropa <b>+15%</b><br>
  • Vida de Tropa <b>+5%</b><br>
  → <i>Apenas designado pela aliança que conquista a capital. Não é solicitável.</i></p>

  <p><b>👸 Primera Dama</b><br>
  • Producción de Recursos <b>+10%</b><br>
  • Vel. de Recolección <b>+20%</b><br>
  → <i>Ideal para farmers y jugadores enfocados en economía.</i></p>

  <p><b>🤝 Vicepresidente</b><br>
  • Vel. de Construcción <b>+5%</b><br>
  • Vel. de Investigación <b>+5%</b><br>
  → <i>Bueno si estás activo mejorando edificios e investigaciones. Además puede enviar correos a todo el servidor.</i></p>

  <p><b>⚔️ Comandante General de la Guerra</b><br>
  • ATQ de Tropa <b>+10%</b><br>
  • DEF de Tropa <b>+10%</b><br>
  → <i>Perfecto para jugadores enfocados en combate general.</i></p>

  <p><b>🎖️ General Supremo</b><br>
  • ATQ de Tropa <b>+10%</b><br>
  • ATQ de Tropa en Asedio <b>+10%</b><br>
  → <i>Ideal si participas en ataques a edificios o eventos de asedio.</i></p>

  <p><b>🏗️ Ministro de Construcción</b><br>
  • Vel. de Construcción <b>+15%</b><br>
  • Tiempo gratuito para construir <b>+3,600 segundos</b><br>
  → <i>Excelente para cuando estás subiendo edificios de nivel.</i></p>

  <p><b>🌾 Ministro de Agricultura</b><br>
  • Vel. de Recolección <b>+35%</b><br>
  • Producción de Recursos <b>+20%</b><br>
  → <i>El mejor cargo para farmers. Máximo beneficio de recursos.</i></p>

  <p><b>🔬 Ministro de Investigación</b><br>
  • Vel. de Investigación <b>+15%</b><br>
  • Reducir tiempo de investigación <b>+3,600 segundos</b><br>
  → <i>Perfecto para cuando estás activo investigando en el Laboratorio.</i></p>

  <p><b>🛡️ Ministro de Defensa</b><br>
  • ATQ de Tropa en Defensas de Asedio <b>+10%</b><br>
  • DEF de Tropa en Defensas de Asedio <b>+10%</b><br>
  → <i>Útil para defender tu base durante eventos de guerra.</i></p>

  <h3>🎯 ¿Cuál Cargo Pedir Según tu Situación?</h3>
  <ul>
    <li>¿Subiendo edificios? → <b>Ministro de Construcción</b></li>
    <li>¿Investigando en el Lab? → <b>Ministro de Investigación</b></li>
    <li>¿Recolectando recursos? → <b>Ministro de Agricultura</b></li>
    <li>¿En guerra o evento de combate? → <b>Comandante General o General Supremo</b></li>
    <li>¿Defendiendo tu base? → <b>Ministro de Defensa</b></li>
  </ul>

  <h3>💡 Consejos Clave</h3>
  <ul>
    <li>Solicita el cargo <b>justo antes</b> de construir, investigar o atacar para aprovechar el buff.</li>
    <li>Si el cargo está ocupado, <b>entra en la cola</b> — tienes hasta 50 lugares disponibles.</li>
    <li>Los cargos son <b>gratuitos</b> — no cuestan recursos ni gemas. ¡Úsalos siempre!</li>
    <li>Si eres F2P, el <b>Ministro de Agricultura</b> es el más valioso a largo plazo.</li>
    <li>Algunos presidentes ponen <b>requisitos altos</b> — si no cumples, espera al siguiente gobierno.</li>
  </ul>
`,

tip7: `
  <h2>💵 Mejores Compras para Principiantes</h2>
  <img src="../img-tip-compras-1.jpg" alt="Sophia">
  
  <p>Si decides <b>gastar dinero real</b> en Last Z, estas son las <b>mejores inversiones</b> para la fase inicial del juego (niveles 1-20).</p>

  <h3>🎯 Compra #1: Sophia - Héroe Constructor ($1 USD)</h3>
  
  <p><b>¿Por qué es la mejor compra?</b></p>
  <ul>
    <li>Cuesta solo <b>$1 dólar</b> (muy accesible).</li>
    <li>Es un <b>héroe Rango S</b> - excelente calidad.</li>
    <li>Su <b>habilidad especial</b>: Reduce el tiempo de construcción de edificios.</li>
    <li>Te ahorra <b>días o semanas</b> de espera en mejoras.</li>
    <li>Útil durante <b>toda tu progresión</b>, no solo al inicio.</li>
  </ul>

  <p><b>Cuándo comprarla:</b> Lo antes posible. Su utilidad comienza desde nivel 1.</p>

  <h3>🔨 Compra #2: Segundo Constructor ($2 USD)</h3>
  <img src="../img-tip-compras-1.jpg" alt="Sophia">
  <p><b>¿Por qué es esencial?</b></p>
  <ul>
    <li>Cuesta aproximadamente <b>$2 dólares</b>.</li>
    <li>Te permite <b>mejorar 2 edificios simultáneamente</b>.</li>
    <li>Duplica tu velocidad de progreso al inicio.</li>
    <li>Fundamental para <b>no quedarte estancado</b> esperando que un edificio termine.</li>
    <li>Es una inversión que <b>acelera todo tu juego</b>.</li>
  </ul>

  <p><b>Cuándo comprarlo:</b> Idealmente en la primera semana de juego.</p>

  <h3>💡 ¿Por qué estas 2 compras primero?</h3>
  
  <p>Con solo <b>$3 dólares</b> ($1 Sophia + $2 Constructor), obtienes:</p>
  <ul>
    <li>Un <b>héroe Rango S útil</b> que acelera construcción.</li>
    <li>La capacidad de <b>construir 2 edificios a la vez</b>.</li>
    <li>Una <b>ventaja ENORME</b> sobre jugadores 100% F2P en los primeros niveles.</li>
  </ul>

  <p>Estas compras te dan el <b>mejor valor por dólar</b> en todo el juego.</p>

  <h3>📊 Comparación: F2P vs $3 USD</h3>
  
  <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
    <tr style="background:#1a1a1a; border-bottom:2px solid var(--acento);">
      <th style="padding:0.8rem; text-align:left; color:var(--acento);">Aspecto</th>
      <th style="padding:0.8rem; text-align:left; color:var(--acento);">F2P</th>
      <th style="padding:0.8rem; text-align:left; color:var(--acento);">Con $3</th>
    </tr>
    <tr style="border-bottom:1px solid #333;">
      <td style="padding:0.8rem;">Velocidad de construcción</td>
      <td style="padding:0.8rem; color:#ff4757;">Normal</td>
      <td style="padding:0.8rem; color:#4cd137;">Reducida (Sophia)</td>
    </tr>
    <tr style="border-bottom:1px solid #333;">
      <td style="padding:0.8rem;">Constructores</td>
      <td style="padding:0.8rem; color:#ff4757;">1 edificio a la vez</td>
      <td style="padding:0.8rem; color:#4cd137;">2 edificios simultáneos</td>
    </tr>
    <tr>
      <td style="padding:0.8rem;">Tiempo para llegar a nivel 20</td>
      <td style="padding:0.8rem; color:#ff4757;">~3-4 semanas</td>
      <td style="padding:0.8rem; color:#4cd137;">~1.5-2 semanas</td>
    </tr>
  </table>

  <h3>⚠️ Otras Compras - NO Recomendadas al Inicio</h3>
  
  <p><b>Evita gastar en:</b></p>
  <ul>
    <li><b>Paquetes de recursos</b> - Los recursos son fáciles de conseguir gratis.</li>
    <li><b>Aceleradores</b> - Los consigues en eventos.</li>
    <li><b>Diamantes directos</b> - Mejor valor con paquetes específicos.</li>
    <li><b>Héroes aleatorios</b> - Muy RNG (suerte), puede salir basura.</li>
  </ul>

  <p>Prioriza <b>Sophia + Constructor</b> antes que cualquier otra cosa.</p>

  <h3>🎯 Estrategia Post-Compra</h3>
  
  <p>Una vez tengas Sophia y el 2º constructor:</p>
  <ul>
    <li>Usa a <b>Sophia en todas tus construcciones importantes</b> (Sede, Laboratorio).</li>
    <li>Mantén <b>ambos constructores ocupados</b> todo el tiempo.</li>
    <li>Planifica qué construir con cada constructor (ej: Constructor 1 = Sede, Constructor 2 = Recursos).</li>
  </ul>

  <h3>💰 ¿Vale la pena para F2P?</h3>
  
  <p>Si tu presupuesto es <b>$0</b>, está bien. Puedes progresar sin gastar. Pero si puedes permitirte <b>$3 dólares una sola vez</b>, estas compras te darán el <b>mayor impacto</b> en tu experiencia de juego.</p>

  <p><b>Inversión única:</b> Son compras que haces <b>una sola vez</b> y te benefician <b>para siempre</b>. No son suscripciones ni gastos recurrentes.</p>

  <p><b>Conclusión:</b> Si vas a gastar dinero en este juego, que sea en Sophia ($1) y el 2º Constructor ($2). Todo lo demás puede esperar o conseguirse gratis. 💎</p>
`,  

tip8: `
  <h2>♻️ Recicle seus Manuais de Habilidade Azuis</h2>

  <h3>📦 O que são Manuais de Habilidade?</h3>
  <p>Cada herói tem <b>4 habilidades</b> que você pode melhorar usando Manuais de Habilidade. Esses manuais têm <b>3 ranks</b> baseados no rank do herói:</p>
  <ul>
    <li>🔵 <b>Manual Azul</b> → Para heróis Rank B</li>
    <li>🟣 <b>Manual Roxo</b> → Para heróis Rank A</li>
    <li>🟠 <b>Manual Laranja</b> → Para heróis Rank S</li>
  </ul>
  <p>Cada rank tem seus próprios manuais — <b>eles não interferem entre si</b>.</p>

  <h3>❓ O que acontece quando você não precisa mais deles?</h3>
  <p>Com o tempo, todos os seus <b>heróis Rank B</b> terão as 4 habilidades no máximo. A partir daí, os Manuais Azuis se acumulam no inventário <b>sem nenhum uso</b>.</p>

  <h3>✅ La Solución: Reciclarlos</h3>
  <p><b>Passo 1:</b> Vá ao seu <b>Armazém → aba Herói</b>.</p>
  <p><b>Passo 2:</b> Encontre os <b>Manuais de Habilidade Azuis</b>.</p>
  <p><b>Passo 3:</b> Se todos os seus heróis Rank B tiverem habilidades no máximo, você verá a opção <b>"Reciclar"</b>.</p>
  <p><b>Passo 4:</b> Selecione a quantidade e recicle. Cada manual azul se torna uma <b>Caixa Aleatória de Recursos Básicos</b>.</p>

  <h3>🎁 O que as Caixas dão?</h3>
  <p>Cada caixa pode dar aleatoriamente:</p>
  <ul>
    <li>1k Madeira</li>
    <li>1k Eletricidade</li>
    <li>1k Comida</li>
    <li>600 Moedas Z</li>
    <li>💎 <b>Diamantes</b></li>
    <li>⭐ <b>Fragmentos de herói Rank S</b></li>
  </ul>

  <h3>💡 Dica Chave</h3>
  <div style="background: rgba(196, 30, 58, 0.15); padding: 1rem; border-left: 4px solid var(--acento); margin: 1rem 0; border-radius: 4px;">
    <p>💎 <strong>Abra as caixas em lotes de 1.000.</strong> Quanto mais você abre de uma vez, maiores as chances de obter <b>Diamantes ou Fragmentos de herói Rank S</b>. Não as abra uma por uma.</p>
  </div>

  <h3>🎯 Resumo</h3>
  <ul>
    <li>Heróis Rank B com habilidades no máximo → Manuais azuis são inúteis</li>
    <li>Ve a <b>Almacén → Héroe → Reciclar</b></li>
    <li>Converta os manuais em caixas de recursos</li>
    <li>Abra as caixas em <b>lotes de 1.000</b> para melhores recompensas</li>
  </ul>

  <p style="color:#555; font-size:0.8rem; margin-top:1.5rem; border-top:1px solid #222; padding-top:0.75rem;">
    💡 Dica contribuída por <strong style="color:#c41e3a;">@Daff21</strong> — Obrigado por compartilhar com a comunidade!
  </p>
`,

tip9: `
  <h2>⚕️ Cura Eficiente com Ajuda da Aliança</h2>
  <img src="../img-tip-curacion-1.jpg" alt="Hospital">
  
  <h3>❌ Erro Comum</h3>
  <p>Após um combate ou evento, muitos jogadores têm tropas feridas no Hospital e fazem isso:</p>
  
  <ul>
    <li>Selecionam <b>"Curar tudo"</b> (todas as tropas feridas de uma vez)</li>
    <li>O tempo de cura é <b>muito longo</b></li>
    <li>Acabam gastando <b>aceleradores</b> para terminar rápido</li>
  </ul>

  <p>Isso desperdiça aceleradores que você poderia usar em situações de emergência.</p>

  <h3>✅ A Estratégia Correta: Curar em Lotes</h3>
  
  <p><b>Passo 1:</b> No Hospital, <b>NÃO selecione "Curar tudo"</b>.</p>
  
  <p><b>Passo 2:</b> Verifique <b>quantos membros da aliança estão ativos</b> (online).</p>
  
  <p><b>Passo 3:</b> Selecione um <b>pequeno lote de tropas feridas</b>. A quantidade depende de quantos membros ativos há na aliança:
  <ul>
    <li>Muitos membros ativos = você pode selecionar um lote maior</li>
    <li>Poucos membros ativos = selecione um lote menor</li>
  </ul>
  </p>
  
  <p><b>Passo 4:</b> Clique em <b>"Curar"</b>.</p>
  
  <p><b>Passo 5:</b> <b>Espere que sua aliança te ajude</b>. Cada ajuda reduz o tempo de cura. Se o lote for adequado, a aliança pode te ajudar a <b>curar TODO esse lote</b>.</p>
  
  <p><b>Passo 6:</b> Observe quão rápido se cura:</p>
  <ul>
    <li><b>Se curar rápido</b> (muitos membros ajudando) → pode curar um pouco mais no próximo lote</li>
    <li><b>Se demorar para curar</b> → reduza a quantidade de soldados</li>
  </ul>
  
  <p><b>Passo 7:</b> <b>Repita o processo</b> até curar todos os feridos.</p>

  <h3>💡 Por que funciona?</h3>
  
  <p>Quando você cura <b>pequenos lotes</b>, o tempo de cura é curto. Sua aliança pode ajudar e <b>reduzir consideravelmente esse tempo</b>. Isso permite:</p>
  
  <ul>
    <li>Curar tropas <b>sem gastar aceleradores</b></li>
    <li>Aproveitar ao máximo a <b>ajuda da aliança</b></li>
    <li>Ter suas tropas prontas mais rápido sem gastar recursos valiosos</li>
  </ul>

  <h3>🎯 Melhor Momento para Usar Esta Estratégia</h3>
  
  <p><b>Após eventos como "O Tirano":</b></p>
  <ul>
    <li>Muitos membros da aliança estão <b>conectados e ativos</b></li>
    <li>Podem te ajudar <b>imediatamente</b></li>
    <li>Você pode curar todas as suas tropas mais rápido sem gastar nada</li>
  </ul>

  <img src="../img-tip-curacion-2.jpg" alt="Miembros en línea">

  <h3>🔑 Fator Chave: Membros Ativos</h3>
  
  <p>O tamanho do lote que você pode curar eficientemente depende diretamente de <b>quantos membros da aliança estão ativos</b> naquele momento.</p>
  
  <p><b>Mais membros online</b> = Mais ajudas = Você pode curar lotes maiores</p>
  <p><b>Menos membros online</b> = Menos ajudas = Cure lotes menores</p>

  <h3>⚠️ Dicas Importantes</h3>
  
  <p><b>✅ O que FAZER:</b></p>
  <ul>
    <li>Cure após eventos quando muitos membros estão ativos</li>
    <li>Ajuste a quantidade conforme a rapidez das ajudas</li>
    <li>Seja paciente — você economizará muitos aceleradores a longo prazo</li>
    <li>Verifique a lista de membros "Online" antes de começar</li>
  </ul>

  <p><b>❌ O que NÃO FAZER:</b></p>
  <ul>
    <li>Curar tudo de uma vez se não tiver pressa</li>
    <li>Usar aceleradores se puder esperar</li>
    <li>Ignorar a ajuda da aliança — ela existe por um motivo!</li>
    <li>Selecionar lotes muito grandes quando poucos membros estão ativos</li>
  </ul>

  <h3>📝 Nota Importante</h3>
  
  <p>O tempo de cura e a quantidade de tropas que você pode curar eficientemente também dependem de:</p>
  <ul>
    <li>As <b>pesquisas da sua aliança</b></li>
    <li>Seus <b>refugiados</b></li>
    <li>Outros fatores do jogo</li>
  </ul>
  
  <p>Por isso é importante <b>ajustar dinamicamente</b> o tamanho dos lotes conforme veja quão rápido se curam.</p>

  <h3>🔥 Consejo Final</h3>
  
  <p>Aceleradores são valiosos. Use-os apenas quando realmente precisar. Para curas, a ajuda da aliança é suficiente se você tiver paciência e selecionar lotes adequados. 💚</p>
`,

tip10: `
  <h2>🤝 Doação Rápida em Tecnologias de Aliança</h2>
  <img src="../img-tip-donacion-1.jpg" alt="Tecnologías de alianza">
  
  <h3>❌ O que Muitos Jogadores Fazem</h3>
  <p>Ao doar nas <b>Tecnologias de Aliança</b>, a maioria dos jogadores clica repetidamente no botão "Doar", doando <b>um de cada vez</b>. Isso é lento e ineficiente.</p>

  <h3>✅ O Truque: Mantenha Pressionado</h3>
  
  <p>Em vez de cliques individuais, <b>mantenha o botão de doação pressionado</b>. Isso ativará <b>multiplicadores automáticos</b>:</p>
  <ul>
    <li>🔥 <b>x2</b> - Doa o dobro</li>
    <li>🔥 <b>x5</b> - Doa 5 vezes mais</li>
    <li>🔥 <b>x10</b> - Doa 10 vezes mais</li>
  </ul>

  <img src="../img-tip-donacion-2.jpg" alt="Multiplicadores activados">

  <h3>💡 Por que Funciona</h3>
  
  <ul>
    <li><b>Economiza tempo:</b> Não precisa fazer centenas de cliques.</li>
    <li><b>Sua aliança avança mais rápido:</b> Mais doações completam tecnologias antes.</li>
    <li><b>Obtém mais pontos:</b> Acumula pontos de contribuição para comprar itens na Loja de Aliança.</li>
    <li><b>Melhor uso das tentativas:</b> As tentativas são limitadas, os multiplicadores as valorizam mais.</li>
  </ul>
  
  <p><b>Dica F2P:</b> Use a doação com moedas e mantenha pressionado para ativar os multiplicadores.</p>

  <h3>⚠️ Consejos</h3>
  
  <p><b>✅ O que FAZER:</b></p>
  <ul>
    <li>Manter pressionado para ativar multiplicadores</li>
    <li>Doar diariamente antes que as tentativas se reiniciem</li>
    <li>Priorizar tecnologias que beneficiem toda a aliança</li>
  </ul>

  <p><b>❌ O que NÃO FAZER:</b></p>
  <ul>
    <li>Fazer cliques individuais desperdiçando tempo</li>
    <li>Esquecer de doar — você perde pontos valiosos para a Loja de Aliança</li>
  </ul>

  <h3>🔥 Consejo Extra</h3>
  
  <p>Os pontos de contribuição que você ganha são usados na <b>Loja de Aliança</b> para comprar aceleradores, recursos, fragmentos de heróis e mais. Quanto mais você doar, mais pode comprar!</p>

  <p><b>Lembre-se:</b> Mantenha pressionado = Multiplicadores ativados = Mais eficiência para você e sua aliança. 🚀</p>
`,

tip11: `
  <h2>⚔️ Retorno Automático de Tropas</h2>
  <img src="../img-tip-regreso-1.png" alt="Opciones de ataque">
  
  <h3>❌ Problema Comum</h3>
  <p>Muitos jogadores atacam objetivos <b>(sedes, etc.)</b> e após vencer, suas tropas <b>ficam no objetivo</b>. Isso significa que você precisa:</p>
  
  <ul>
    <li>Lembrar que suas tropas estão fora</li>
    <li>Ir ao mapa e encontrar onde ficaram</li>
    <li>Retornar as tropas <b>manualmente</b> cada vez</li>
  </ul>

  <p>Isso é tedioso e fácil de esquecer, especialmente se você atacar múltiplos objetivos.</p>

  <h3>✅ A Solução: Retorno Automático</h3>
  
  <p>Existe uma opção que faz suas tropas <b>retornarem automaticamente</b> após completar o ataque. Veja como ativá-la:</p>

  <p><b>Passo 1:</b> Clique no objetivo que deseja atacar (sede inimiga, zumbi, etc.).</p>
  
  <p><b>Passo 2:</b> Aparecerão 3 opções:</p>
  <ul>
    <li>🔍 <b>Reconhecer</b></li>
    <li>👥 <b>Equipe</b></li>
    <li>⚔️ <b>Ataque</b></li>
  </ul>
  
  <p><b>Passo 3:</b> Clique em <b>"Ataque"</b>.</p>
  
  <p><b>Passo 4:</b> No painel de ataque, <b>procure abaixo</b> a opção <b>"Retorno automático"</b>.</p>
  
  <p><b>Passo 5:</b> <b>Certifique-se de que esteja marcado</b> (com um ✓ check verde).</p>

  <img src="../img-tip-regreso-2.png" alt="Regreso automático activado">
  
  <p><b>Passo 6:</b> Clique em <b>"Marchar"</b> para enviar seu ataque.</p>

  <h3>💡 O que Acontece Agora?</h3>
  
  <p>Após ativar o retorno automático:</p>
  
  <ul>
    <li>Suas tropas irão ao objetivo</li>
    <li>Completarão o combate</li>
    <li><b>Retornarão automaticamente</b> para sua sede sem que você precise fazer nada</li>
  </ul>
  
  <p>Você verá uma mensagem dizendo: <b>"Retorno automático habilitado. As tropas retornarão automaticamente para a sede após completar o comando atual."</b></p>

  <h3>🎯 Vantagens</h3>
  
  <ul>
    <li><b>Economiza tempo:</b> Não precisa retornar tropas manualmente</li>
    <li><b>Evita esquecimentos:</b> Nenhuma tropa fica abandonada no mapa</li>
    <li><b>Mais eficiente:</b> Ideal quando você farma múltiplos objetivos seguidos</li>
    <li><b>Tropas seguras:</b> Retornam imediatamente, reduzindo o risco de serem atacadas fora</li>
  </ul>

  <h3>⚠️ Dicas Importantes</h3>
  
  <p><b>✅ O que FAZER:</b></p>
  <ul>
    <li>Ativar retorno automático <b>SEMPRE</b> que atacar objetivos</li>
    <li>Verificar que a opção esteja marcada antes de clicar em "Marchar"</li>
    <li>Usar essa opção especialmente quando farmar recursos</li>
  </ul>

  <p><b>❌ O que NÃO FAZER:</b></p>
  <ul>
    <li>Esquecer de ativar o retorno automático — suas tropas ficarão fora</li>
    <li>Assumir que está ativado por padrão — sempre verifique</li>
  </ul>

  <h3>🔥 Consejo Extra</h3>
  
  <p>Se você estiver farmando múltiplos objetivos, o retorno automático é <b>essencial</b>. Assim pode enviar ataques um após o outro sem se preocupar em retornar tropas manualmente.</p>

  <p><b>Lembre-se:</b> Verifique a opção "Retorno automático" antes de cada ataque. Esse simples passo vai economizar muito tempo e dor de cabeça. ⚔️</p>
`,

tip12: `
    <h2>⚡ Reforço Rápido</h2>
    <img src="../img-tip-refuerzo-1.jpg" alt="Refuerzo">
    <p>Se houver um <b>tesouro da aliança</b> um pouco longe, você pode chegar mais rápido <b>reforçando cidades ou bases</b> aliadas.</p>
    <p><b>Como funciona?</b></p>
    <ul>
      <li>Só funciona <b>dentro do território da aliança</b>.</li>
      <li>A velocidade de reforço é <b>3x mais rápida</b> que o movimento normal.</li>
      <li>Ideal para chegar rápido a <b>eventos de aliança</b> ou <b>pontos de reunião</b>.</li>
    </ul>
    <p><b>Dica:</b> Use essa mecânica para chegar primeiro aos tesouros e obter melhores recompensas.</p>
  `,
  
tip13: `
  <h2>🔍 Localizar Bases Reconhecidas</h2>
  <img src="../img-tip-reconocimiento-1.jpg" alt="Informe de reconocimiento">
  
  <h3>❌ O Problema</h3>
  <p>Você recebe ou vê um <b>relatório de reconhecimento compartilhado</b> no chat da aliança. Você pode ver os recursos e tropas do inimigo, mas... <b>onde está essa base no mapa?</b></p>
  
  <p>Muitos jogadores perdem tempo buscando manualmente no mapa ou perguntando "onde fica X:324 Y:772?".</p>

  <h3>✅ A Solução (O Truque)</h3>
  
  <p><b>Passo 1:</b> Abra o relatório de reconhecimento (do seu correio ou chat compartilhado).</p>
  
  <p><b>Passo 2:</b> Abaixo do nome do jogador reconhecido, você verá as <b>coordenadas</b> (exemplo: <b>X:324 Y:772</b>).</p>
  
  <p><b>Passo 3:</b> <b>Clique diretamente nessas coordenadas</b>.</p>
  
  <p><b>Resultado:</b> O mapa se moverá automaticamente e te levará <b>diretamente à localização exata</b> dessa base. Sem mais buscas manuais!</p>

  <h3>💡 Por que é útil?</h3>
  
  <ul>
    <li><b>Coordenar ataques de aliança:</b> Todos podem chegar rápido ao objetivo.</li>
    <li><b>Verificar distância:</b> Saber se vale a pena atacar conforme a distância.</li>
    <li><b>Encontrar alvos fáceis:</b> Localizar bases fracas rapidamente.</li>
    <li><b>Economizar tempo:</b> Não perder minutos buscando coordenadas no mapa.</li>
  </ul>

  <h3>🎯 Dica Extra</h3>
  
  <p>Se sua aliança compartilha relatórios de reconhecimento frequentemente, esse truque vai facilitar muito a sua vida. Simplesmente:</p>
  
  <ul>
    <li>Abra o relatório compartilhado no chat</li>
    <li>Clique nas coordenadas</li>
    <li>Avalie se vale a pena atacar</li>
  </ul>

  <p><b>Lembre-se:</b> As coordenadas são clicáveis em qualquer relatório de reconhecimento, seja do correio ou compartilhado em chats. Use sempre!</p>
`,

};

function openTipModal(tipId) {
  document.getElementById('tipModal').style.display = 'block';
  document.getElementById('tipModalBody').innerHTML = tipContent[tipId] || '<p>Conteúdo não disponível</p>';
  document.body.style.overflow = 'hidden';
}

function closeTipModal() {
  document.getElementById('tipModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
  const modal = document.getElementById('tipModal');
  if (event.target == modal) {
    closeTipModal();
  }
}

// Fechar com tecla ESC
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeTipModal();
  }
});