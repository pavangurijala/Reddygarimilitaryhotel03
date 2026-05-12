/* ===== Reddy Gari Military Hotel – Premium 3D Animated Website Script ===== */

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2400);
});

// ===== THREE.JS – SUBTLE GOLD DUST BACKGROUND =====
(function initParticles() {
  const canvas = document.getElementById('bgCanvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Subtle gold dust particles — fewer, calmer
  const count = 250;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    pos[i] = (Math.random() - 0.5) * 40;
    pos[i + 1] = (Math.random() - 0.5) * 40;
    pos[i + 2] = (Math.random() - 0.5) * 40;
    vel[i] = (Math.random() - 0.5) * 0.005;
    vel[i + 1] = (Math.random() - 0.5) * 0.005;
    vel[i + 2] = (Math.random() - 0.5) * 0.005;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color: 0xD4A843, size: 0.06, transparent: true, opacity: 0.5 });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  camera.position.z = 20;

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
  });

  function animate() {
    requestAnimationFrame(animate);
    const positions = geo.attributes.position.array;
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] += vel[i];
      positions[i + 1] += vel[i + 1];
      positions[i + 2] += vel[i + 2];
      if (Math.abs(positions[i]) > 20) vel[i] *= -1;
      if (Math.abs(positions[i + 1]) > 20) vel[i + 1] *= -1;
      if (Math.abs(positions[i + 2]) > 20) vel[i + 2] *= -1;
    }
    geo.attributes.position.needsUpdate = true;
    points.rotation.y += 0.0005;

    camera.position.x += (mouseX * 2 - camera.position.x) * 0.01;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.01;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();


// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 60);

  // Active link
  sections.forEach(sec => {
    const top = sec.offsetTop - 150;
    const h = sec.offsetHeight;
    const id = sec.getAttribute('id');
    if (scrollY >= top && scrollY < top + h) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('active');
});
navLinksEl.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== SCROLL REVEAL ANIMATIONS =====
function revealElements() {
  const reveals = document.querySelectorAll('.about-card, .menu-highlight-card, .gallery-item, .contact-card, .stat-item, .specialty-card');
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}

// Initialize hidden state
document.querySelectorAll('.about-card, .menu-highlight-card, .gallery-item, .contact-card, .stat-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'all 0.6s ease';
});
window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(num => {
    const target = parseInt(num.dataset.count);
    if (num.getBoundingClientRect().top < window.innerHeight && !num.dataset.done) {
      num.dataset.done = '1';
      let current = 0;
      const step = Math.max(1, Math.floor(target / 60));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        num.textContent = current;
      }, 30);
    }
  });
}
window.addEventListener('scroll', animateCounters);

// ===== PAPER SCROLL UNROLL ON VISIBILITY =====
const menuWrapper = document.getElementById('menuWrapper');
const paperSheet = document.getElementById('paperSheet');
let paperAnimated = false;
const menuObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !paperAnimated) {
      paperAnimated = true;
      paperSheet.style.animation = 'unrollPaper 1.5s ease forwards';
    }
  });
}, { threshold: 0.2 });
if (menuWrapper) menuObserver.observe(menuWrapper);

// ===== GALLERY LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-card').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    const title = card.querySelector('h4');
    lightboxImg.src = img.src;
    lightboxCaption.textContent = title ? title.textContent : '';
    lightbox.classList.add('active');
  });
});

lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.classList.remove('active');
});

// ===== TILT EFFECT ON ABOUT CARDS =====
document.querySelectorAll('.about-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) perspective(800px) rotateY(0) rotateX(0)';
  });
});

// ===== SPECIALTIES INFINITE SCROLL (duplicate cards) =====
const slider = document.getElementById('specialtiesSlider');
if (slider) {
  const cards = slider.innerHTML;
  slider.innerHTML = cards + cards; // Duplicate for infinite loop
}

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== PARALLAX ON HERO LOGO =====
const heroLogo = document.getElementById('heroLogo');
window.addEventListener('mousemove', (e) => {
  if (!heroLogo) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  heroLogo.style.transform = `translate(${x}px, ${y}px) rotateY(${x}deg) rotateX(${-y}deg)`;
});

// ===== MENU HIGHLIGHT CARD HOVER GLOW =====
document.querySelectorAll('.menu-highlight-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212,168,67,0.12), rgba(255,255,255,0.03))`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = 'rgba(255,255,255,0.03)';
  });
});

// ===== GALLERY CARD 3D HOVER =====
document.querySelectorAll('.gallery-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
  });
});

// ===== LOGO PARTICLES IN CONTACT =====
(function createLogoParticles() {
  const container = document.getElementById('logoParticles');
  if (!container) return;
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position:absolute;width:4px;height:4px;background:#D4A843;border-radius:50%;
      top:${Math.random() * 100}%;left:${Math.random() * 100}%;
      animation:floatParticle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s;
      opacity:${0.3 + Math.random() * 0.5};
    `;
    container.appendChild(p);
  }
  // Add keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0%,100%{transform:translate(0,0) scale(1)}
      50%{transform:translate(${Math.random() > 0.5 ? '' : '-'}${10 + Math.random() * 20}px,${Math.random() > 0.5 ? '' : '-'}${10 + Math.random() * 20}px) scale(1.5)}
    }
    #logoParticles{position:absolute;inset:0;pointer-events:none}
  `;
  document.head.appendChild(style);
})();

console.log('🍗 Reddy Gari Military Hotel – Taste of Telangana Tradition');
