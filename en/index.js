// ===========================
// MAIN CAROUSEL
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
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => { goToSlide(i); onUserInteraction(); });
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  document.querySelectorAll('.carrusel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === (index % originalCount));
  });
}

// ── Go to specific slide ─────────────────────────────
function goToSlide(i) {
  const vis = getVisibleItems();
  index = Math.max(0, Math.min(i, originalCount - 1));
  carrusel.style.transition = 'transform 0.5s ease';
  carrusel.style.transform  = `translateX(-${index * (100 / vis)}%)`;
  updateDots();
}

// ── Move forward / backward ──────────────────────────
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

function onUserInteraction() {
  userPaused = true;
  clearInterval(autoPlay);
  clearTimeout(resumeTimer);
  resumeTimer = setTimeout(() => {
    userPaused = false;
    startAutoPlay();
  }, 5000);
}

// ── Buttons ← → ──────────────────────────────────────
btnPrev?.addEventListener('click', () => { moveCarrusel(-1); onUserInteraction(); });
btnNext?.addEventListener('click', () => { moveCarrusel(1);  onUserInteraction(); });

// ── Touch swipe ──────────────────────────────────────
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

// ── Start ─────────────────────────────────────────────
setupCarrusel();
startAutoPlay();

// ===========================
// INTERNAL TIP CAROUSELS
// ===========================

document.querySelectorAll('.tip-carousel').forEach(carousel => {
  const imgs = carousel.querySelectorAll('img');
  let index = 0;

  setInterval(() => {
    imgs[index].classList.remove('active');
    index = (index + 1) % imgs.length;
    imgs[index].classList.add('active');
  }, 3000);
});

// ===========================
// TIPS MODAL
// ===========================

const tipContent = {

tip1: `
  <h2>🏕️ Best Refugees to Recruit</h2>
  <img src="../img-tip-refugiados-1.jpg" alt="Refugees">
  
  <h3>🎯 The 2 Most Important Refugees</h3>
  <p>In Last Z, refugees grant you <b>permanent passive abilities</b> that improve your progress. However, <b>NOT all refugees are equally useful</b>.</p>
  
  <p>These are the <b>2 refugees you MUST prioritize</b> getting:</p>

  <h3>🏗️ #1 — Steward</h3>
  
  <div class="refugiado-box" style="background: rgba(196, 30, 58, 0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
    <p><b>Main Ability:</b> Construction Speed</p>
    <p><b>Bonus:</b> Free acceleration time</p>
  </div>
  
  <p><b>Why is it the best?</b></p>
  <ul>
    <li><b>Drastically reduces</b> building construction time</li>
    <li>Construction is the <b>biggest bottleneck</b> in the game</li>
    <li>Gives you additional <b>free acceleration time</b> when building</li>
    <li>Useful throughout <b>your entire progression</b>, from level 1 to endgame</li>
    <li>Saves you <b>days or weeks</b> of accumulated waiting</li>
  </ul>

  <img src="../img-tip-refugiados-2.jpg" alt="Steward">

  <h3>🤝 #2 — Diplomat</h3>
  
  <div class="refugiado-box" style="background: rgba(88, 137, 232, 0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
    <p><b>Main Ability:</b> Alliance Help Limit</p>
    <p><b>Bonus:</b> Time reduced per help</p>
  </div>
  
  <p><b>Why is it the best?</b></p>
  <ul>
    <li>Increases <b>how many helps you can receive</b> from your alliance</li>
    <li>Each help <b>reduces more time</b> on constructions/research</li>
    <li>Combines perfectly with the <b>Steward</b></li>
    <li>In active alliances, you can <b>complete constructions almost instantly</b></li>
    <li>Works for <b>buildings, research, and healing</b></li>
  </ul>

  <h3>💡 Why are these 2 the best?</h3>
  
  <p>The combination of <b>Steward + Diplomat</b> creates a powerful synergy:</p>
  
  <ol>
    <li><b>Steward</b> reduces the base construction time</li>
    <li><b>Diplomat</b> lets you receive more helps</li>
    <li>Each help reduces <b>even more time</b> thanks to the Diplomat</li>
    <li>Result: Constructions that would take days complete in <b>hours or minutes</b></li>
  </ol>

  <h3>🌟 About Rarities</h3>
  
  <p>Both Steward and Diplomat come in <b>different rarities</b>:</p>
  
  <ul>
    <li>🟢 <b>Green</b> (Common) — Basic bonuses</li>
    <li>🔵 <b>Blue</b> (Rare) — Improved bonuses</li>
    <li>🟣 <b>Purple</b> (Epic) — High bonuses</li>
    <li>🟠 <b>Orange</b> (Legendary) — Maximum bonuses</li>
  </ul>
  
  <p><b>Important:</b> Even a <b>green</b> Steward or Diplomat is better than other refugees of higher rarity. Prioritize <b>the refugee type</b> over the rarity.</p>

  <h3>⚠️ Other Refugees</h3>
  
  <p>There are many other refugees in the game, but most have <b>far less impactful</b> abilities:</p>
  
  <ul>
    <li>Resource production bonuses (you get resources easily through other means)</li>
    <li>Troop training bonuses (useful but not critical)</li>
    <li>Attack/defense bonuses (marginal compared to heroes and equipment)</li>
  </ul>
  
  <p>None of these compare to the <b>massive impact</b> that Steward and Diplomat have on your progression speed.</p>

  <h3>🎯 Recruitment Strategy</h3>
  
  <p><b>Priority 1:</b> Get a <b>Steward</b> as soon as possible.</p>
  <p><b>Priority 2:</b> Get a <b>Diplomat</b> afterward.</p>
  <p><b>Priority 3:</b> Upgrade the rarity of both when you can.</p>
  
  <div class="club-tip destacado" style="background: rgba(196, 30, 58, 0.15); padding: 1rem; border-left: 4px solid var(--acento); margin: 1.5rem 0; border-radius: 4px;">
    <p>💎 <strong>F2P Tip:</strong> It's worth spending diamonds or coupons to get these 2 refugees. They are one of the <b>best investments</b> you can make in the game, even surpassing many heroes.</p>
  </div>

  <h3>🏢 How to Get Refugees?</h3>
  
  <p>Refugees are recruited at the <a href="../buildings.html#club-refugiados" class="edificio-link" style="color: var(--acento); background: rgba(196, 30, 58, 0.1); padding: 0.3rem 0.8rem; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">🏢 Club</a> using <b>Refugee Coupons</b> or <b>Diamonds</b>.</p>
  
  <p><b>Recruitment costs:</b></p>
  <ul>
    <li>1st Refugee: 500 coupons/diamonds</li>
    <li>2nd Refugee: 2,000 coupons/diamonds</li>
    <li>3rd Refugee: 5,000 coupons/diamonds</li>
  </ul>
  
  <p>Available refugees <b>change every 12 hours</b>, and you can use a <b>free refresh</b> after each recruitment to change the available options.</p>
  
  <p>📖 <b>For more details on the recruitment system, costs, and optimal strategies, visit the</b> <a href="../buildings.html#club-refugiados" class="edificio-link" style="color: var(--acento); background: rgba(196, 30, 58, 0.1); padding: 0.3rem 0.8rem; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">🏢 Club — Refugees</a> section.</p>

  <h3>🔥 Conclusion</h3>
  
  <p><b>Steward and Diplomat</b> are the most important refugees in the game. Their impact on your progression speed is <b>unmatched</b>. Get them as soon as possible and you'll notice a huge difference in how quickly you advance. 🚀</p>
`,    

tip2: `
  <h2>⚔️ Improve Your Formation Attack</h2>
  <img src="../img-tip-ataque1.jpg" alt="Formations">
  
  <p>In Last Z there are <b>3 hero factions</b>: <span style="color:#ff4757">🔴 Bloody Rose</span>, <span style="color:#5889e8">🔵 Dawn Wings</span> and <span style="color:#f1c40f">🟡 Guardian</span>.</p>
  
  <p>The maximum heroes per formation is <b>5</b>. By aligning <b>5 heroes of the same faction</b>, you gain <b>Troop ATK +115%</b>.</p>

  <h3>🎯 Recommended Formation Order</h3>
  
  <p><b>1st Formation: Bloody Rose (Red)</b><br>
  This should be your <b>main formation</b> because:</p>
  <ul>
    <li>You get heroes of this faction <b>more easily</b> at the start of the game.</li>
    <li>It has the <b>Toxic Mist Garden</b> building that directly improves this troop's ATK.</li>
  </ul>

  <p><b>2nd Formation: Dawn Wings (Blue)</b><br>
  Your second strongest troop:</p>
  <ul>
    <li>Improve this formation with the <b>Dawn Tower</b> building.</li>
  </ul>

  <p><b>3rd Formation: Guardian (Yellow)</b><br>
  Your third troop:</p>
  <ul>
    <li>Improve this formation with the <b>Steel Factory</b> building.</li>
  </ul>

  <h3>🏗️ Faction Buildings — Boost Your ATK</h3>
  
  <p>Each faction has an <b>exclusive building</b> that directly powers that formation. <b>Upgrade these buildings in the order of your formations</b>:</p>
  
  <p><b>1. Toxic Mist Garden</b> (Bloody Rose) → <span style="color:#4cd137">HIGH Priority</span><br>
  Boosts your <b>1st formation</b> ATK. Focus on upgrading this building first.</p>

  <p><b>2. Dawn Tower</b> (Dawn Wings) → <span style="color:#fbc531">MEDIUM Priority</span><br>
  Boosts the power of your <b>2nd formation</b>.</p>

  <p><b>3. Steel Factory</b> (Guardian) → <span style="color:#fbc531">MEDIUM Priority</span><br>
  Boosts the power of your <b>3rd formation</b>.</p>

  <h3>💡 Correct Strategy</h3>
  
  <p><b>✅ DO:</b></p>
  <ul>
    <li>Focus resources on <b>5 Bloody Rose heroes</b> for your 1st formation.</li>
    <li>Upgrade the <b>Toxic Mist Garden</b> first to power your main troop.</li>
    <li>Keep formations <b>pure</b> (5 heroes of the same faction).</li>
  </ul>

  <p><b>❌ DON'T:</b></p>
  <ul>
    <li><b>Avoid mixing heroes from different factions</b> in the same troop (you lose the +115% buff).</li>
    <li>Don't upgrade all 3 buildings at the same time — prioritize according to your formation order.</li>
    <li>Don't invest in a 4th formation until the first 3 are complete.</li>
  </ul>

  <h3>📈 Recommended Progression</h3>
  
  <p><b>Phase 1:</b> Complete your <b>1st Bloody Rose formation</b> + upgrade Toxic Mist Garden.<br>
  <b>Phase 2:</b> Complete your <b>2nd Dawn Wings formation</b> + upgrade Dawn Tower.<br>
  <b>Phase 3:</b> Complete your <b>3rd Guardian formation</b> + upgrade Steel Factory.</p>

  <p><b>F2P Tip:</b> This strategy maximizes your attack power without spending money. The +115% buff is <b>huge</b> and makes a real difference in PvP and events.</p>
`,

tip3: `
  <h2>🎯 Armor Rotation in the Caravan</h2>
  <img src="../img-tip-caravana-1.jpg" alt="Caravan">
  
  <h3>🏛️ What is the Caravan?</h3>
  <p>The <b>Caravan</b> is a building where you face waves of zombies across <b>3 separate battlefields</b>:</p>
  <ul>
    <li>🔴 <b>Battlefield — Blood Rose</b></li>
    <li>🔵 <b>Battlefield — Dawn Wings</b></li>
    <li>🟡 <b>Battlefield — Order Guardian</b></li>
  </ul>
  
  <p>Each battlefield has <b>progressive zombie waves</b> that grow stronger. You advance until your formation can no longer continue.</p>

  <h3>⚙️ Armor Rotation Strategy</h3>
  
  <p>Normally, your <b>best armors</b> (upgraded S and A rank) are equipped on your <b>1st formation (Bloody Rose)</b>. Here's how to maximize your rewards:</p>

  <p><b>Step 1: Blood Rose Battlefield</b><br>
  Enter with your 1st formation wearing the best armors. Advance as far as you can and exit the field.</p>

  <p><b>Step 2: Transfer Armors to 2nd Formation</b><br>
  Remove the S/A armors from your 1st formation and equip them on your 2nd formation (Dawn Wings). This temporarily increases its power.</p>

  <p><b>Step 3: Dawn Wings Battlefield</b><br>
  Enter with your now-powered 2nd formation and advance as far as possible.</p>

  <p><b>Step 4: Transfer Armors to 3rd Formation</b><br>
  Repeat the process: remove armors from the 2nd formation and equip them on your 3rd formation (Guardian).</p>

  <p><b>Step 5: Order Guardian Battlefield</b><br>
  Enter with your powered 3rd formation and advance as far as possible.</p>

  <p><b>Step 6: Restore Armors</b><br>
  Once the Caravan is done, return the armors to your 1st formation. Everything goes back to normal.</p>

  <h3>💡 Why does this strategy work?</h3>
  
  <ul>
    <li>Your 2nd and 3rd formations are normally weaker.</li>
    <li>By transferring upgraded S/A armors, you temporarily increase their power.</li>
    <li>This lets you <b>advance more rounds</b> in each field = <b>better rewards</b>.</li>
    <li>It's a <b>Caravan-only strategy</b> — restore everything afterward.</li>
  </ul>

  <h3>✅ Pros and Cons</h3>

  <p><b>Advantages:</b></p>
  <ul>
    <li>Maximize rewards across all 3 fields.</li>
    <li>No need to spend resources upgrading additional armors.</li>
    <li>100% F2P friendly strategy.</li>
  </ul>

  <p><b>Disadvantages:</b></p>
  <ul>
    <li>Takes time to manually transfer armors.</li>
    <li>You must remember to restore armors afterward.</li>
    <li>Doesn't work if you're in the middle of a PvP event.</li>
  </ul>

  <h3>🎯 Extra Tip</h3>
  
  <p>If your 1st formation has <b>S+10 armor</b> and your 2nd has <b>B+5 armor</b>, the temporary swap will make a <b>HUGE difference</b> in how many rounds you can advance.</p>

  <p><b>Best timing:</b> When the Caravan resets (usually weekly) and you have time to dedicate to it.</p>

  <p><b>Don't forget:</b> When you're done, return the armors to your 1st formation so it's ready for normal combat, events, and PvP.</p>
`,

tip4: `
  <h2>🎮 Creating Secondary Accounts (Farms)</h2>
  <img src="../img-tip-farm-1.jpg" alt="Farm Account">
  
  <h3>What are Farm Accounts?</h3>
  <p>Additional characters you use to <b>generate extra resources</b> and send them to your main account through trading or alliance donations.</p>

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
    <li>During <b>Server Wars</b> or <b>Alliance Versus</b>, teleport to another zone</li>
    <li>Go to <b>Profile → Account → Character Management</b></li>
    <li>Click <b>"Create New Character"</b></li>
    <li>Select your <b>original server</b></li>
  </ol>
  <p><b>Advantage:</b> No external apps needed, use the event's free TP.</p>

  <h3>💡 Tips for Efficient Farms</h3>
  <ul>
    <li><b>Join your own alliance</b> to make donations easier</li>
    <li><b>Focus on production:</b> upgrade farms, sawmills, and mines first</li>
    <li><b>Don't develop militarily</b> (resources only)</li>
    <li><b>Use cheap shields</b> to protect from attacks</li>
    <li><b>Keep power low</b> to avoid being a target</li>
  </ul>

  <h3>⚠️ Important</h3>
  <p>Check the game's rules on multi-accounts. <b>Avoid using farms to manipulate rankings</b> or violate terms of service.</p>
`,

tip5: `
  <h2>💰 Optimizing Resource Boxes</h2>
  <img src="../img-tip-cajas-1.jpg" alt="Resource boxes">
  
  <h3>📦 Types of Resource Boxes</h3>
  <p>When completing missions and events, you receive <b>resource boxes</b> of different qualities:</p>
  
  <ul>
    <li>🟦 <b>Blue Box</b> → Basic resources</li>
    <li>🟪 <b>Purple Box</b> → Medium resources</li>
    <li>🟨 <b>Gold/Yellow Box</b> → High resources</li>
  </ul>

  <h3>🔑 Secret: Boxes Scale with Your Level</h3>
  
  <p><b>What few players know:</b> The amount of resources you get from each box <b>increases based on your HQ level</b>.</p>

  <p>Example:</p>
  <ul>
    <li>A gold box at <b>level 15</b> might give you <b>50,000 food</b>.</li>
    <li>The <b>same box</b> at <b>level 27</b> might give you <b>500,000 food</b>.</li>
  </ul>

  <p>This means that <b>saving boxes and using them at higher levels</b> gives you <b>much more value</b>.</p>

  <h3>📈 Recommended Strategy</h3>

  <p><b>Blue Boxes:</b><br>
  • Use them when needed.<br>
  • Not worth saving much (low value).</p>

  <p><b>Purple Boxes:</b><br>
  • Save them until <b>level 20–23</b>.<br>
  • Use when you need resources for an important upgrade.</p>

  <p><b>Gold/Yellow Boxes:</b><br>
  • <b>SAVE THEM!</b> Don't use at the start.<br>
  • Wait until <b>level 27+</b> (some wait until level 30+).<br>
  • At these levels, the resources they provide are <b>MUCH greater</b>.</p>

  <h3>💡 Why does this work?</h3>

  <ul>
    <li>At low levels (1–20), upgrades require few resources.</li>
    <li>At high levels (27+), upgrades require <b>billions of resources</b>.</li>
    <li>If you use gold boxes at a low level, you <b>waste their potential</b>.</li>
    <li>If you save them for high levels, you get <b>10x–20x more value</b>.</li>
  </ul>

  <h3>🎯 Practical Guide</h3>

  <p><b>Levels 1–15:</b><br>
  • Use only blue boxes.<br>
  • Save ALL purple and gold boxes.</p>

  <p><b>Levels 16–23:</b><br>
  • Use blue boxes freely.<br>
  • Use purple boxes only if necessary.<br>
  • DON'T touch the gold ones.</p>

  <p><b>Levels 24–26:</b><br>
  • Use blue and purple boxes as needed.<br>
  • Keep saving the gold ones.</p>

  <p><b>Level 27+:</b><br>
  • Now's the time! Use the gold boxes you saved.<br>
  • You'll see a <b>HUGE difference</b> in the amount of resources.</p>

  <h3>⚠️ Common Mistakes</h3>

  <p><b>❌ DON'T:</b></p>
  <ul>
    <li>Use gold boxes at level 10–15 "because I need resources now".</li>
    <li>Open all boxes as soon as you get them.</li>
    <li>Lack the patience to save them.</li>
  </ul>

  <p><b>✅ DO:</b></p>
  <ul>
    <li>Stockpile gold boxes in your inventory.</li>
    <li>Manage resources using lower-quality boxes.</li>
    <li>Be patient — the reward is worth it.</li>
  </ul>

  <h3>🔥 F2P Tip</h3>

  <p>This strategy is <b>KEY for F2P players</b>. At high levels, resources are the biggest bottleneck. Having a <b>stockpile of saved gold boxes</b> lets you make critical upgrades without spending real money.</p>

  <p><b>Real example:</b> A player who saved 50 gold boxes from level 10 to level 28, upon opening them all, obtained <b>over 20 billion resources</b> — enough for several major upgrades.</p>

  <p><b>Remember:</b> Patience is rewarded in this game. Save those gold boxes! 💎</p>
`,

tip6: `
  <h2>🏛️ Server Official Positions: Free Buffs for Every Player</h2>

  <h3>📍 How to Access Your Server Government</h3>
  <p>Follow these steps to access the government interface:</p>
  <ol>
    <li>Click on <b>your profile</b> (your photo or name on screen).</li>
    <li>Below your alliance name you'll see your <b>Battle Zone</b> — click on that number.</li>
    <li>This takes you directly to the <b>server government interface</b>.</li>
    <li>Find the position you're interested in based on the buff you need.</li>
    <li>If it's available or has an open queue, press <b>"Apply"</b>. Done!</li>
  </ol>

  <h3>⚠️ Requirements to Apply</h3>
  <ul>
    <li>Your <b>HQ must be level 26 or higher</b> (may vary depending on the current President).</li>
    <li>You can only hold <b>one position at a time</b>.</li>
    <li>The President defines <b>which positions are available</b> to apply for and their requirements.</li>
  </ul>

  <h3>⏱️ How Long Does the Position Last?</h3>
  <ul>
    <li>When you apply, you receive the position for <b>at least 10 minutes</b>.</li>
    <li>If <b>no one else applies</b>, you keep it indefinitely.</li>
    <li>If there's a waiting queue, it passes to the next person when your time is up.</li>
    <li>The President can <b>remove your position</b> at any time.</li>
    <li>There's a <b>queue of up to 50 requests</b> per position.</li>
  </ul>

  <h3>👑 Hierarchy and Buffs for Each Position</h3>
  <p>Choose a position based on your playstyle:</p>

  <p><b>👑 President</b><br>
  • Troop ATK <b>+15%</b><br>
  • Troop DEF <b>+15%</b><br>
  • Troop HP <b>+5%</b><br>
  → <i>Only designated by the alliance that conquers the capital. Not requestable.</i></p>

  <p><b>👸 First Lady</b><br>
  • Resource Production <b>+10%</b><br>
  • Gathering Speed <b>+20%</b><br>
  → <i>Ideal for farmers and economy-focused players.</i></p>

  <p><b>🤝 Vice President</b><br>
  • Construction Speed <b>+5%</b><br>
  • Research Speed <b>+5%</b><br>
  → <i>Good if you're actively upgrading buildings and researching. Can also send server-wide mails.</i></p>

  <p><b>⚔️ Supreme Commander of War</b><br>
  • Troop ATK <b>+10%</b><br>
  • Troop DEF <b>+10%</b><br>
  → <i>Perfect for players focused on general combat.</i></p>

  <p><b>🎖️ Supreme General</b><br>
  • Troop ATK <b>+10%</b><br>
  • Troop ATK in Siege <b>+10%</b><br>
  → <i>Ideal if you participate in building attacks or siege events.</i></p>

  <p><b>🏗️ Minister of Construction</b><br>
  • Construction Speed <b>+15%</b><br>
  • Free construction time <b>+3,600 seconds</b><br>
  → <i>Excellent when you're leveling up buildings.</i></p>

  <p><b>🌾 Minister of Agriculture</b><br>
  • Gathering Speed <b>+35%</b><br>
  • Resource Production <b>+20%</b><br>
  → <i>The best position for farmers. Maximum resource benefit.</i></p>

  <p><b>🔬 Minister of Research</b><br>
  • Research Speed <b>+15%</b><br>
  • Research time reduction <b>+3,600 seconds</b><br>
  → <i>Perfect when you're actively researching in the Laboratory.</i></p>

  <p><b>🛡️ Minister of Defense</b><br>
  • Troop ATK in Siege Defense <b>+10%</b><br>
  • Troop DEF in Siege Defense <b>+10%</b><br>
  → <i>Useful for defending your base during war events.</i></p>

  <h3>🎯 Which Position to Request Based on Your Situation?</h3>
  <ul>
    <li>Upgrading buildings? → <b>Minister of Construction</b></li>
    <li>Researching in the Lab? → <b>Minister of Research</b></li>
    <li>Gathering resources? → <b>Minister of Agriculture</b></li>
    <li>In war or combat event? → <b>Supreme Commander or Supreme General</b></li>
    <li>Defending your base? → <b>Minister of Defense</b></li>
  </ul>

  <h3>💡 Key Tips</h3>
  <ul>
    <li>Apply for the position <b>right before</b> building, researching, or attacking to take advantage of the buff.</li>
    <li>If the position is taken, <b>join the queue</b> — up to 50 spots available.</li>
    <li>Positions are <b>free</b> — they cost no resources or gems. Always use them!</li>
    <li>If you're F2P, the <b>Minister of Agriculture</b> is the most valuable in the long run.</li>
    <li>Some presidents set <b>high requirements</b> — if you don't qualify, wait for the next government.</li>
  </ul>
`,

tip7: `
  <h2>💵 Best Purchases for Beginners</h2>
  <img src="../img-tip-compras-1.jpg" alt="Sophia">
  
  <p>If you decide to <b>spend real money</b> in Last Z, these are the <b>best investments</b> for the early game (levels 1–20).</p>

  <h3>🎯 Purchase #1: Sophia — Builder Hero ($1 USD)</h3>
  
  <p><b>Why is it the best purchase?</b></p>
  <ul>
    <li>Costs only <b>$1 dollar</b> (very affordable).</li>
    <li>She is an <b>S Rank hero</b> — excellent quality.</li>
    <li>Her <b>special ability</b>: Reduces building construction time.</li>
    <li>Saves you <b>days or weeks</b> of waiting on upgrades.</li>
    <li>Useful throughout <b>your entire progression</b>, not just early on.</li>
  </ul>

  <p><b>When to buy:</b> As soon as possible. Her utility starts from level 1.</p>

  <h3>🔨 Purchase #2: Second Builder ($2 USD)</h3>
  <img src="../img-tip-compras-1.jpg" alt="Sophia">
  <p><b>Why is it essential?</b></p>
  <ul>
    <li>Costs approximately <b>$2 dollars</b>.</li>
    <li>Lets you <b>upgrade 2 buildings simultaneously</b>.</li>
    <li>Doubles your progression speed early on.</li>
    <li>Essential for <b>not getting stuck</b> waiting for one building to finish.</li>
    <li>An investment that <b>speeds up your entire game</b>.</li>
  </ul>

  <p><b>When to buy:</b> Ideally within the first week of playing.</p>

  <h3>💡 Why these 2 purchases first?</h3>
  
  <p>With just <b>$3 dollars</b> ($1 Sophia + $2 Builder), you get:</p>
  <ul>
    <li>A <b>useful S Rank hero</b> that speeds up construction.</li>
    <li>The ability to <b>build 2 buildings at once</b>.</li>
    <li>A <b>HUGE advantage</b> over 100% F2P players in the early levels.</li>
  </ul>

  <p>These purchases give you the <b>best value per dollar</b> in the entire game.</p>

  <h3>📊 Comparison: F2P vs $3 USD</h3>
  
  <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
    <tr style="background:#1a1a1a; border-bottom:2px solid var(--acento);">
      <th style="padding:0.8rem; text-align:left; color:var(--acento);">Aspect</th>
      <th style="padding:0.8rem; text-align:left; color:var(--acento);">F2P</th>
      <th style="padding:0.8rem; text-align:left; color:var(--acento);">With $3</th>
    </tr>
    <tr style="border-bottom:1px solid #333;">
      <td style="padding:0.8rem;">Construction speed</td>
      <td style="padding:0.8rem; color:#ff4757;">Normal</td>
      <td style="padding:0.8rem; color:#4cd137;">Reduced (Sophia)</td>
    </tr>
    <tr style="border-bottom:1px solid #333;">
      <td style="padding:0.8rem;">Builders</td>
      <td style="padding:0.8rem; color:#ff4757;">1 building at a time</td>
      <td style="padding:0.8rem; color:#4cd137;">2 buildings simultaneously</td>
    </tr>
    <tr>
      <td style="padding:0.8rem;">Time to reach level 20</td>
      <td style="padding:0.8rem; color:#ff4757;">~3–4 weeks</td>
      <td style="padding:0.8rem; color:#4cd137;">~1.5–2 weeks</td>
    </tr>
  </table>

  <h3>⚠️ Other Purchases — NOT Recommended at First</h3>
  
  <p><b>Avoid spending on:</b></p>
  <ul>
    <li><b>Resource packs</b> — Resources are easy to obtain for free.</li>
    <li><b>Speed-ups</b> — You can get them in events.</li>
    <li><b>Direct diamonds</b> — Better value with specific packages.</li>
    <li><b>Random heroes</b> — Very RNG (luck-based), you might get something useless.</li>
  </ul>

  <p>Prioritize <b>Sophia + Builder</b> before anything else.</p>

  <h3>🎯 Post-Purchase Strategy</h3>
  
  <p>Once you have Sophia and the 2nd builder:</p>
  <ul>
    <li>Use <b>Sophia on all important constructions</b> (HQ, Laboratory).</li>
    <li>Keep <b>both builders busy</b> at all times.</li>
    <li>Plan what to build with each builder (e.g., Builder 1 = HQ, Builder 2 = Resources).</li>
  </ul>

  <h3>💰 Is it worth it for F2P players?</h3>
  
  <p>If your budget is <b>$0</b>, that's fine. You can progress without spending. But if you can afford <b>$3 dollars just once</b>, these purchases will give you the <b>greatest impact</b> on your gaming experience.</p>

  <p><b>One-time investment:</b> These are purchases you make <b>once</b> and benefit from <b>forever</b>. Not subscriptions or recurring expenses.</p>

  <p><b>Conclusion:</b> If you're going to spend money on this game, spend it on Sophia ($1) and the 2nd Builder ($2). Everything else can wait or be obtained for free. 💎</p>
`,

tip8: `
  <h2>🔍 Locating Scouted Bases</h2>
  <img src="../img-tip-reconocimiento-1.jpg" alt="Scout report">
  
  <h3>❌ The Problem</h3>
  <p>You receive or see a <b>shared scout report</b> in your alliance chat. You can see the enemy's resources and troops, but... <b>where is that base on the map?</b></p>
  
  <p>Many players waste time searching manually on the map or asking "where is X:324 Y:772?".</p>

  <h3>✅ The Solution (The Trick)</h3>
  
  <p><b>Step 1:</b> Open the scout report (from your mail or the shared chat).</p>
  
  <p><b>Step 2:</b> Below the scouted player's name, you'll see the <b>coordinates</b> (example: <b>X:324 Y:772</b>).</p>
  
  <p><b>Step 3:</b> <b>Click directly on those coordinates</b>.</p>
  
  <p><b>Result:</b> The map will move automatically and take you <b>directly to the exact location</b> of that base. No more manual searching!</p>

  <h3>💡 Why is this useful?</h3>
  
  <ul>
    <li><b>Coordinate alliance attacks:</b> Everyone can reach the target quickly.</li>
    <li><b>Check distance:</b> Know if it's worth attacking based on how far it is.</li>
    <li><b>Find easy targets:</b> Locate weak bases quickly.</li>
    <li><b>Save time:</b> Stop wasting minutes searching coordinates on the map.</li>
  </ul>

  <h3>🎯 Extra Tip</h3>
  
  <p>If your alliance frequently shares scout reports, this trick will make your life <b>much easier</b>. Simply:</p>
  
  <ul>
    <li>Open the shared report in chat</li>
    <li>Click on the coordinates</li>
    <li>Evaluate whether it's worth attacking</li>
  </ul>

  <p><b>Remember:</b> Coordinates are clickable in any scout report, whether from mail or shared in chats. Always use it!</p>
`,

tip9: `
  <h2>⚕️ Efficient Healing with Alliance Help</h2>
  <img src="../img-tip-curacion-1.jpg" alt="Hospital">
  
  <h3>❌ Common Mistake</h3>
  <p>After combat or an event, many players have injured troops in the Hospital and do this:</p>
  
  <ul>
    <li>Select <b>"Heal All"</b> (all injured troops at once)</li>
    <li>The healing time is <b>very long</b></li>
    <li>They end up spending <b>speed-ups</b> to finish quickly</li>
  </ul>

  <p>This wastes speed-ups that you could use in emergency situations.</p>

  <h3>✅ The Correct Strategy: Heal in Batches</h3>
  
  <p><b>Step 1:</b> In the Hospital, <b>do NOT select "Heal All"</b>.</p>
  
  <p><b>Step 2:</b> Check <b>how many alliance members are active</b> (online).</p>
  
  <p><b>Step 3:</b> Select a <b>small batch of injured troops</b>. The amount depends on how many active members your alliance has:
  <ul>
    <li>Many active members = you can select a larger batch</li>
    <li>Few active members = select a smaller batch</li>
  </ul>
  </p>
  
  <p><b>Step 4:</b> Click <b>"Heal"</b>.</p>
  
  <p><b>Step 5:</b> <b>Wait for your alliance to help</b>. Each help reduces healing time. If the selected batch is appropriate, the alliance can help you <b>heal the entire batch completely</b>.</p>
  
  <p><b>Step 6:</b> Observe how quickly healing progresses:</p>
  <ul>
    <li><b>If it heals quickly</b> (many members helping) → you can heal a slightly larger batch next time</li>
    <li><b>If it takes a while</b> → reduce the number of soldiers</li>
  </ul>
  
  <p><b>Step 7:</b> <b>Repeat the process</b> until all your injured troops are healed.</p>

  <h3>💡 Why does it work?</h3>
  
  <p>When you heal <b>small batches</b>, the healing time is short. Your alliance can help and <b>reduce that time considerably</b>. This lets you:</p>
  
  <ul>
    <li>Heal troops <b>without spending speed-ups</b></li>
    <li>Take full advantage of <b>your alliance's help</b></li>
    <li>Have your troops ready faster without spending valuable resources</li>
  </ul>

  <h3>🎯 Best Time to Use This Strategy</h3>
  
  <p><b>After events like "The Tyrant":</b></p>
  <ul>
    <li>Many alliance members are <b>connected and active</b></li>
    <li>They can help you <b>immediately</b></li>
    <li>You can heal all your troops faster without spending anything</li>
  </ul>

  <img src="../img-tip-curacion-2.jpg" alt="Online members">

  <h3>🔑 Key Factor: Active Members</h3>
  
  <p>The size of the batch you can efficiently heal depends directly on <b>how many alliance members are active</b> at that moment.</p>
  
  <p><b>More members online</b> = More helps = You can heal larger batches</p>
  <p><b>Fewer members online</b> = Fewer helps = Heal smaller batches</p>

  <h3>⚠️ Important Tips</h3>
  
  <p><b>✅ DO:</b></p>
  <ul>
    <li>Heal after events when many members are active</li>
    <li>Adjust the amount based on how quickly you receive help</li>
    <li>Be patient — you'll save many speed-ups in the long run</li>
    <li>Check the "Online" member list before starting</li>
  </ul>

  <p><b>❌ DON'T:</b></p>
  <ul>
    <li>Heal everything at once if you're not in a rush</li>
    <li>Use speed-ups if you can wait</li>
    <li>Ignore your alliance's help — it's there for a reason!</li>
    <li>Select very large batches when few members are active</li>
  </ul>

  <h3>📝 Important Note</h3>
  
  <p>Healing time and the amount of troops you can efficiently heal also depend on:</p>
  <ul>
    <li>Your <b>alliance research</b></li>
    <li>Your <b>refugees</b></li>
    <li>Other game factors</li>
  </ul>
  
  <p>That's why it's important to <b>dynamically adjust</b> batch sizes based on how quickly you see them healing.</p>

  <h3>🔥 Final Tip</h3>
  
  <p>Speed-ups are valuable. Use them only when you really need to. For healing, your alliance's help is enough if you're patient and select appropriate batches. 💚</p>
`,

tip10: `
  <h2>🤝 Quick Donation in Alliance Technologies</h2>
  <img src="../img-tip-donacion-1.jpg" alt="Alliance technologies">
  
  <h3>❌ What Most Players Do</h3>
  <p>When donating in <b>Alliance Technologies</b>, most players repeatedly click the "Donate" button, donating <b>one at a time</b>. This is slow and inefficient.</p>

  <h3>✅ The Trick: Hold Down</h3>
  
  <p>Instead of individual clicks, <b>hold down the donate button</b>. This activates <b>automatic multipliers</b>:</p>
  <ul>
    <li>🔥 <b>x2</b> — Donate double</li>
    <li>🔥 <b>x5</b> — Donate 5 times more</li>
    <li>🔥 <b>x10</b> — Donate 10 times more</li>
  </ul>

  <img src="../img-tip-donacion-2.jpg" alt="Activated multipliers">

  <h3>💡 Why It Works</h3>
  
  <ul>
    <li><b>Saves time:</b> No need to make hundreds of clicks.</li>
    <li><b>Your alliance advances faster:</b> More donations complete technologies sooner.</li>
    <li><b>You earn more points:</b> Accumulate contribution points to buy items in the Alliance Store.</li>
    <li><b>Better use of your attempts:</b> Attempts are limited; multipliers make them count more.</li>
  </ul>
  
  <p><b>F2P Tip:</b> Use coin donations and hold down the button too to activate multipliers.</p>

  <h3>⚠️ Tips</h3>
  
  <p><b>✅ DO:</b></p>
  <ul>
    <li>Hold down to activate multipliers</li>
    <li>Donate daily before attempts reset</li>
    <li>Prioritize technologies that benefit the whole alliance</li>
  </ul>

  <p><b>❌ DON'T:</b></p>
  <ul>
    <li>Make individual clicks wasting time</li>
    <li>Forget to donate — you lose valuable Alliance Store points</li>
  </ul>

  <h3>🔥 Extra Tip</h3>
  
  <p>The contribution points you earn are used in the <b>Alliance Store</b> to buy speed-ups, resources, hero fragments, and more. The more you donate, the more you can buy!</p>

  <p><b>Remember:</b> Hold down = Multipliers activated = More efficiency for you and your alliance. 🚀</p>
`,

tip11: `
  <h2>⚔️ Automatic Troop Return</h2>
  <img src="../img-tip-regreso-1.png" alt="Attack options">
  
  <h3>❌ Common Problem</h3>
  <p>Many players attack targets <b>(bases, etc.)</b> and after winning, their troops <b>stay at the target</b>. This means you have to:</p>
  
  <ul>
    <li>Remember your troops are out there</li>
    <li>Go to the map and find where they ended up</li>
    <li>Return the troops <b>manually</b> every time</li>
  </ul>

  <p>This is tedious and easy to forget, especially if you're attacking multiple targets.</p>

  <h3>✅ The Solution: Automatic Return</h3>
  
  <p>There's an option that makes your troops <b>return automatically</b> after completing the attack. Here's how to activate it:</p>

  <p><b>Step 1:</b> Click on the target you want to attack (enemy HQ, zombie, etc.).</p>
  
  <p><b>Step 2:</b> You'll see 3 options:</p>
  <ul>
    <li>🔍 <b>Scout</b></li>
    <li>👥 <b>Team</b></li>
    <li>⚔️ <b>Attack</b></li>
  </ul>
  
  <p><b>Step 3:</b> Click <b>"Attack"</b>.</p>
  
  <p><b>Step 4:</b> In the attack panel, <b>look at the bottom</b> for the checkbox that says <b>"Auto Return"</b>.</p>
  
  <p><b>Step 5:</b> <b>Make sure it's checked</b> (with a green ✓ checkmark).</p>

  <img src="../img-tip-regreso-2.png" alt="Auto return activated">
  
  <p><b>Step 6:</b> Hit <b>"March"</b> to send your attack.</p>

  <h3>💡 What Happens Now?</h3>
  
  <p>Once you activate auto return:</p>
  
  <ul>
    <li>Your troops will head to the target</li>
    <li>Complete the combat</li>
    <li><b>Automatically return</b> to your HQ without you having to do anything</li>
  </ul>
  
  <p>You'll see a message saying: <b>"Auto return enabled. Troops will automatically return to HQ after completing the current command."</b></p>

  <h3>🎯 Advantages</h3>
  
  <ul>
    <li><b>Saves time:</b> No need to manually return troops</li>
    <li><b>Avoids forgetting:</b> No troops left abandoned on the map</li>
    <li><b>More efficient:</b> Ideal when farming multiple targets in a row</li>
    <li><b>Safer troops:</b> They return immediately, reducing the risk of being attacked outside</li>
  </ul>

  <h3>⚠️ Important Tips</h3>
  
  <p><b>✅ DO:</b></p>
  <ul>
    <li>Activate auto return <b>EVERY TIME</b> you attack targets</li>
    <li>Verify the checkbox is marked before hitting "March"</li>
    <li>Use this option especially when farming resources</li>
  </ul>

  <p><b>❌ DON'T:</b></p>
  <ul>
    <li>Forget to activate auto return — your troops will stay outside</li>
    <li>Assume it's on by default — always check</li>
  </ul>

  <h3>🔥 Extra Tip</h3>
  
  <p>If you're farming multiple targets, auto return is <b>essential</b>. You can send attacks one after another without worrying about returning troops manually between each one.</p>

  <p><b>Remember:</b> Check the "Auto Return" checkbox before each attack. This simple step will save you a lot of time and headaches. ⚔️</p>
`,
  tip12: `
    <h2>⚡ Quick Reinforcement</h2>
    <img src="../img-tip-refuerzo-1.jpg" alt="Reinforcement">
    <p>If there's an <b>alliance treasure</b> that's a bit far away, you can get there faster by <b>reinforcing allied cities or bases</b>.</p>
    <p><b>How does it work?</b></p>
    <ul>
      <li>Only works <b>within your alliance territory</b>.</li>
      <li>Reinforcement speed is <b>3x faster</b> than normal movement.</li>
      <li>Ideal for quickly reaching <b>alliance events</b> or <b>rally points</b>.</li>
    </ul>
    <p><b>Tip:</b> Use this mechanic to arrive first at treasures and earn better rewards.</p>
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