/**
 * Particle System - Floating Hearts Animation
 * Optimized for mobile performance
 */

class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.isActive = true;

    // Configuration
    this.config = {
      maxParticles: this.isMobile() ? 15 : 30,
      particleSize: this.isMobile() ? 20 : 30,
      speed: 0.5,
      symbols: ['❤️', '💕', '💖', '💝', '💗', '💓'],
      spawnRate: this.isMobile() ? 0.02 : 0.03
    };

    this.resize();
    this.setupEventListeners();
  }

  /**
   * Check if device is mobile
   */
  isMobile() {
    return window.innerWidth < 768;
  }

  /**
   * Setup responsive canvas
   */
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Update particle count on resize
    this.config.maxParticles = this.isMobile() ? 15 : 30;
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Debounced resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.resize(), 150);
    });

    // Pause particles when tab not visible (performance)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.resume();
      }
    });

    // Mouse interaction - create particles on click
    this.canvas.addEventListener('click', (e) => {
      this.createParticleBurst(e.clientX, e.clientY);
    });

    // Touch interaction
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        this.createParticleBurst(touch.clientX, touch.clientY);
      }
    });
  }

  /**
   * Create a single particle
   */
  createParticle(x = null, y = null) {
    const particle = {
      x: x !== null ? x : Math.random() * this.canvas.width,
      y: y !== null ? y : this.canvas.height + 50,
      size: this.config.particleSize + Math.random() * 10,
      speedY: -(this.config.speed + Math.random() * 0.5),
      speedX: (Math.random() - 0.5) * 0.5,
      symbol: this.config.symbols[Math.floor(Math.random() * this.config.symbols.length)],
      opacity: 0,
      fadeIn: true,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      life: 1,
      decay: 0.002 + Math.random() * 0.002
    };

    return particle;
  }

  /**
   * Create particle burst effect
   */
  createParticleBurst(x, y, count = 5) {
    for (let i = 0; i < count; i++) {
      const particle = this.createParticle(x, y);
      particle.speedY = -(Math.random() * 2 + 1);
      particle.speedX = (Math.random() - 0.5) * 3;
      particle.opacity = 1;
      particle.fadeIn = false;
      this.particles.push(particle);
    }
  }

  /**
   * Update particles
   */
  update() {
    // Spawn new particles randomly
    if (this.particles.length < this.config.maxParticles && Math.random() < this.config.spawnRate) {
      this.particles.push(this.createParticle());
    }

    // Update existing particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Update position
      p.y += p.speedY;
      p.x += p.speedX;

      // Update rotation
      p.rotation += p.rotationSpeed;

      // Fade in effect
      if (p.fadeIn && p.opacity < 1) {
        p.opacity += 0.02;
      }

      // Fade out effect
      p.life -= p.decay;
      if (p.life < 0.3) {
        p.opacity = p.life / 0.3;
      }

      // Add slight wave motion
      p.x += Math.sin(p.y * 0.01) * 0.5;

      // Remove dead particles
      if (p.life <= 0 || p.y < -50 || p.opacity <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  /**
   * Render particles
   */
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      this.ctx.save();

      // Set opacity
      this.ctx.globalAlpha = p.opacity;

      // Translate and rotate
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);

      // Draw particle (emoji)
      this.ctx.font = `${p.size}px Arial`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(p.symbol, 0, 0);

      this.ctx.restore();
    });
  }

  /**
   * Animation loop
   */
  animate() {
    if (!this.isActive) return;

    this.update();
    this.render();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  /**
   * Start animation
   */
  init() {
    this.isActive = true;
    this.animate();
  }

  /**
   * Pause animation
   */
  pause() {
    this.isActive = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  /**
   * Resume animation
   */
  resume() {
    if (!this.isActive) {
      this.isActive = true;
      this.animate();
    }
  }

  /**
   * Update theme (for dark mode)
   */
  updateTheme() {
    // Particles work in both themes, but we can adjust if needed
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    if (isDark) {
      // Slightly different particle behavior in dark mode
      this.config.symbols = ['❤️', '💕', '💖', '💝', '💗', '💓', '✨', '⭐'];
    } else {
      this.config.symbols = ['❤️', '💕', '💖', '💝', '💗', '💓'];
    }
  }

  /**
   * Destroy and cleanup
   */
  destroy() {
    this.pause();
    this.particles = [];
    window.removeEventListener('resize', this.resize);
  }
}

// Initialize particle system
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  window.particleSystem = new ParticleSystem(canvas);
}
