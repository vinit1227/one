/* ============================================================
   CONFIG — your Cloudinary videos
   Your cloud name (oglpra1n) is already in the URL pattern below —
   just swap <file-name> for the actual public ID of each upload.
   Find it in Cloudinary: Media Library → click the video → copy
   the "Public ID". Leave the list empty and a placeholder card
   shows instead of a broken page.
============================================================ */
const REELS = [
  // { src: "https://res.cloudinary.com/oglpra1n/video/upload/<file-name>.mp4", caption: "the one from the beach" },
  // { src: "https://res.cloudinary.com/oglpra1n/video/upload/<file-name>.mp4", caption: "your favorite edit" },
];

const reelsScroller = document.getElementById('reels-scroller');
const autoplaySwitch = document.getElementById('autoplaySwitch');
let autoAdvance = false;

autoplaySwitch.addEventListener('click', () => {
  autoAdvance = !autoAdvance;
  autoplaySwitch.classList.toggle('on', autoAdvance);
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
      <video src="${r.src}" muted loop playsinline data-index="${i}"></video>
      <button class="reel-mute" aria-label="Toggle sound">🔇</button>
      <div class="reel-caption">${r.caption || ''}</div>
    `;
    reelsScroller.appendChild(card);

    const vid = card.querySelector('video');
    const muteBtn = card.querySelector('.reel-mute');
    muteBtn.addEventListener('click', () => {
      vid.muted = !vid.muted;
      muteBtn.textContent = vid.muted ? '🔇' : '🔊';
    });

    vid.addEventListener('ended', () => {
      if (autoAdvance){
        const next = card.nextElementSibling;
        if (next) next.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const videos = reelsScroller.querySelectorAll('video');
  const vidObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio > 0.7){
        v.play().catch(()=>{});
      } else {
        v.pause();
      }
    });
  }, { threshold: [0, 0.7, 1] });
  videos.forEach(v => vidObserver.observe(v));
}
buildReels();
