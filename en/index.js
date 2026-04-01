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
  <h2>🏕️ Best Refugees to Recruit</h2>
  <img src="../img-tip-refugiados-1.jpg" alt="Refugiados">
  
  <h3>🎯 The 2 Most Important Refugees</h3>
  <p>In Last Z, refugees grant you <b>permanent passive skills</b> that improve your progress. However, <b>NOT all refugees are equally useful</b>.</p>
  
  <p>These are the <b>2 refugees you MUST prioritize</b> getting:</p>

  <h3>🏗️ #1 - Butler</h3>
  
  <div class="refugiado-box" style="background: rgba(196, 30, 58, 0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
    <p><b>Main Skill:</b> Construction Speed</p>
    <p><b>Extra Bonus:</b> Free speedup time</p>
  </div>
  
  <p><b>Why is it the best?</b></p>
  <ul>
    <li><b>Drastically reduces</b> building construction time</li>
    <li>Construction is the <b>biggest bottleneck</b> in the game</li>
    <li>Gives you additional <b>free speedup time</b> when building</li>
    <li>Useful throughout <b>your entire progression</b>, from level 1 to endgame</li>
    <li>Saves <b>days or weeks</b> of accumulated waiting</li>
  </ul>

  <img src="../img-tip-refugiados-2.jpg" alt="Butler">

  <h3>🤝 #2 - Diplomat</h3>
  
  <div class="refugiado-box" style="background: rgba(88, 137, 232, 0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
    <p><b>Main Skill:</b> Alliance Help Limit</p>
    <p><b>Extra Bonus:</b> Time reduced per help</p>
  </div>
  
  <p><b>Why is it the best?</b></p>
  <ul>
    <li>Increases <b>how many helps you can receive</b> from your alliance</li>
    <li>Each help <b>reduces more time</b> on constructions/research</li>
    <li>Combines perfectly with the <b>Butler</b></li>
    <li>In active alliances, you can <b>complete constructions almost instantly</b></li>
    <li>Works for <b>buildings, research and healing</b></li>
  </ul>

  <h3>💡 Why are these 2 the best?</h3>
  
  <p>The combination of <b>Butler + Diplomat</b> creates a powerful synergy:</p>
  
  <ol>
    <li><b>Butler</b> reduces the base construction time</li>
    <li><b>Diplomat</b> lets you receive more helps</li>
    <li>Each help reduces <b>even more time</b> thanks to the Diplomat</li>
    <li>Result: Constructions that would take days complete in <b>hours or minutes</b></li>
  </ol>

  <h3>🌟 About Rarities</h3>
  
  <p>Both Butler and Diplomat come in <b>different rarities</b>:</p>
  
  <ul>
    <li>🟢 <b>Green</b> (Common) - Basic bonuses</li>
    <li>🔵 <b>Blue</b> (Rare) - Improved bonuses</li>
    <li>🟣 <b>Purple</b> (Epic) - High bonuses</li>
    <li>🟠 <b>Orange</b> (Legendary) - Maximum bonuses</li>
  </ul>
  
  <p><b>Important:</b> Even a <b>green</b> Butler or Diplomat is better than other higher-rarity refugees. Prioritize <b>the refugee type</b> over rarity.</p>

  <h3>⚠️ Other Refugees</h3>
  
  <p>There are many other refugees in the game, but most have <b>much less impactful</b> skills:</p>
  
  <ul>
    <li>Resource production bonuses (you get resources easily through other means)</li>
    <li>Troop training bonuses (useful but not critical)</li>
    <li>Attack/defense bonuses (marginal compared to heroes and equipment)</li>
  </ul>
  
  <p>None of these compare to the <b>massive impact</b> that Butler and Diplomat have on your progression speed.</p>

  <h3>🎯 Recruitment Strategy</h3>
  
  <p><b>Priority 1:</b> Get a <b>Butler</b> as soon as possible.</p>
  <p><b>Priority 2:</b> Get a <b>Diplomat</b> next.</p>
  <p><b>Priority 3:</b> Upgrade the rarity of both when you can.</p>
  
  <div class="club-tip destacado" style="background: rgba(196, 30, 58, 0.15); padding: 1rem; border-left: 4px solid var(--acento); margin: 1.5rem 0; border-radius: 4px;">
    <p>💎 <strong>F2P Tip:</strong> It's worth spending diamonds or coupons to get these 2 refugees. They are one of the <b>best investments</b> you can make in the game, surpassing even many heroes.</p>
  </div>

  <h3>🏢 How to Get Refugees?</h3>
  
  <p>Refugees are recruited at the <a href="edificios.html#club-refugiados" class="edificio-link" style="color: var(--acento); background: rgba(196, 30, 58, 0.1); padding: 0.3rem 0.8rem; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">🏢 Club</a> using <b>Refugee Coupons</b> or <b>Diamonds</b>.</p>
  
  <p><b>Recruitment costs:</b></p>
  <ul>
    <li>1st Refugee: 500 coupons/diamonds</li>
    <li>2nd Refugee: 2,000 coupons/diamonds</li>
    <li>3rd Refugee: 5,000 coupons/diamonds</li>
  </ul>
  
  <p>Available refugees <b>change every 12 hours</b>, and you can use a <b>free refresh</b> after each recruitment to change the available options.</p>
  
  <p>📖 <b>Para más detalles sobre el sistema de reclutamiento, costos y estrategias óptimas, visita la sección de</b> <a href="edificios.html#club-refugiados" class="edificio-link" style="color: var(--acento); background: rgba(196, 30, 58, 0.1); padding: 0.3rem 0.8rem; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">🏢 Club - Refugiados</a>.</p>

  <h3>🔥 Conclusion</h3>
  
  <p><b>Butler and Diplomat</b> are the most important refugees in the game. Their impact on your progression speed is <b>unmatched</b>. Get them as soon as possible and you'll notice an enormous difference in how fast you advance. 🚀</p>
`,  
  
tip2: `
  <h2>⚔️ Improve your formation attack</h2>
  <img src="../img-tip-ataque1.jpg" alt="Formaciones">
  
  <p>In Last Z there are <b>3 hero factions</b>: <span style="color:#ff4757">🔴 Blood Rose</span>, <span style="color:#5889e8">🔵 Wings of Dawn</span> y <span style="color:#f1c40f">🟡 Guardian</span>.</p>
  
  <p>The maximum heroes per formation is <b>5</b>. By aligning <b>5 heroes of the same faction</b>, you get <b>Troop ATK +115%</b>.</p>

  <h3>🎯 Recommended Formation Order</h3>
  
  <p><b>1st Formation: Blood Rose (Red)</b><br>
  This should be your <b>main formation</b> because:</p>
  <ul>
    <li>You get heroes of this faction <b>more easily</b> at the start of the game.</li>
    <li>Has the <b>Toxic Mist Garden</b> building that directly improves this troop's ATK.</li>
  </ul>

  <p><b>2nd Formation: Wings of Dawn (Blue)</b><br>
  Your second strongest troop:</p>
  <ul>
    <li>Improve this formation with the <b>Dawn Tower</b> building.</li>
  </ul>

  <p><b>3rd Formation: Guardian (Yellow)</b><br>
  Your third troop:</p>
  <ul>
    <li>Improve this formation with the <b>Steel Factory</b> building.</li>
  </ul>

  <h3>🏗️ Faction Buildings - Improve your ATK</h3>
  
  <p>Each faction has an <b>exclusive building</b> that directly boosts that formation. <b>Upgrade these buildings in the order of your formations</b>:</p>
  
  <p><b>1. Toxic Mist Garden</b> (Blood Rose) → <span style="color:#4cd137">HIGH Priority</span><br>
  Improves your <b>1st formation</b> ATK. Emphasize upgrading this building first.</p>

  <p><b>2. Dawn Tower</b> (Wings of Dawn) → <span style="color:#fbc531">MEDIUM Priority</span><br>
  Improves your <b>2nd formation</b> power.</p>

  <p><b>3. Steel Factory</b> (Guardian) → <span style="color:#fbc531">MEDIUM Priority</span><br>
  Improves your <b>3rd formation</b> power.</p>

  <h3>💡 Correct Strategy</h3>
  
  <p><b>✅ DO:</b></p>
  <ul>
    <li>Focus resources on <b>5 Blood Rose heroes</b> for your 1st formation.</li>
    <li>Upgrade the <b>Toxic Mist Garden</b> first to boost your main troop.</li>
    <li>Keep formations <b>pure</b> (5 heroes of the same faction).</li>
  </ul>

  <p><b>❌ DON'T:</b></p>
  <ul>
    <li><b>Avoid mixing heroes from different factions</b> in the same troop (you lose the +115% buff).</li>
    <li>Don't upgrade all 3 buildings at the same time — prioritize by formation order.</li>
    <li>Don't invest in a 4th formation until the first 3 are complete.</li>
  </ul>

  <h3>📈 Recommended Progression</h3>
  
  <p><b>Phase 1:</b> Complete your <b>1st Blood Rose formation</b> + upgrade Toxic Mist Garden.<br>
  <b>Phase 2:</b> Complete your <b>2nd Wings of Dawn formation</b> + upgrade Dawn Tower.<br>
  <b>Phase 3:</b> Complete your <b>3rd Guardian formation</b> + upgrade Steel Factory.</p>

  <p><b>F2P Tip:</b> This strategy maximizes your attack power without spending money. The +115% buff is <b>huge</b> and makes a difference in PvP and events.</p>
`,
  
tip3: `
  <h2>🎯 Armor Rotation in Caravan</h2>
  <img src="../img-tip-caravana-1.jpg" alt="Caravana">
  
  <h3>🏛️ What is the Caravan?</h3>
  <p>The <b>Caravan</b> is a building where you face waves of zombies in <b>3 separate battlefields</b>:</p>
  <ul>
    <li>🔴 <b>Battlefield - Blood Rose</b></li>
    <li>🔵 <b>Battlefield - Wings of Dawn</b></li>
    <li>🟡 <b>Battlefield - Guardian of Order</b></li>
  </ul>
  
  <p>Each field has <b>progressive zombie waves</b> that get stronger. You advance until your formation can't anymore.</p>

  <h3>⚙️ Armor Rotation Strategy</h3>
  
  <p>Normally, your <b>best armors</b> (upgraded S and A rank) are equipped on your <b>1st formation (Blood Rose)</b>. Here's how to maximize your rewards:</p>

  <p><b>Step 1: Blood Rose Battlefield</b><br>
  Enter with your 1st formation with the best armors. Advance as far as you can and exit the field.</p>

  <p><b>Step 2: Transfer Armors to 2nd Formation</b><br>
  Remove S/A armors from your 1st formation and equip them on your 2nd formation (Wings of Dawn). This temporarily increases its power.</p>

  <p><b>Step 3: Wings of Dawn Battlefield</b><br>
  Enter with your now-boosted 2nd formation and advance as far as possible.</p>

  <p><b>Step 4: Transfer Armors to 3rd Formation</b><br>
  Repeat the process: remove armors from the 2nd formation and equip them on your 3rd formation (Guardian).</p>

  <p><b>Step 5: Guardian of Order Battlefield</b><br>
  Enter with your boosted 3rd formation and advance as far as possible.</p>

  <p><b>Step 6: Restore Armors</b><br>
  Once the Caravan is done, return the armors to your 1st formation. Everything goes back to normal.</p>

  <h3>💡 Why does this strategy work?</h3>
  
  <ul>
    <li>Your 2nd and 3rd formations are normally weaker.</li>
    <li>By transferring upgraded S/A armors, you temporarily increase their power.</li>
    <li>This lets you <b>advance more rounds</b> in each field = <b>better rewards</b>.</li>
    <li>It's a strategy <b>only for Caravan</b> — then you restore everything.</li>
  </ul>

  <h3>✅ Advantages and Considerations</h3>
  
  <p><b>Advantages:</b></p>
  <ul>
    <li>Maximize rewards in all 3 fields.</li>
    <li>No need to spend resources upgrading additional armors.</li>
    <li>100% F2P friendly strategy.</li>
  </ul>

  <p><b>Disadvantages:</b></p>
  <ul>
    <li>Takes time to transfer armors manually.</li>
    <li>You must remember to restore the armors afterwards.</li>
    <li>Doesn't work if you're in the middle of a PvP event.</li>
  </ul>

  <h3>🎯 Extra Tip</h3>
  
  <p>If your 1st formation has <b>S+10 armor</b> and your 2nd has <b>B+5 armor</b>, the temporary swap will make a <b>HUGE difference</b> in how many rounds you can advance.</p>

  <p><b>Best time:</b> When the Caravan resets (usually weekly) and you have time to dedicate to it.</p>

  <p><b>Don't forget:</b> When done, return armors to your 1st formation so it's ready for normal combat, events and PvP.</p>
`,

tip4: `
  <h2>🎮 Create Secondary Accounts (Farms)</h2>
  <img src="../img-tip-farm-1.jpg" alt="Cuenta Farm">
  
  <h3>What are Farm Accounts?</h3>
  <p>Additional characters you use to <b>generate extra resources</b> and send them to your main account via trade or alliance donations.</p>

  <h3>📱 Method 1: Dual Space (Recommended)</h3>
  <p><b>Step by step:</b></p>
  <ol>
    <li>Download the <b>Dual Space</b> app (Android/iOS)</li>
    <li>Install a second copy of the game inside Dual Space</li>
    <li>Complete the initial tutorial</li>
    <li>Go to <b>Profile → Account → Character Management</b></li>
    <li>Click <b>"Create New Character"</b></li>
    <li>Select your <b>current war zone/server</b></li>
  </ol>
  <img src="../img-tip-farm-2.jpg" alt="Dual Space">

  <h3>🚀 Method 2: Free Teleport</h3>
  <p><b>Take advantage of events with free TP (Saturdays):</b></p>
  <ol>
    <li>In <b>Server War</b> or <b>Alliance Versus</b>, teleport to another zone</li>
    <li>Go to <b>Profile → Account → Character Management</b></li>
    <li>Click <b>"Create New Character"</b></li>
    <li>Select your <b>original server</b></li>
  </ol>
  <p><b>Advantage:</b> No external apps needed, you use the free event TP.</p>

  <h3>💡 Tips for Efficient Farms</h3>
  <ul>
    <li><b>Join your own alliance</b> to facilitate donations</li>
    <li><b>Focus on production:</b> upgrade farms, sawmills and mines first</li>
    <li><b>Don't develop militarily</b> (resources only)</li>
    <li><b>Use cheap shields</b> to protect from attacks</li>
    <li><b>Keep power low</b> to avoid being targeted</li>
  </ul>

  <h3>⚠️ Importante</h3>
  <p>Check the game rules regarding multi-accounts. <b>Avoid using farms to manipulate rankings</b> or violate terms of service.</p>
`,

tip5: `
  <h2>💰 Optimize Resource Boxes</h2>
  <img src="../img-tip-cajas-1.jpg" alt="Cajas de recursos">
  
  <h3>📦 Types of Resource Boxes</h3>
  <p>When completing missions and events, you receive <b>resource boxes</b> of different qualities:</p>
  
  <ul>
    <li>🟦 <b>Blue Box</b> → Basic resources</li>
    <li>🟪 <b>Purple Box</b> → Medium resources</li>
    <li>🟨 <b>Golden/Yellow Box</b> → High resources</li>
  </ul>

  <h3>🔑 Secret: Boxes Scale with your Level</h3>
  
  <p><b>What few know:</b> The amount of resources you get from each box <b>increases based on your HQ level</b>.</p>

  <p>Ejemplo:</p>
  <ul>
    <li>A golden box at <b>level 15</b> can give you <b>50,000 food</b>.</li>
    <li>The <b>same box</b> at <b>level 27</b> can give you <b>500,000 food</b>.</li>
  </ul>

  <p>This means that <b>saving boxes and using them at high levels</b> gives you <b>much more value</b>.</p>

  <h3>📈 Recommended Strategy</h3>

  <p><b>Blue Boxes:</b><br>
  • Use them when you need them.<br>
  • Not worth saving much (low value).</p>

  <p><b>Purple Boxes:</b><br>
  • Save until <b>level 20-23</b>.<br>
  • Use them when you need resources for an important upgrade.</p>

  <p><b>Golden/Yellow Boxes:</b><br>
  • <b>SAVE THEM!</b> Don't use them at the start.<br>
  • Wait until <b>level 27+</b> (some wait until level 30+).<br>
  • At these levels, the resources they give are <b>MUCH greater</b>.</p>

  <h3>💡 Why does it work?</h3>

  <ul>
    <li>At low levels (1-20), upgrades require few resources.</li>
    <li>At high levels (27+), upgrades require <b>billions of resources</b>.</li>
    <li>If you use golden boxes at low level, <b>you waste their potential</b>.</li>
    <li>If you save them for high level, <b>you get 10x-20x more value</b>.</li>
  </ul>

  <h3>🎯 Practical Tip</h3>

  <p><b>Levels 1-15:</b><br>
  • Use only blue boxes.<br>
  • Save ALL purple and golden ones.</p>

  <p><b>Levels 16-23:</b><br>
  • Use blue boxes freely.<br>
  • Use purple boxes only if necessary.<br>
  • DO NOT touch the golden ones.</p>

  <p><b>Levels 24-26:</b><br>
  • Use blue and purple boxes as needed.<br>
  • Keep saving the golden ones.</p>

  <p><b>Level 27+:</b><br>
  • Now's the time! Use the golden boxes you saved.<br>
  • You'll see a <b>HUGE difference</b> in the amount of resources.</p>

  <h3>⚠️ Common Mistakes</h3>

  <p><b>❌ DON'T:</b></p>
  <ul>
    <li>Using golden boxes at level 10-15 "because I need resources now".</li>
    <li>Opening all boxes as soon as you receive them.</li>
    <li>Not having patience to save them.</li>
  </ul>

  <p><b>✅ DO:</b></p>
  <ul>
    <li>Accumulate golden boxes in your inventory.</li>
    <li>Manage resources with lower quality boxes.</li>
    <li>Be patient — the reward is worth it.</li>
  </ul>

  <h3>🔥 F2P Tip</h3>

  <p>This strategy is <b>KEY for F2P players</b>. At high levels, resources are the biggest bottleneck. Having a <b>bank of saved golden boxes</b> lets you make critical upgrades without spending real money.</p>

  <p><b>Real example:</b> A player who saved 50 golden boxes from level 10 to level 28, upon opening them all got <b>over 20 billion resources</b> — enough for several important upgrades.</p>

  <p><b>Remember:</b> Patience in this game is rewarded. Save those golden boxes! 💎</p>
`,

tip6: `
  <h2>🏛️ Official Server Positions: Free Buffs for Every Player</h2>

  <h3>📍 How to Access your Server Government?</h3>
  <p>Follow these steps to access the government interface:</p>
  <ol>
    <li>Click on <b>your profile</b> (your photo or name on screen).</li>
    <li>Below your alliance name you'll see your <b>Battle Zone</b> — click on that number.</li>
    <li>This takes you directly to the <b>server government interface</b>.</li>
    <li>Find the position that interests you based on the buff you need.</li>
    <li>If available or with a free queue, press <b>"Apply"</b>. Done!</li>
  </ol>

  <h3>⚠️ Requirements to Apply</h3>
  <ul>
    <li>Your <b>HQ must be level 26 or higher</b> (varies by current President).</li>
    <li>You can only hold <b>one position at a time</b>.</li>
    <li>The President defines <b>which positions are available</b> to apply for and their requirements.</li>
  </ul>

  <h3>⏱️ How Long Does the Position Last?</h3>
  <ul>
    <li>When applying, you receive the position for <b>at least 10 minutes</b>.</li>
    <li>If <b>no one else applies</b>, you keep it indefinitely.</li>
    <li>If there's a queue, when your time is up it passes to the next person.</li>
    <li>The President can <b>remove your position</b> at any time.</li>
    <li>There is a <b>queue of up to 50 applications</b> per position.</li>
  </ul>

  <h3>👑 Hierarchy and Buffs of Each Position</h3>
  <p>Choose the position based on your playstyle:</p>

  <p><b>👑 Presidente</b><br>
  • ATQ de Tropa <b>+15%</b><br>
  • DEF de Tropa <b>+15%</b><br>
  • Vida de Tropa <b>+5%</b><br>
  → <i>Only designated by the alliance that conquers the capital. Not applicable.</i></p>

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
  <h2>♻️ Recycle your Blue Skill Manuals</h2>

  <h3>📦 What are Skill Manuals?</h3>
  <p>Each hero has <b>4 skills</b> you can upgrade using Skill Manuals. These manuals come in <b>3 ranks</b> based on the hero rank:</p>
  <ul>
    <li>🔵 <b>Blue Manual</b> → For Rank B heroes</li>
    <li>🟣 <b>Purple Manual</b> → For Rank A heroes</li>
    <li>🟠 <b>Orange Manual</b> → For Rank S heroes</li>
  </ul>
  <p>Each rank has its own manuals — <b>they do not interfere with each other</b>.</p>

  <h3>❓ What happens when you no longer need them?</h3>
  <p>Over time, all your <b>Rank B heroes</b> will have all 4 skills maxed. From that point on, Blue Manuals accumulate in your inventory <b>with no use</b>.</p>

  <h3>✅ La Solución: Reciclarlos</h3>
  <p><b>Step 1:</b> Go to your <b>Warehouse → Hero tab</b>.</p>
  <p><b>Step 2:</b> Find the <b>Blue Skill Manuals</b>.</p>
  <p><b>Step 3: If all your Rank B heroes have maxed skills, you will see the <b>"Recycle"</b> option.</p>
  <p><b>Step 4: Select the amount and recycle. Each blue manual becomes a <b>Random Basic Resource Box</b>.</p>

  <h3>🎁 What do the Boxes give?</h3>
  <p>Each box can randomly give you:</p>
  <ul>
    <li>1k Wood</li>
    <li>1k Electricity</li>
    <li>1k Food</li>
    <li>600 Z Coins</li>
    <li>💎 <b>Diamonds</b></li>
    <li>⭐ <b>Rank S Hero Fragments</b></li>
  </ul>

  <h3>💡 Key Tip</h3>
  <div style="background: rgba(196, 30, 58, 0.15); padding: 1rem; border-left: 4px solid var(--acento); margin: 1rem 0; border-radius: 4px;">
    <p>💎 <strong>Open boxes in batches of 1,000.</strong> The more you open at once, the higher your chances of getting <b>Diamonds or Rank S Hero Fragments</b>. Don't open them one by one.</p>
  </div>

  <h3>🎯 Summary</h3>
  <ul>
    <li>Rank B heroes with maxed skills → Blue manuals are useless</li>
    <li>Ve a <b>Almacén → Héroe → Reciclar</b></li>
    <li>Convert manuals into resource boxes</li>
    <li>Open boxes in <b>batches of 1,000</b> for better rewards</li>
  </ul>

  <p style="color:#555; font-size:0.8rem; margin-top:1.5rem; border-top:1px solid #222; padding-top:0.75rem;">
    💡 Tip contributed by <strong style="color:#c41e3a;">@Daff21</strong> — Thank you for sharing with the community!
  </p>
`,

tip9: `
  <h2>⚕️ Efficient Healing with Alliance Help</h2>
  <img src="../img-tip-curacion-1.jpg" alt="Hospital">
  
  <h3>❌ Common Mistake</h3>
  <p>After a battle or event, many players have wounded troops in the Hospital and do this:</p>
  
  <ul>
    <li>Select <b>"Heal all"</b> (all wounded troops at once)</li>
    <li>The healing time is <b>very long</b></li>
    <li>They end up spending <b>speedups</b> to finish quickly</li>
  </ul>

  <p>This wastes speedups you could use in emergency situations.</p>

  <h3>✅ The Correct Strategy: Heal in Batches</h3>
  
  <p><b>Step 1:</b> At the Hospital, <b>do NOT select "Heal all"</b>.</p>
  
  <p><b>Step 2:</b> Check <b>how many alliance members are active</b> (online).</p>
  
  <p><b>Step 3:</b> Select a <b>small batch of wounded troops</b>. The amount depends on how many active members are in your alliance:
  <ul>
    <li>Many active members = you can select a larger batch</li>
    <li>Few active members = select a smaller batch</li>
  </ul>
  </p>
  
  <p><b>Step 4:</b> Click <b>"Heal"</b>.</p>
  
  <p><b>Step 5:</b> <b>Wait for your alliance to help</b>. Each help reduces healing time. If the batch is appropriate, the alliance can help you <b>heal the ENTIRE batch</b>.</p>
  
  <p><b>Step 6:</b> Observe how quickly it heals:</p>
  <ul>
    <li><b>If it heals fast</b> (many members helping) → you can heal a bit more in the next batch</li>
    <li><b>If it takes long to heal</b> → reduce the number of soldiers</li>
  </ul>
  
  <p><b>Step 7:</b> <b>Repeat the process</b> until all your wounded are healed.</p>

  <h3>💡 Why does it work?</h3>
  
  <p>When you heal <b>small batches</b>, the healing time is short. Your alliance can help and <b>considerably reduce that time</b>. This lets you:</p>
  
  <ul>
    <li>Heal troops <b>without spending speedups</b></li>
    <li>Take full advantage of your <b>alliance help</b></li>
    <li>Have your troops ready faster without spending valuable resources</li>
  </ul>

  <h3>🎯 Best Time to Use This Strategy</h3>
  
  <p><b>After events like "The Tyrant":</b></p>
  <ul>
    <li>Many alliance members are <b>connected and active</b></li>
    <li>They can help you <b>immediately</b></li>
    <li>You can heal all your troops faster without spending anything</li>
  </ul>

  <img src="../img-tip-curacion-2.jpg" alt="Miembros en línea">

  <h3>🔑 Key Factor: Active Members</h3>
  
  <p>The batch size you can efficiently heal depends directly on <b>how many alliance members are active</b> at that moment.</p>
  
  <p><b>More members online</b> = More helps = You can heal larger batches</p>
  <p><b>Fewer members online</b> = Fewer helps = Heal smaller batches</p>

  <h3>⚠️ Important Tips</h3>
  
  <p><b>✅ DO:</b></p>
  <ul>
    <li>Heal after events when many members are active</li>
    <li>Adjust the amount based on how quickly you receive help</li>
    <li>Be patient — you'll save many speedups in the long run</li>
    <li>Check the "Online" members list before starting</li>
  </ul>

  <p><b>❌ DON'T:</b></p>
  <ul>
    <li>Heal everything at once if you're not in a hurry</li>
    <li>Use speedups if you can wait</li>
    <li>Ignore your alliance help — it's there for a reason!</li>
    <li>Select very large batches when few members are active</li>
  </ul>

  <h3>📝 Important Note</h3>
  
  <p>The healing time and the number of troops you can efficiently heal also depend on:</p>
  <ul>
    <li>Your <b>alliance research</b></li>
    <li>Your <b>refugees</b></li>
    <li>Other game factors</li>
  </ul>
  
  <p>That's why it's important to <b>dynamically adjust</b> batch sizes based on how quickly they heal.</p>

  <h3>🔥 Consejo Final</h3>
  
  <p>Speedups are valuable. Use them only when you really need them. For healing, your alliance help is enough if you have patience and select appropriate batches. 💚</p>
`,

tip10: `
  <h2>🤝 Fast Donation in Alliance Technologies</h2>
  <img src="../img-tip-donacion-1.jpg" alt="Tecnologías de alianza">
  
  <h3>❌ What Many Players Do</h3>
  <p>When donating to <b>Alliance Technologies</b>, most players click repeatedly on the "Donate" button, donating <b>one at a time</b>. This is slow and inefficient.</p>

  <h3>✅ The Trick: Hold Down</h3>
  
  <p>Instead of individual clicks, <b>hold down the donate button</b>. This will activate <b>automatic multipliers</b>:</p>
  <ul>
    <li>🔥 <b>x2</b> - Donate double</li>
    <li>🔥 <b>x5</b> - Donate 5x more</li>
    <li>🔥 <b>x10</b> - Donate 10x more</li>
  </ul>

  <img src="../img-tip-donacion-2.jpg" alt="Multiplicadores activados">

  <h3>💡 Why It Works</h3>
  
  <ul>
    <li><b>Saves time:</b> No need to make hundreds of clicks.</li>
    <li><b>Your alliance advances faster:</b> More donations complete technologies sooner.</li>
    <li><b>You get more points:</b> Accumulate contribution points to buy items at the Alliance Store.</li>
    <li><b>Better use of your attempts:</b> Attempts are limited, multipliers make them worth more.</li>
  </ul>
  
  <p><b>F2P Tip:</b> Use coin donation and hold down the same way to activate multipliers.</p>

  <h3>⚠️ Consejos</h3>
  
  <p><b>✅ DO:</b></p>
  <ul>
    <li>Hold down to activate multipliers</li>
    <li>Donate daily before attempts reset</li>
    <li>Prioritize technologies that benefit the whole alliance</li>
  </ul>

  <p><b>❌ DON'T:</b></p>
  <ul>
    <li>Make individual clicks wasting time</li>
    <li>Forget to donate — you lose valuable points for the Alliance Store</li>
  </ul>

  <h3>🔥 Consejo Extra</h3>
  
  <p>The contribution points you earn are used in the <b>Alliance Store</b> to buy speedups, resources, hero fragments and more. The more you donate, the more you can buy!</p>

  <p><b>Remember:</b> Hold down = Multipliers activated = More efficiency for you and your alliance. 🚀</p>
`,

tip11: `
  <h2>⚔️ Automatic Troop Return</h2>
  <img src="../img-tip-regreso-1.png" alt="Opciones de ataque">
  
  <h3>❌ Common Problem</h3>
  <p>Many players attack targets <b>(HQs, etc.)</b> and after winning, their troops <b>stay at the target</b>. This means you have to:</p>
  
  <ul>
    <li>Remember that your troops are outside</li>
    <li>Go to the map and find where they ended up</li>
    <li>Return troops <b>manually</b> every time</li>
  </ul>

  <p>This is tedious and easy to forget, especially if you attack multiple targets.</p>

  <h3>✅ The Solution: Auto Return</h3>
  
  <p>There's an option that makes your troops <b>return automatically</b> after completing the attack. Here's how to activate it:</p>

  <p><b>Step 1:</b> Click on the target you want to attack (enemy HQ, zombie, etc.).</p>
  
  <p><b>Step 2:</b> 3 options will appear:</p>
  <ul>
    <li>🔍 <b>Scout</b></li>
    <li>👥 <b>Team</b></li>
    <li>⚔️ <b>Attack</b></li>
  </ul>
  
  <p><b>Step 3:</b> Click on <b>"Attack"</b>.</p>
  
  <p><b>Step 4:</b> In the attack panel, <b>look below</b> for the checkbox that says <b>"Auto Return"</b>.</p>
  
  <p><b>Step 5:</b> <b>Make sure it's checked</b> (with a green ✓ check).</p>

  <img src="../img-tip-regreso-2.png" alt="Regreso automático activado">
  
  <p><b>Step 6:</b> Click <b>"March"</b> to send your attack.</p>

  <h3>💡 What Happens Now?</h3>
  
  <p>Once you activate auto return:</p>
  
  <ul>
    <li>Your troops will go to the target</li>
    <li>They will complete combat</li>
    <li>They will <b>automatically return</b> to your HQ without you having to do anything</li>
  </ul>
  
  <p>You'll see a message that says: <b>"Auto return enabled. Troops will automatically return to HQ after completing the current command."</b></p>

  <h3>🎯 Ventajas</h3>
  
  <ul>
    <li><b>Saves time:</b> You don't have to return troops manually</li>
    <li><b>Avoids forgetting:</b> No troops left abandoned on the map</li>
    <li><b>More efficient:</b> Ideal when farming multiple targets in a row</li>
    <li><b>Safe troops:</b> They return immediately, reducing the risk of being attacked outside</li>
  </ul>

  <h3>⚠️ Important Tips</h3>
  
  <p><b>✅ DO:</b></p>
  <ul>
    <li>Enable auto return <b>ALWAYS</b> when attacking targets</li>
    <li>Verify the checkbox is marked before clicking "March"</li>
    <li>Use this option especially when farming resources</li>
  </ul>

  <p><b>❌ DON'T:</b></p>
  <ul>
    <li>Forgetting to enable auto return — your troops will stay outside</li>
    <li>Assuming it's activated by default — always verify</li>
  </ul>

  <h3>🔥 Consejo Extra</h3>
  
  <p>If you're farming multiple targets, auto return is <b>essential</b>. This way you can send attacks one after another without worrying about returning troops manually between each one.</p>

  <p><b>Remember:</b> Check the "Auto Return" checkbox before each attack. This simple step will save you a lot of time and headaches. ⚔️</p>
`,

tip12: `
    <h2>⚡ Quick Reinforcement</h2>
    <img src="../img-tip-refuerzo-1.jpg" alt="Refuerzo">
    <p>If there's an <b>alliance treasure</b> a bit far away, you can get there faster by <b>reinforcing allied cities or bases</b>.</p>
    <p><b>How does it work?</b></p>
    <ul>
      <li>Only works <b>within your alliance territory</b>.</li>
      <li>Reinforcement speed is <b>3x faster</b> than normal movement.</li>
      <li>Ideal for quickly reaching <b>alliance events</b> or <b>rally points</b>.</li>
    </ul>
    <p><b>Tip:</b> Use this mechanic to arrive first at treasures and get better rewards.</p>
  `,
  
tip13: `
  <h2>🔍 Locate Scouted Bases</h2>
  <img src="../img-tip-reconocimiento-1.jpg" alt="Informe de reconocimiento">
  
  <h3>❌ The Problem</h3>
  <p>You receive or see a <b>shared scout report</b> in your alliance chat. You can see the enemy's resources and troops, but... <b>where is that base on the map?</b></p>
  
  <p>Many players waste time searching manually on the map or asking "where is X:324 Y:772?".</p>

  <h3>✅ The Solution (The Trick)</h3>
  
  <p><b>Step 1:</b> Open the scout report (from your mail or shared chat).</p>
  
  <p><b>Step 2:</b> Below the scouted player's name, you'll see the <b>coordinates</b> (example: <b>X:324 Y:772</b>).</p>
  
  <p><b>Step 3:</b> <b>Click directly on those coordinates</b>.</p>
  
  <p><b>Result:</b> The map will automatically move and take you <b>directly to the exact location</b> of that base. No more manual searches!</p>

  <h3>💡 Why is it useful?</h3>
  
  <ul>
    <li><b>Coordinate alliance attacks:</b> Everyone can reach the target quickly.</li>
    <li><b>Check distance:</b> Know if it's worth attacking based on how far it is.</li>
    <li><b>Find easy targets:</b> Locate weak bases quickly.</li>
    <li><b>Save time:</b> Don't waste minutes searching for coordinates on the map.</li>
  </ul>

  <h3>🎯 Extra Tip</h3>
  
  <p>If your alliance frequently shares scout reports, this trick will make your life <b>much easier</b>. Simply:</p>
  
  <ul>
    <li>Open the shared report in chat</li>
    <li>Click on the coordinates</li>
    <li>Evaluate if it's worth attacking</li>
  </ul>

  <p><b>Remember:</b> Coordinates are clickable in any scout report, whether from mail or shared in chats. Always use it!</p>
`,

};

function openTipModal(tipId) {
  document.getElementById('tipModal').style.display = 'block';
  document.getElementById('tipModalBody').innerHTML = tipContent[tipId] || '<p>Content not available</p>';
  document.body.style.overflow = 'hidden';
}

function closeTipModal() {
  document.getElementById('tipModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('tipModal');
  if (event.target == modal) {
    closeTipModal();
  }
}

// Close with ESC key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeTipModal();
  }
});