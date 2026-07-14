const REELS = [
  { src: "https://res.cloudinary.com/oglpra1n/video/upload/v1783929626/Snapchat-2412882_v5guc3.mp4", caption: "" },
  { src: "https://res.cloudinary.com/oglpra1n/video/upload/v1783929747/VID_20260713_133142_072_pvv6ah.mp4", caption: "" },
  { src: "https://res.cloudinary.com/oglpra1n/video/upload/v1783929748/VID_20260713_133141_842_x6sanx.mp4", caption: "" },
  { src: "https://res.cloudinary.com/oglpra1n/video/upload/v1783929748/VID_20260713_133106_732_ote3qa.mp4", caption: "" },
  { src: "https://res.cloudinary.com/oglpra1n/video/upload/v1783929748/VID_20260713_133136_212_bijkwb.mp4", caption: "" },
  { src: "https://res.cloudinary.com/oglpra1n/video/upload/v1783929749/VID_20260713_133142_217_w2pinu.mp4", caption: "" },
  { src: "https://res.cloudinary.com/oglpra1n/video/upload/v1783929750/VID_20260713_133105_793_oo3k63.mp4", caption: "" },
  { src: "https://res.cloudinary.com/oglpra1n/video/upload/v1783929752/VID_20260713_133106_481_oggjdv.mp4", caption: "" },
  { src: "https://res.cloudinary.com/oglpra1n/video/upload/v1783929753/VID_20260713_133125_348_zhbwvd.mp4", caption: "" },
  { src: "https://res.cloudinary.com/oglpra1n/video/upload/v1783929753/VID_20260713_133106_423_giuzq4.mp4", caption: "" },
  { src: "https://res.cloudinary.com/oglpra1n/video/upload/v1783929752/VID_20260713_133106_552_dr7tki.mp4", caption: "" },
  { src: "https://res.cloudinary.com/oglpra1n/video/upload/v1783929755/VID_20260713_133106_355_mbw3in.mp4", caption: "" },
  { src: "https://res.cloudinary.com/oglpra1n/video/upload/v1783929755/VID_20260713_133105_950_ksjce6.mp4", caption: "" },
  { src: "https://res.cloudinary.com/oglpra1n/video/upload/v1783929756/VID_20260713_133105_852_i9rzcl.mp4", caption: "" },
  { src: "https://res.cloudinary.com/oglpra1n/video/upload/v1783929758/VID_20260713_133101_700_zzqwas.mp4", caption: "" },
  { src: "https://res.cloudinary.com/oglpra1n/video/upload/v1783929759/VID_20260713_133105_887_vo3zhw.mp4", caption: "" },
  { src: "https://res.cloudinary.com/oglpra1n/video/upload/v1783929759/VID_20260713_133132_956_dpbfjs.mp4", caption: "" },
];

const reelsScroller = document.getElementById('reels-scroller');
const reelsIndicator = document.getElementById('reels-indicator');
const autoplaySwitch = document.getElementById('autoplaySwitch');
let autoAdvance = false;

autoplaySwitch.addEventListener('click', () => {
  autoAdvance = !autoAdvance;
  autoplaySwitch.classList.toggle('on', autoAdvance);

  reelsScroller.querySelectorAll('video').forEach(v => { v.loop = !autoAdvance; });
});

function buildReels(){
  if (REELS.length === 0){
    reelsScroller.innerHTML = `
      <div class="reel-card">
        <div class="reel-placeholder">
          🎞<br>Your first edit goes here.<br>Add a video link in reels.js
        </div>
      </div>`;
    return;
  }

  REELS.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'reel-card';
    card.innerHTML = `
      <video src="${r.src}" muted playsinline data-index="${i}"></video>
      <button class="reel-mute" aria-label="Toggle sound">🔇</button>
      <div class="reel-navbtns">
        <button class="reel-nav up" aria-label="Previous reel">↑</button>
        <button class="reel-nav down" aria-label="Next reel">↓</button>
      </div>
      <div class="reel-caption">${r.caption || ''}</div>
    `;
    reelsScroller.appendChild(card);

    const vid = card.querySelector('video');
    vid.loop = !autoAdvance;

    const muteBtn = card.querySelector('.reel-mute');
    function toggleMute(){
      vid.muted = !vid.muted;
      muteBtn.textContent = vid.muted ? '🔇' : '🔊';
    }
    muteBtn.addEventListener('click', toggleMute);
    vid.addEventListener('click', toggleMute);

    const upBtn = card.querySelector('.reel-nav.up');
    const downBtn = card.querySelector('.reel-nav.down');
    if (i === 0) upBtn.classList.add('disabled');
    if (i === REELS.length - 1) downBtn.classList.add('disabled');

    upBtn.addEventListener('click', () => {
      const prev = card.previousElementSibling;
      if (prev) prev.scrollIntoView({ behavior: 'smooth' });
    });
    downBtn.addEventListener('click', () => {
      const next = card.nextElementSibling;
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    });

    vid.addEventListener('ended', () => {
      if (autoAdvance){
        const next = card.nextElementSibling;
        if (next) next.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  buildIndicator();
  startReelObservers();
}


function buildIndicator(){
  reelsIndicator.innerHTML = '';
  REELS.forEach(() => {
    const seg = document.createElement('div');
    seg.className = 'seg';
    reelsIndicator.appendChild(seg);
  });
  updateIndicator(0);
}

function updateIndicator(currentIndex){
  const segs = reelsIndicator.querySelectorAll('.seg');
  segs.forEach((seg, idx) => {
    seg.classList.remove('current', 'watched');
    if (idx < currentIndex) seg.classList.add('watched');
    else if (idx === currentIndex) seg.classList.add('current');
  });
}


function startReelObservers(){
  const videos = reelsScroller.querySelectorAll('video');
  if (videos.length === 0) return;
  const vidObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio > 0.7){
        v.play().catch(()=>{});
        updateIndicator(parseInt(v.dataset.index, 10));
      } else {
        v.pause();
      }
    });
  }, { threshold: [0, 0.7, 1] });
  videos.forEach(v => vidObserver.observe(v));
}

buildReels();
