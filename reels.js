/* ============================================================
   CONFIG — your Cloudinary videos
   Your cloud name (oglpra1n) is already in the URL pattern below —
   just swap <file-name> for the actual public ID of each upload.
   Find it in Cloudinary: Media Library → click the video → copy
   the "Public ID". Leave the list empty and a placeholder card
   shows instead of a broken page.
============================================================ */
const REELS = [
 "https://res.cloudinary.com/oglpra1n/video/upload/v1783929626/Snapchat-2412882_v5guc3.mp4",
   "https://res.cloudinary.com/oglpra1n/video/upload/v1783929747/VID_20260713_133142_072_pvv6ah.mp4",
   "https://res.cloudinary.com/oglpra1n/video/upload/v1783929748/VID_20260713_133141_842_x6sanx.mp4",
   "https://res.cloudinary.com/oglpra1n/video/upload/v1783929748/VID_20260713_133106_732_ote3qa.mp4",
   "https://res.cloudinary.com/oglpra1n/video/upload/v1783929748/VID_20260713_133136_212_bijkwb.mp4",
   "https://res.cloudinary.com/oglpra1n/video/upload/v1783929749/VID_20260713_133142_217_w2pinu.mp4",
   "https://res.cloudinary.com/oglpra1n/video/upload/v1783929750/VID_20260713_133105_793_oo3k63.mp4",
   "https://res.cloudinary.com/oglpra1n/video/upload/v1783929752/VID_20260713_133106_481_oggjdv.mp4",
   "https://res.cloudinary.com/oglpra1n/video/upload/v1783929753/VID_20260713_133125_348_zhbwvd.mp4",
   "https://res.cloudinary.com/oglpra1n/video/upload/v1783929753/VID_20260713_133106_423_giuzq4.mp4",
   "https://res.cloudinary.com/oglpra1n/video/upload/v1783929752/VID_20260713_133106_552_dr7tki.mp4",
   "https://res.cloudinary.com/oglpra1n/video/upload/v1783929755/VID_20260713_133106_355_mbw3in.mp4",
   "https://res.cloudinary.com/oglpra1n/video/upload/v1783929755/VID_20260713_133105_950_ksjce6.mp4,
   "https://res.cloudinary.com/oglpra1n/video/upload/v1783929756/VID_20260713_133105_852_i9rzcl.mp4",
   "https://res.cloudinary.com/oglpra1n/video/upload/v1783929758/VID_20260713_133101_700_zzqwas.mp4",
   "https://res.cloudinary.com/oglpra1n/video/upload/v1783929759/VID_20260713_133105_887_vo3zhw.mp4",
   "https://res.cloudinary.com/oglpra1n/video/upload/v1783929759/VID_20260713_133132_956_dpbfjs.mp4",
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
