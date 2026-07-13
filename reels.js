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
    let globalMuted = true; // Start muted for autoplay compatibility

    // Toggle auto-advance
    autoplaySwitch.addEventListener('click', () => {
      autoAdvance = !autoAdvance;
      autoplaySwitch.classList.toggle('on', autoAdvance);
      
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
          <video src="${r.src}" muted playsinline loop preload="metadata" data-index="${i}"></video>
          <button class="reel-mute" aria-label="Unmute audio">🔇</button>
          <div class="reel-navbtns">
            <button class="reel-nav up" aria-label="Previous reel">↑</button>
            <button class="reel-nav down" aria-label="Next reel">↓</button>
          </div>
          <div class="reel-caption">${r.caption || ''}</div>
        `;
        reelsScroller.appendChild(card);

        const vid = card.querySelector('video');
        const muteBtn = card.querySelector('.reel-mute');
        
        // Start muted for autoplay
        vid.muted = true;
        vid.loop = !autoAdvance;
        vid.setAttribute('playsinline', '');
        
        // Mute button click handler - THIS IS WHERE AUDIO GETS UNMUTED
        muteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          
          if (vid.muted) {
            // Unmute
            vid.muted = false;
            muteBtn.textContent = '🔊';
            // Try to play with sound
            vid.play().catch(err => {
              console.log('Play with sound failed, keeping unmuted for next interaction');
            });
          } else {
            // Mute
            vid.muted = true;
            muteBtn.textContent = '🔇';
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
      
      // Track which video is currently active
      let activeVideoIndex = 0;
      
      const vidObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const v = entry.target;
          const index = parseInt(v.dataset.index, 10);
          
          if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
            // This video is now the main one
            activeVideoIndex = index;
            updateIndicator(index);
            
            // Play the video (it will play muted since that's our default)
            v.play().catch(err => {
              console.log('Video play attempt:', index, err.message);
            });
            
            // Pause all other videos to save resources
            videos.forEach(otherVid => {
              if (otherVid !== v && !otherVid.paused) {
                otherVid.pause();
              }
            });
          } else if (entry.intersectionRatio < 0.3) {
            // Video is mostly out of view, pause it
            v.pause();
          }
        });
      }, { 
        threshold: [0, 0.3, 0.5, 0.7, 1.0]
      });
      
      videos.forEach(v => vidObserver.observe(v));
      
      // Initial play of first video
      if (videos.length > 0) {
        setTimeout(() => {
          videos[0].play().catch(() => {});
        }, 300);
      }
    }

    // Initialize on load
    buildReels();
    
    // Also handle scroll snap to update indicator
    reelsScroller.addEventListener('scroll', () => {
      const cards = reelsScroller.querySelectorAll('.reel-card');
      const scrollerRect = reelsScroller.getBoundingClientRect();
      const scrollerCenter = scrollerRect.top + scrollerRect.height / 2;
      
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - scrollerCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });
      
      updateIndicator(closestIndex);
    }, { passive: true });

    console.log('✨ Reels ready! Click the 🔇 button on any video to unmute and hear the audio.');
  </script>
</body>
</html>
