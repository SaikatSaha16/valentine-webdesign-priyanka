/**
 * Confetti System - Celebration Effect
 * Triggered when "Yes" button is clicked
 */

class ConfettiSystem {
  constructor(container) {
    this.container = container || document.getElementById('confettiContainer');
    this.pieces = [];
    this.animationId = null;

    // Configuration
    this.config = {
      pieceCount: this.isMobile() ? 50 : 100,
      colors: ['#ff4d6d', '#ffb3c6', '#ff8fab', '#ffc6d3', '#ff1744', '#f50057'],
      shapes: ['circle', 'square', 'triangle'],
      gravity: 0.5,
      wind: 0.1,
      duration: 4000
    };
  }

  /**
   * Check if mobile device
   */
  isMobile() {
    return window.innerWidth < 768;
  }

  /**
   * Create a single confetti piece
   */
  createPiece() {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';

    // Random properties
    const color = this.config.colors[Math.floor(Math.random() * this.config.colors.length)];
    const shape = this.config.shapes[Math.floor(Math.random() * this.config.shapes.length)];
    const size = Math.random() * 10 + 5;

    // Random starting position (top of screen)
    const startX = Math.random() * window.innerWidth;
    const startY = -20;

    // Random physics
    const velocityX = (Math.random() - 0.5) * 10;
    const velocityY = Math.random() * -15 - 5;
    const rotationSpeed = (Math.random() - 0.5) * 10;
    const rotation = Math.random() * 360;

    // Style the piece
    piece.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: ${startY}px;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      pointer-events: none;
      z-index: 9999;
      opacity: 1;
    `;

    // Shape-specific styling
    if (shape === 'circle') {
      piece.style.borderRadius = '50%';
    } else if (shape === 'triangle') {
      piece.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
    }

    // Store physics data
    piece.dataset.x = startX;
    piece.dataset.y = startY;
    piece.dataset.vx = velocityX;
    piece.dataset.vy = velocityY;
    piece.dataset.rotation = rotation;
    piece.dataset.rotationSpeed = rotationSpeed;
    piece.dataset.createdAt = Date.now();

    return piece;
  }

  /**
   * Update confetti piece position
   */
  updatePiece(piece) {
    // Get current values
    let x = parseFloat(piece.dataset.x);
    let y = parseFloat(piece.dataset.y);
    let vx = parseFloat(piece.dataset.vx);
    let vy = parseFloat(piece.dataset.vy);
    let rotation = parseFloat(piece.dataset.rotation);
    const rotationSpeed = parseFloat(piece.dataset.rotationSpeed);
    const createdAt = parseFloat(piece.dataset.createdAt);

    // Apply physics
    vy += this.config.gravity; // Gravity
    vx += (Math.random() - 0.5) * this.config.wind; // Wind

    x += vx;
    y += vy;
    rotation += rotationSpeed;

    // Calculate fade based on time alive
    const age = Date.now() - createdAt;
    const fadeStart = this.config.duration * 0.7;
    let opacity = 1;

    if (age > fadeStart) {
      opacity = 1 - (age - fadeStart) / (this.config.duration - fadeStart);
    }

    // Update DOM
    piece.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
    piece.style.opacity = opacity;

    // Update data
    piece.dataset.x = x;
    piece.dataset.y = y;
    piece.dataset.vx = vx;
    piece.dataset.vy = vy;
    piece.dataset.rotation = rotation;

    // Return true if piece should be removed
    return age > this.config.duration || y > window.innerHeight + 50 || opacity <= 0;
  }

  /**
   * Animation loop
   */
  animate() {
    // Update all pieces
    for (let i = this.pieces.length - 1; i >= 0; i--) {
      const piece = this.pieces[i];
      const shouldRemove = this.updatePiece(piece);

      if (shouldRemove) {
        piece.remove();
        this.pieces.splice(i, 1);
      }
    }

    // Continue animation if pieces exist
    if (this.pieces.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animate());
    }
  }

  /**
   * Create confetti burst
   */
  burst(pieceCount = this.config.pieceCount) {
    // Create confetti pieces
    for (let i = 0; i < pieceCount; i++) {
      const piece = this.createPiece();
      this.container.appendChild(piece);
      this.pieces.push(piece);
    }

    // Start animation
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.animate();
  }

  /**
   * Create continuous confetti (for extra celebration)
   */
  continuous(duration = 3000, interval = 100) {
    let elapsed = 0;
    const intervalId = setInterval(() => {
      this.burst(10);
      elapsed += interval;

      if (elapsed >= duration) {
        clearInterval(intervalId);
      }
    }, interval);
  }

  /**
   * Clear all confetti
   */
  clear() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    this.pieces.forEach(piece => piece.remove());
    this.pieces = [];
  }
}

// Initialize confetti system
if (document.getElementById('confettiContainer')) {
  window.confettiSystem = new ConfettiSystem();
}

// Also create a simple CSS-based confetti as fallback
const style = document.createElement('style');
style.textContent = `
  .confetti-piece {
    will-change: transform, opacity;
  }

  @media (prefers-reduced-motion: reduce) {
    .confetti-piece {
      animation: none !important;
      display: none;
    }
  }
`;
document.head.appendChild(style);
