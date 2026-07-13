/* Shared across every chapter page: ambient gold particles + fade-in-on-scroll */

(function(){
  const field = document.getElementById('particles');
  if (field){
    for (let i = 0; i < 22; i++){
      const m = document.createElement('div');
      m.className = 'mote';
      m.style.left = Math.random() * 100 + 'vw';
      m.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
      m.style.animationDuration = (8 + Math.random() * 10) + 's';
      m.style.animationDelay = (Math.random() * 10) + 's';
      field.appendChild(m);
    }
  }

  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  // smooth cross-fade when moving between chapter pages
  document.querySelectorAll('a.nav-continue, a.nav-back').forEach(link => {
    link.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if (!href) return;
      e.preventDefault();
      document.body.classList.add('page-out');
      setTimeout(() => { window.location.href = href; }, 400);
    });
  });
})();
