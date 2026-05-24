  const music = document.getElementById('bgMusic');
  const label = document.getElementById('audio-label');
  let playing = false;

  function tryAutoplay() {
    const p = music.play();
    if (p !== undefined) {
      p.then(() => { playing = true; label.textContent = 'Pausar'; })
       .catch(() => {
         document.addEventListener('click', () => {
           music.play().then(() => { playing = true; label.textContent = 'Pausar'; });
         }, { once: true });
       });
    }
  }

  function toggleMusic() {
    if (playing) { music.pause(); playing = false; label.textContent = 'Música'; }
    else { music.play(); playing = true; label.textContent = 'Pausar'; }
  }

  tryAutoplay();

  const weddingDate = new Date(2026, 5, 26, 18, 0, 0);
  function updateCountdown() {
    const diff = weddingDate - new Date();
    if (diff <= 0) { ['days','hours','mins','secs'].forEach(k => document.getElementById('cd-'+k).textContent='0'); return; }
    const d = Math.floor(diff/86400000);
    const h = Math.floor((diff%86400000)/3600000);
    const m = Math.floor((diff%3600000)/60000);
    const s = Math.floor((diff%60000)/1000);
    document.getElementById('cd-days').textContent = String(d).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
    document.getElementById('cd-mins').textContent = String(m).padStart(2,'0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2,'0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  function confirmarAsistencia() {
    const name = document.getElementById('guestName').value.trim();
    if (!name) {
      document.getElementById('guestName').style.borderColor = 'rgba(184,147,90,0.8)';
      document.getElementById('guestName').placeholder = 'Por favor escribe tu nombre';
      return;
    }
    const phone = '521XXXXXXXXXX';
    const msg = encodeURIComponent(`¡Hola! Confirmo que asistiré a la boda de Janneth y Aaron. Mi nombre es: ${name} 💍`);
    window.open(`https://wa.me/8117644347?text=${msg}`, '_blank');
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));