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

    // Toggle auto-advance
    autoplaySwitch.addEventListener('click', () => {
      autoAdvance = !autoAdvance;
      autoplaySwitch.classList.toggle('on', autoAdvance);
      
      // Update loop behavior for all videos
      document.querySelectorAll('#reels-scroller video').forEach(v => {
        v.loop = !autoAdvance;
      });
    });

    function buildReels() {
      if (!reelsScroller) return;
      reelsScroller.innerHTML = '';
      
      if (REELS.length === 0) {
        reelsScroller.innerHTML = `
          <div class="reel-card">
            <div class="reel-placeholder">
              🎞<br>Your first edit goes here.<br>Add a video link in reels.js
            </div>
          </div>`;
        buildIndicator();
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
        // Initially muted as per HTML attribute, but we set muted = false programmatically? 
        // We want audio NOT muted by default when she clicks play. 
        // However browsers require user gesture to unmute. We'll keep muted attribute but set muted to false 
        // after first interaction OR we set muted = false directly and rely on autoplay policies.
        // Better: start muted for autoplay compatibility, but we want unmuted experience.
        // We'll set vid.muted = false; BUT that may block autoplay. 
        // According to request: "audio should not be muted when she clicks only then"
        // Interpretation: by default videos should play with sound (unmuted) when they become visible.
        // We'll set muted = false, and handle play promise.
        vid.muted = false;   // <-- KEY CHANGE: audio not muted by default
        vid.loop = !autoAdvance;
        
        // Update mute button icon based on actual muted state
        const muteBtn = card.querySelector('.reel-mute');
        const updateMuteIcon = () => {
          muteBtn.textContent = vid.muted ? '🔇' : '🔊';
        };
        updateMuteIcon();
        
        muteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          vid.muted = !vid.muted;
          updateMuteIcon();
          // If unmuting and video is paused, try to play (needed for some browsers)
          if (!vid.muted && vid.paused) {
            vid.play().catch(() => {});
          }
        });

        // Navigation buttons
        const upBtn = card.querySelector('.reel-nav.up');
        const downBtn = card.querySelector('.reel-nav.down');
        
        if (i === 0) upBtn.classList.add('disabled');
        if (i === REELS.length - 1) downBtn.classList.add('disabled');

        upBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const prev = card.previousElementSibling;
          if (prev) prev.scrollIntoView({ behavior: 'smooth' });
        });
        downBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const next = card.nextElementSibling;
          if (next) next.scrollIntoView({ behavior: 'smooth' });
        });

        // Auto-advance on ended
        vid.addEventListener('ended', () => {
          if (autoAdvance) {
            const next = card.nextElementSibling;
            if (next) {
              next.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
        
        // Attempt to play when visible (handled by observer), but also if user interacts
      });

      buildIndicator();
      startReelObservers();
    }

    function buildIndicator() {
      if (!reelsIndicator) return;
      reelsIndicator.innerHTML = '';
      REELS.forEach(() => {
        const seg = document.createElement('div');
        seg.className = 'seg';
        reelsIndicator.appendChild(seg);
      });
      updateIndicator(0);
    }

    function updateIndicator(currentIndex) {
      const segs = reelsIndicator.querySelectorAll('.seg');
      segs.forEach((seg, idx) => {
        seg.classList.remove('current', 'watched');
        if (idx < currentIndex) seg.classList.add('watched');
        else if (idx === currentIndex) seg.classList.add('current');
      });
    }

    function startReelObservers() {
      const videos = reelsScroller.querySelectorAll('video');
      if (videos.length === 0) return;
      
      const vidObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const v = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
            // Play video - since muted is false, it will try with sound.
            // Browser may still block unmuted autoplay; we catch and if needed fallback.
            v.play().then(() => {
              // Play succeeded with current muted state
            }).catch(err => {
              // If autoplay with sound blocked, we could mute and retry, but request wants sound.
              // We'll attempt to play muted as fallback only if original fails, but keep muted false.
              console.warn('Autoplay with sound prevented, attempting muted fallback briefly.');
              v.muted = true;
              v.play().then(() => {
                // After playing muted, we could show a note, but we keep muted false visually?
                // Better: keep muted false but user might need to interact.
                // We'll set muted back to false after a tiny delay? Not ideal.
                // We'll leave muted true as fallback but button shows correct state.
                const muteBtn = v.parentNode.querySelector('.reel-mute');
                if (muteBtn) muteBtn.textContent = '🔇';
              }).catch(() => {});
            });
            
            updateIndicator(parseInt(v.dataset.index, 10));
          } else {
            v.pause();
          }
        });
      }, { threshold: [0, 0.7, 1] });
      
      videos.forEach(v => vidObserver.observe(v));
    }

    // Initialize everything after DOM ready
    window.addEventListener('DOMContentLoaded', () => {
      buildReels();
    });
  </script>
</body>
</html>
