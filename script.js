// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  // Active link update
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
navLinks.forEach(link => link.addEventListener('click', () => navMenu.classList.remove('open')));

// ===== Scroll Reveal =====
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ===== 3D Card Tilt Effect =====
document.querySelectorAll('.card-3d').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.querySelector('.card-inner').style.transform =
      `rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale(1.03)`;
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.card-inner').style.transform = 'rotateY(0) rotateX(0) scale(1)';
  });
});

// ===== Parallax on Scroll =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const mandala = document.querySelector('.hero-mandala');
  if (mandala) mandala.style.transform = `translate(-50%, -50%) rotate(${scrolled * 0.03}deg) scale(${1 + scrolled * 0.0002})`;
});

// ===== Floating Particles =====
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const cvs = document.createElement('canvas');
  cvs.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  canvas.appendChild(cvs);
  const ctx = cvs.getContext('2d');
  let particles = [];
  const resize = () => { cvs.width = window.innerWidth; cvs.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * cvs.width;
      this.y = Math.random() * cvs.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.hue = Math.random() > 0.5 ? 35 : 15; // gold or saffron
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > cvs.width || this.y < 0 || this.y > cvs.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 60; i++) particles.push(new Particle());
  function animate() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== 3D Book hover =====
const book3d = document.getElementById('book3d');
if (book3d) {
  const wrapper = book3d.parentElement;
  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    book3d.style.transform = `rotateY(${-25 + x * 30}deg) rotateX(${y * 10}deg)`;
  });
  wrapper.addEventListener('mouseleave', () => {
    book3d.style.transform = 'rotateY(-25deg)';
  });
}

// ===== Culture Card Modal Popups =====
const modalData = {
  'modal-attire': {
    number: '01',
    title: 'Traditional Attire & Jewelry',
    paragraphs: [
      'The Banjara women are renowned for their stunning traditional clothing — vibrant ghagras adorned with intricate mirror work, colorful embroidery, and elaborate silver jewelry. Each piece carries deep cultural significance and tells a story of identity.',
      'Banjara jewelry is not mere ornamentation; it is a language of identity passed down through generations of master artisans.'
    ],
    icons: [
      { emoji: '👗', label: 'Ghagra', desc: 'Heavy embroidered skirt with mirror work (abhla bharat)' },
      { emoji: '🪞', label: 'Mirror Work', desc: 'Thousands of tiny mirrors creating dazzling light effects' },
      { emoji: '⛓️', label: 'Hasli', desc: 'Heavy silver neck ring signifying married status' },
      { emoji: '👑', label: 'Bor', desc: 'Forehead ornament with silver coins & chains' },
      { emoji: '💪', label: 'Baluha', desc: 'Silver armlets worn on the upper arm' },
      { emoji: '🔔', label: 'Payal / Kada', desc: 'Heavy silver anklets with musical bells' },
      { emoji: '🧣', label: 'Odhani', desc: 'Embroidered headscarf with mirror work borders' },
      { emoji: '🪡', label: 'Embroidery', desc: 'Handstitched patterns unique to each family' }
    ]
  },
  'modal-music': {
    number: '02',
    title: 'Music, Dance & Oral Traditions',
    paragraphs: [
      'Banjara folk music is deeply connected to the rhythms of nature and daily life. Songs narrate tales of migration, celebrate seasons, and express devotion to Sevalal, Ambabhavani, and Guru Dattatreya.',
      'Group dances in circles with women in full traditional attire create a kaleidoscope of colors, sounds, and silver jingling.'
    ],
    icons: [
      { emoji: '💃', label: 'Lambadi Dance', desc: 'Group circular dance with rhythmic clapping' },
      { emoji: '🌧️', label: 'Teej Songs', desc: 'Seasonal songs celebrating monsoon & harvest' },
      { emoji: '💒', label: 'Wedding Songs', desc: 'Multi-day musical celebrations' },
      { emoji: '🙏', label: 'Bhajans', desc: 'Devotional songs to Sevalal & Ambabhavani' },
      { emoji: '📖', label: 'Oral Epics', desc: 'Narrative poems of Banjara migration history' },
      { emoji: '🪘', label: 'Dholak & Chang', desc: 'Traditional drums used in ceremonies' },
      { emoji: '🎨', label: 'Holi Geet', desc: 'Special songs for the festival of colors' },
      { emoji: '🎶', label: 'Lullabies', desc: 'Traditional songs passed mother to child' }
    ]
  },
  'modal-gotra': {
    number: '03',
    title: 'Gotra System & Social Structure',
    paragraphs: [
      'The gotra system is the backbone of Banjara social organization. Each gotra traces its lineage to a founding ancestor with specific traditions and totems unique to that clan.',
      'Banjara settlements (Tandas) are organized units led by a Naik (headman) with a self-governing Panchayat system.'
    ],
    icons: [
      { emoji: '🛡️', label: 'Rathod', desc: 'One of the most prominent Banjara gotras' },
      { emoji: '⚔️', label: 'Chavan & Jadhav', desc: 'Warrior lineage gotras with rich history' },
      { emoji: '🏘️', label: 'Tanda / Shivir', desc: 'Traditional Banjara settlement units' },
      { emoji: '👤', label: 'Naik', desc: 'Hereditary headman of the settlement' },
      { emoji: '⚖️', label: 'Panchayat', desc: 'Community council for dispute resolution' },
      { emoji: '💍', label: 'Exogamy', desc: 'Marriage prohibited within same gotra' },
      { emoji: '🕉️', label: 'Kul Devta', desc: 'Clan deity worship specific to each gotra' },
      { emoji: '🗺️', label: 'Migration', desc: 'Historical tracking of community movements' }
    ]
  },
  'modal-rituals': {
    number: '04',
    title: 'Sacred Customs & Rituals',
    paragraphs: [
      'Every aspect of Banjara life is infused with sacred customs connecting the community to their roots. The worship of Ambabhavani, Sevalal, and Guru Dattatreya forms their spiritual foundation.',
      'Weddings are elaborate multi-day affairs with the Til Ceremony, Haldi, and grand Baraat — each ritual rich with ancestral symbolism.'
    ],
    icons: [
      { emoji: '🙏', label: 'Ambabhavani Puja', desc: 'Worship of the patron goddess' },
      { emoji: '🪔', label: 'Sevalal Jayanti', desc: 'Celebrating the great Banjara saint' },
      { emoji: '🌸', label: 'Teej Festival', desc: "Women's festival of monsoon & marital bliss" },
      { emoji: '🎊', label: 'Holi', desc: 'Vibrant community-wide color celebration' },
      { emoji: '👶', label: 'Naming Ceremony', desc: 'Elaborate ritual for newborn children' },
      { emoji: '🔥', label: 'Dhundh Ritual', desc: 'Sacred fire ceremony during weddings' },
      { emoji: '🕯️', label: 'Pitru Puja', desc: 'Annual ancestral worship & remembrance' },
      { emoji: '🌾', label: 'Harvest Rites', desc: 'Seasonal thanksgiving to Mother Earth' }
    ]
  }
};

const modalOverlay = document.getElementById('modalOverlay');
const modalContainer = document.getElementById('modalContainer');
const modalBody = document.getElementById('modalBody');
const modalCloseBtn = document.getElementById('modalClose');

function openModal(modalId) {
  const data = modalData[modalId];
  if (!data) return;
  
  let html = `<div class="modal-number">${data.number}</div>`;
  html += `<h2 class="modal-title">${data.title}</h2>`;
  html += `<div class="modal-divider"></div>`;
  data.paragraphs.forEach(p => { html += `<p class="modal-text">${p}</p>`; });
  html += `<div class="modal-icon-grid">`;
  data.icons.forEach(ic => {
    html += `<div class="modal-icon-card">
      <span class="mic-emoji">${ic.emoji}</span>
      <span class="mic-label">${ic.label}</span>
      <span class="mic-desc">${ic.desc}</span>
    </div>`;
  });
  html += `</div>`;
  
  modalBody.innerHTML = html;
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Card click handlers
document.querySelectorAll('.culture-card[data-modal]').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.modal));
  card.addEventListener('keydown', (e) => { if (e.key === 'Enter') openModal(card.dataset.modal); });
});

// Close handlers
modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// ===== Welcome Intro Popup =====
const welcomeOverlay = document.getElementById('welcomeOverlay');
const welcomeBtn = document.getElementById('welcomeBtn');
if (welcomeOverlay && welcomeBtn) {
  document.body.style.overflow = 'hidden';
  welcomeBtn.addEventListener('click', () => {
    welcomeOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  });
}
