/* ============================================
   A Birthday Gift From My Heart
   Cinematic interactions & storytelling
   ============================================ */

(function () {
  'use strict';

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // ---------- UTILITIES ----------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- PARTICLES CANVAS ----------
  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];
    const PARTICLE_COUNT = prefersReducedMotion ? 20 : 55;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function createParticle() {
      const types = ['star', 'dust', 'heart', 'petal'];
      const type = types[Math.floor(Math.random() * types.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'heart' ? 3 + Math.random() * 3 : 1 + Math.random() * 2.5,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -0.05 - Math.random() * 0.12,
        opacity: 0.15 + Math.random() * 0.4,
        type,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.015
      };
    }

    function init() {
      resize();
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }
    }

    function drawHeart(x, y, size, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 10, size / 10);
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.bezierCurveTo(-5, -3, -12, 2, 0, 12);
      ctx.bezierCurveTo(12, 2, 5, -3, 0, 3);
      ctx.fillStyle = `rgba(255, 79, 163, ${opacity})`;
      ctx.fill();
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += p.pulseSpeed;

        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        const op = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));

        if (p.type === 'heart') {
          drawHeart(p.x, p.y, p.size, op * 0.7);
        } else if (p.type === 'petal') {
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size * 1.5, p.size * 0.6, p.pulse, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(244, 180, 0, ${op * 0.5})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          if (p.type === 'star') {
            ctx.fillStyle = `rgba(255, 255, 255, ${op})`;
          } else {
            ctx.fillStyle = `rgba(255, 180, 218, ${op * 0.6})`;
          }
          ctx.fill();
        }
      });
      requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', resize);
  }

  // ---------- SCROLL PROGRESS ----------
  function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }, { passive: true });
  }

  // ---------- INTRO SEQUENCE ----------
  function initIntro() {
    const intro = document.getElementById('intro');
    const btn = document.getElementById('openGiftBtn');
    if (!intro || !btn) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.intro-heart', { opacity: 1, scale: 1, duration: 1.2, delay: 0.3 })
      .to('.intro-title', { opacity: 1, y: 0, duration: 1 }, '-=0.6')
      .to('.intro-subtitle', { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
      .to('#openGiftBtn', { opacity: 1, y: 0, scale: 1, duration: 0.9 }, '-=0.4');

    btn.addEventListener('click', () => {
      // Magnetic ripple effect
      gsap.to(btn, { scale: 0.95, duration: 0.15, yoyo: true, repeat: 1 });

      gsap.to(intro, {
        opacity: 0,
        duration: 1.1,
        ease: 'power2.inOut',
        onComplete: () => {
          intro.classList.add('hidden');
          document.body.style.overflow = '';
          // Trigger hero entrance
          playHeroEntrance();
        }
      });
    });

    // Prevent scroll while intro is visible
    document.body.style.overflow = 'hidden';
  }

  // ---------- HERO ENTRANCE ----------
  function playHeroEntrance() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.sunflower', {
      opacity: 0.85,
      duration: 1.2,
      stagger: 0.15
    })
    .to('.hero-title .line', {
      opacity: 1,
      y: 0,
      duration: 1.1
    }, '-=0.6')
    .to('.hero-title .heart-emoji', {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.5')
    .to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 1
    }, '-=0.4')
    .to('.hero-scroll-hint', {
      opacity: 0.7,
      duration: 0.8
    }, '-=0.2');
  }

  // ---------- REVEAL TEXTS ON SCROLL ----------
  function initRevealTexts() {
    document.querySelectorAll('.reveal-text').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  // ---------- QUALITY CARDS ----------
  function initQualityCards() {
    gsap.utils.toArray('.quality-card').forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: i * 0.06,
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  // ---------- LOVE LETTER TYPEWRITER-STYLE ----------
  function initLoveLetter() {
    const lines = document.querySelectorAll('#loveLetterContent .type-line');
    if (!lines.length) return;

    gsap.to(lines, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      stagger: 0.22,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#loveLetterContent',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
  }

  // ---------- PROMISE SUNFLOWER ----------
  function initPromise() {
    gsap.to('.promise-sunflower', {
      opacity: 1,
      scale: 1,
      duration: 1.4,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '.promise-sunflower',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  // ---------- FINAL SCENE ----------
  function initFinalScene() {
    // Stars
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
      const count = prefersReducedMotion ? 30 : 80;
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 70 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = 2 + Math.random() * 3 + 's';
        const size = 1 + Math.random() * 2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        starsContainer.appendChild(star);
      }
    }

    // Fireflies
    const firefliesContainer = document.getElementById('fireflies');
    if (firefliesContainer && !prefersReducedMotion) {
      for (let i = 0; i < 12; i++) {
        const ff = document.createElement('div');
        ff.className = 'firefly';
        ff.style.left = 10 + Math.random() * 80 + '%';
        ff.style.top = 20 + Math.random() * 50 + '%';
        ff.style.animationDelay = Math.random() * 6 + 's';
        ff.style.animationDuration = 6 + Math.random() * 5 + 's';
        firefliesContainer.appendChild(ff);
      }
    }

    // Final content reveal
    const finalTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#final',
        start: 'top 60%',
        toggleActions: 'play none none none'
      }
    });

    finalTl
      .to('.final-title', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
      .to('.final-subtitle', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.6')
      .to('.final-wish', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.5')
      .to('.final-heart', { opacity: 1, duration: 0.8 }, '-=0.3');
  }

  // ---------- GALLERY ----------
  function initGallery() {
    const track = document.getElementById('galleryTrack');
    const prev = document.getElementById('galleryPrev');
    const next = document.getElementById('galleryNext');
    if (!track) return;

    const scrollAmount = () => {
      const item = track.querySelector('.gallery-item');
      return item ? item.offsetWidth + 24 : 300;
    };

    if (prev) {
      prev.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
      });
    }
    if (next) {
      next.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
      });
    }
  }

  // ---------- MAGNETIC BUTTONS ----------
  function initMagneticButtons() {
    if (prefersReducedMotion || window.innerWidth < 768) return;

    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.25,
          y: y * 0.25,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  // ---------- SECTION TITLE GLOW ON SCROLL ----------
  function initTitleGlows() {
    document.querySelectorAll('.section-title').forEach(title => {
      ScrollTrigger.create({
        trigger: title,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(title,
            { textShadow: '0 0 0px rgba(255,79,163,0)' },
            { textShadow: '0 0 40px rgba(255,79,163,0.3)', duration: 1.2 }
          );
        }
      });
    });
  }

  // ---------- INIT ALL ----------
  function init() {
    initParticles();
    initScrollProgress();
    initIntro();
    initRevealTexts();
    initQualityCards();
    initLoveLetter();
    initPromise();
    initFinalScene();
    initGallery();
    initMagneticButtons();
    initTitleGlows();

    // Soft parallax on mouse for hero (desktop only)
    if (!prefersReducedMotion && window.innerWidth > 1024) {
      document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 8;
        gsap.to('.sunflower-cluster', {
          x: x,
          y: y,
          duration: 1.2,
          ease: 'power2.out'
        });
      });
    }
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
