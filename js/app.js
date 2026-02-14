/**
 * Valentine Website for Priyanka 💝
 * Advanced Interactive Features
 * Author: Saikat
 */

// ==========================================
// Configuration & State Management
// ==========================================

const CONFIG = {
  // Relationship start date (Change this to your actual date!)
  startDate: new Date('2024-02-14'),

  // Messages
  question: "Will you be my Valentine? 💕",
  successMessages: [
    "Yayyy! 🎉 You just made me the happiest person ever!",
    "Every moment with you feels like a dream come true 💝",
    "You're not just my Valentine, you're my everything 💕",
    "I fall in love with you more and more each day 💖",
    "Thank you for being the amazing developer AND the love of my life 👩‍💻❤️"
  ],

  // Sounds
  sounds: {
    enabled: true,
    volume: 0.5
  },

  // Easter eggs
  konamiCode: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],

  // 🔥 NEW MAGIC FEATURES!
  magic: {
    // NO button secretly triggers YES (The Lying Button!)
    noButtonLies: true,

    // Love prediction AI settings
    predictionDelay: 3500, // 3.5 seconds for dramatic effect
    compatibilityScore: 100, // Always 100% 😉

    // Jealousy system
    jealousyEnabled: true,
    jealousyDelay: 2000, // Show message after 2 seconds away

    // Console easter eggs
    consoleMessages: [
      "💝 Hey developer! Enjoying the code?",
      "🔍 Found me! You're as curious as you are cute 😊",
      "💻 Clean code AND a beautiful heart? Perfect match!",
      "🎯 Fun fact: The NO button always becomes YES 😏",
      "❤️ Error 404: Reason not to love you - not found!",
      "🚀 This website is deployed with love.push() 💕"
    ]
  }
};

// Application State
const state = {
  escapeAttempts: 0,
  soundEnabled: CONFIG.sounds.enabled,
  konamiIndex: 0,
  hasAnswered: localStorage.getItem('hasAnswered') === 'true',

  // 🔥 NEW MAGIC STATE
  isAway: false,
  jealousyTimeout: null,
  predictionShown: false,
  consoleEasterEggShown: false
};

// ==========================================
// DOM Elements
// ==========================================

const elements = {
  // ✨ NEW: Romantic Landing Screen
  landingScreen: document.getElementById('landingScreen'),
  enterBtn: document.getElementById('enterBtn'),

  mainContent: document.getElementById('mainContent'),
  questionCard: document.getElementById('questionCard'),
  successCard: document.getElementById('successCard'),

  yesBtn: document.getElementById('yesBtn'),
  noBtn: document.getElementById('noBtn'),
  replayBtn: document.getElementById('replayBtn'),

  question: document.getElementById('question'),
  escapeCount: document.getElementById('escapeCount'),
  successMessage: document.getElementById('successMessage'),

  soundToggle: document.getElementById('soundToggle'),

  daysCount: document.getElementById('daysCount'),

  sounds: {
    landingMusic: document.getElementById('landingMusic'), // 🎵 NEW: Romantic landing music!
    success: document.getElementById('successSound'),
    hover: document.getElementById('hoverSound'),
    bgMusic: document.getElementById('bgMusic')
  },

  cursor: document.querySelector('.custom-cursor'),

  // 🔥 NEW MAGIC ELEMENTS!
  predictionCard: document.getElementById('predictionCard'),
  quizContainer: document.getElementById('quizContainer'),
  submitQuizBtn: document.getElementById('submitQuizBtn'),
  predictionResult: document.getElementById('predictionResult'),
  percentageValue: document.getElementById('percentageValue'),
  resultMessage: document.getElementById('resultMessage'),
  resultSubtitle: document.getElementById('resultSubtitle'),
  continueBtn: document.getElementById('continueBtn'),

  jealousyOverlay: document.getElementById('jealousyOverlay'),
  jealousyText: document.getElementById('jealousyText')
};

// ==========================================
// Utility Functions
// ==========================================

/**
 * Type text with animation
 */
function typeText(element, text, speed = 50) {
  let index = 0;
  element.textContent = '';

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
      } else {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

/**
 * Calculate days since start date
 */
function calculateDaysTogether() {
  const now = new Date();
  const diffTime = Math.abs(now - CONFIG.startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Animate counter
 */
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

/**
 * Play sound with error handling
 */
function playSound(soundElement) {
  if (!state.soundEnabled || !soundElement) return;

  soundElement.currentTime = 0;
  soundElement.volume = CONFIG.sounds.volume;

  const playPromise = soundElement.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log('Sound play prevented:', error);
    });
  }
}

/**
 * Get random message
 */
function getRandomMessage() {
  return CONFIG.successMessages[Math.floor(Math.random() * CONFIG.successMessages.length)];
}

/**
 * Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==========================================
// Sound Management
// ==========================================

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  elements.soundToggle.classList.toggle('muted', !state.soundEnabled);

  if (state.soundEnabled) {
    // Resume landing music if on landing screen
    if (!elements.landingScreen.style.display || elements.landingScreen.style.display !== 'none') {
      playSound(elements.sounds.landingMusic);
    }
    // Resume background music if on success screen
    playSound(elements.sounds.bgMusic);
  } else {
    // Pause all music
    elements.sounds.landingMusic.pause();
    elements.sounds.bgMusic.pause();
  }
}

// ==========================================
// Custom Cursor
// ==========================================

function initCustomCursor() {
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    elements.cursor.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    elements.cursor.classList.remove('active');
  });

  // Smooth cursor follow
  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;

    elements.cursor.style.left = cursorX + 'px';
    elements.cursor.style.top = cursorY + 'px';

    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  // Add hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('button, a, .btn');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      elements.cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      elements.cursor.classList.remove('hover');
    });
  });
}

// ==========================================
// No Button Escape Logic
// ==========================================

function handleNoButtonEscape() {
  state.escapeAttempts++;
  elements.escapeCount.textContent = state.escapeAttempts;

  // 🔥 MAGIC: The Lying NO Button!
  // After 3 escape attempts, clicking NO actually triggers YES! 😈
  if (CONFIG.magic.noButtonLies && state.escapeAttempts >= 3) {
    // Add click listener that will trigger YES
    const handleNoClick = () => {
      // Show funny message
      elements.question.textContent = "Nice try... but destiny said YES! 😏";

      // Brief delay before triggering YES
      setTimeout(() => {
        handleYesClick();
      }, 1500);

      // Remove this listener so it only triggers once
      elements.noBtn.removeEventListener('click', handleNoClick);
    };

    // Add the click listener
    elements.noBtn.addEventListener('click', handleNoClick, { once: true });
  }

  // Play hover sound
  playSound(elements.sounds.hover);

  // Get button dimensions
  const btnRect = elements.noBtn.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Calculate safe zone (avoid edges)
  const safeZone = 100;
  const maxX = viewportWidth - btnRect.width - safeZone;
  const maxY = viewportHeight - btnRect.height - safeZone;

  // Generate random position
  let newX = Math.random() * maxX + safeZone;
  let newY = Math.random() * maxY + safeZone;

  // Easter egg: After 10 attempts, make button smaller
  if (state.escapeAttempts > 10) {
    const scale = Math.max(0.3, 1 - (state.escapeAttempts - 10) * 0.05);
    elements.noBtn.style.transform = `scale(${scale})`;
  }

  // Easter egg: After 20 attempts, change text
  if (state.escapeAttempts === 20) {
    elements.noBtn.querySelector('.btn-text').textContent = "You sure? 🥺";
  }

  // 🔥 MAGIC: Hint that clicking NO will backfire
  if (state.escapeAttempts === 3) {
    elements.noBtn.querySelector('.btn-text').textContent = "Still No? 🤔";
  }

  // Move button
  elements.noBtn.style.position = 'fixed';
  elements.noBtn.style.left = `${newX}px`;
  elements.noBtn.style.top = `${newY}px`;
  elements.noBtn.style.zIndex = '1000';

  // Update question text based on attempts
  if (state.escapeAttempts === 5) {
    typeText(elements.question, "Come on, you know you want to say yes 😊");
  } else if (state.escapeAttempts === 10) {
    typeText(elements.question, "Still trying to escape? 😏");
  } else if (state.escapeAttempts === 15) {
    typeText(elements.question, "I can do this all day 💪");
  }
}

// ==========================================
// 🔥 MAGIC FEATURES - NEW!
// ==========================================

// Quiz Questions Data
const quizQuestions = [
  {
    question: "What's your favorite sweet?",
    correct: "Rosogolla",
    options: ["Rasmalai", "Gulab Jamun", "Sandesh"]
  },
  {
    question: "What's your favorite hobby?",
    correct: "Listening to music",
    options: ["Reading books", "Watching movies", "Playing games"]
  },
  {
    question: "What's your favorite snack?",
    correct: "Fuchka",
    options: ["Samosa", "Pakora", "Chaat"]
  },
  {
    question: "What's your favorite chocolate?",
    correct: "Anything that I gave you",
    options: ["Dairy Milk", "KitKat", "Snickers"]
  },
  {
    question: "What's your favorite food?",
    correct: "Biriyani",
    options: ["Fried Rice", "Chicken Curry", "Pizza"]
  },
  {
    question: "What's your dream travel destination?",
    correct: "Mountains",
    options: ["Beach", "Desert", "City"]
  }
];

// Quiz state
let userAnswers = {};

/**
 * Show Love Prediction AI Screen (Quiz Version!)
 */
async function showLovePrediction() {
  // Hide question card
  elements.questionCard.classList.add('hidden');

  // Show prediction card
  elements.predictionCard.classList.remove('hidden');

  // Create quiz
  createQuiz();

  // Show submit button
  elements.submitQuizBtn.classList.remove('hidden');
}

/**
 * Create quiz questions
 */
function createQuiz() {
  elements.quizContainer.innerHTML = '';

  quizQuestions.forEach((q, index) => {
    // Shuffle options with correct answer
    const allOptions = [...q.options, q.correct];
    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question';
    questionDiv.innerHTML = `
      <h3>${index + 1}. ${q.question}</h3>
      <div class="quiz-options">
        ${shuffledOptions.map((option, optIndex) => `
          <div class="quiz-option" data-question="${index}" data-answer="${option}">
            <input type="radio"
                   id="q${index}_opt${optIndex}"
                   name="question${index}"
                   value="${option}">
            <label for="q${index}_opt${optIndex}">${option}</label>
          </div>
        `).join('')}
      </div>
    `;

    elements.quizContainer.appendChild(questionDiv);
  });

  // Add click handlers to options
  document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', function() {
      const radio = this.querySelector('input[type="radio"]');
      radio.checked = true;

      // Remove selected class from siblings
      const questionIndex = this.dataset.question;
      document.querySelectorAll(`.quiz-option[data-question="${questionIndex}"]`).forEach(opt => {
        opt.classList.remove('selected');
      });

      // Add selected class to this option
      this.classList.add('selected');

      // Store answer
      userAnswers[questionIndex] = this.dataset.answer;

      // Check if all questions answered
      if (Object.keys(userAnswers).length === quizQuestions.length) {
        elements.submitQuizBtn.disabled = false;
      }
    });
  });

  // Add submit handler
  elements.submitQuizBtn.addEventListener('click', calculateQuizResult, { once: true });
}

/**
 * Calculate quiz result
 */
async function calculateQuizResult() {
  // Calculate score
  let correctCount = 0;
  quizQuestions.forEach((q, index) => {
    if (userAnswers[index] === q.correct) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / quizQuestions.length) * 100);

  // Hide quiz
  elements.quizContainer.classList.add('hidden');
  elements.submitQuizBtn.classList.add('hidden');

  // Show result
  elements.predictionResult.classList.remove('hidden');

  // Animate percentage counter
  animatePercentage(percentage);

  // Update message based on score
  let message, subtitle;
  if (percentage === 100) {
    message = "PERFECT MATCH! 🎉";
    subtitle = "You know me better than I know myself! 💝";
  } else if (percentage >= 80) {
    message = "AMAZING! 💕";
    subtitle = "You really pay attention to me! 🥰";
  } else if (percentage >= 60) {
    message = "GREAT! 💖";
    subtitle = "You know me quite well! 😊";
  } else if (percentage >= 40) {
    message = "NOT BAD! 💗";
    subtitle = "There's still so much to discover about each other! 🌟";
  } else {
    message = "IT'S OKAY! 💕";
    subtitle = "We have a lifetime to learn about each other! 💝";
  }

  elements.resultMessage.textContent = message;
  elements.resultSubtitle.textContent = subtitle;

  // Trigger confetti if score is good
  if (percentage >= 60 && window.confettiSystem) {
    setTimeout(() => window.confettiSystem.burst(), 500);
  }
}

/**
 * Animate percentage counter (0 to 100)
 */
function animatePercentage(target) {
  let current = 0;
  const duration = 2000;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      elements.percentageValue.textContent = target;
      clearInterval(timer);
    } else {
      elements.percentageValue.textContent = Math.floor(current);
    }
  }, 16);
}

/**
 * Show final success message after prediction
 */
async function showSuccessAfterPrediction() {
  // Hide prediction card
  elements.predictionCard.classList.add('hidden');

  // Show success card
  elements.successCard.classList.remove('hidden');

  // Trigger more confetti!
  if (window.confettiSystem) {
    window.confettiSystem.burst();
  }

  // Type success message
  const message = getRandomMessage();
  await typeText(elements.successMessage, message, 30);

  // Play background music
  playSound(elements.sounds.bgMusic);
}

/**
 * Jealousy System - Track when user leaves tab
 */
function initJealousySystem() {
  if (!CONFIG.magic.jealousyEnabled) return;

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // User left the page
      state.isAway = true;

      // Show jealousy message after delay
      state.jealousyTimeout = setTimeout(() => {
        if (state.isAway) {
          showJealousyMessage();
        }
      }, CONFIG.magic.jealousyDelay);

    } else {
      // User came back
      state.isAway = false;

      // Clear timeout if they come back quickly
      if (state.jealousyTimeout) {
        clearTimeout(state.jealousyTimeout);
      }

      // If jealousy message is showing, update it
      if (!elements.jealousyOverlay.classList.contains('hidden')) {
        elements.jealousyText.textContent = "Yay! You're back! 💕";
        elements.jealousyOverlay.querySelector('.jealousy-subtitle').textContent = "I missed you 😊";
        elements.jealousyOverlay.querySelector('.jealousy-emoji').textContent = "😊";

        // Hide after 2 seconds
        setTimeout(() => {
          elements.jealousyOverlay.classList.add('hidden');
        }, 2000);
      }
    }
  });
}

/**
 * Show jealousy message overlay
 */
function showJealousyMessage() {
  const messages = [
    { emoji: "🥺", title: "Hey... where did you go?", subtitle: "I was having such a good time..." },
    { emoji: "😢", title: "Did I say something wrong?", subtitle: "Come back please..." },
    { emoji: "💔", title: "You left me hanging...", subtitle: "I'll be waiting here for you" },
    { emoji: "🥺", title: "Missing you already...", subtitle: "Even if it's just another tab" }
  ];

  const message = messages[Math.floor(Math.random() * messages.length)];

  elements.jealousyOverlay.querySelector('.jealousy-emoji').textContent = message.emoji;
  elements.jealousyText.textContent = message.title;
  elements.jealousyOverlay.querySelector('.jealousy-subtitle').textContent = message.subtitle;

  elements.jealousyOverlay.classList.remove('hidden');
}

/**
 * Console Easter Eggs for Developer Appreciation!
 */
function initConsoleEasterEggs() {
  if (state.consoleEasterEggShown) return;

  // Random console message
  const messages = CONFIG.magic.consoleMessages;
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  // Styled console output
  console.log('%c' + randomMessage, 'color: #ff4d6d; font-size: 16px; font-weight: bold; text-shadow: 2px 2px 4px rgba(255,77,109,0.3);');

  // Fun ASCII art
  console.log('%c' + `
  ╔═══════════════════════════════════╗
  ║   💝 VALENTINE WEBSITE v1.0 💝    ║
  ║   Made with ❤️  by Saikat         ║
  ║   For: Priyanka 💕                ║
  ╚═══════════════════════════════════╝
  `, 'color: #ff8fab; font-family: monospace;');

  // Technical Easter Egg
  console.log('%c🔍 Developer Mode Activated!', 'color: #ff4d6d; font-weight: bold;');
  console.log('%cFun Facts:', 'color: #ff8fab; font-weight: bold;');
  console.log('• Zero dependencies used - Pure vanilla JS! 🚀');
  console.log('• 60fps animations with RequestAnimationFrame ⚡');
  console.log('• Mobile-first responsive design 📱');
  console.log('• The NO button? It always secretly becomes YES 😉');
  console.log('%c\nWant to see the magic? Check out the source code! 💻', 'color: #ff6b9d; font-style: italic;');

  state.consoleEasterEggShown = true;
}

/**
 * 🎵 Romantic Landing Music - Auto-play with fade-in
 */
function initLandingMusic() {
  const music = elements.sounds.landingMusic;
  if (!music || !state.soundEnabled) return;

  // Set volume low for romantic effect
  music.volume = 0;

  // Try to auto-play (works after user interaction)
  const playPromise = music.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        // Fade in the music smoothly
        let volume = 0;
        const fadeIn = setInterval(() => {
          if (volume < 0.3) {
            volume += 0.01;
            music.volume = volume;
          } else {
            clearInterval(fadeIn);
          }
        }, 50);
      })
      .catch(error => {
        // Auto-play blocked by browser - will play on first user interaction
        console.log('🎵 Music will play on first interaction');

        // Play on any user interaction
        const playOnInteraction = () => {
          music.play();
          let volume = 0;
          const fadeIn = setInterval(() => {
            if (volume < 0.3) {
              volume += 0.01;
              music.volume = volume;
            } else {
              clearInterval(fadeIn);
            }
          }, 50);
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
        };

        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });
      });
  }
}

/**
 * Stop landing music with fade-out
 */
function stopLandingMusic() {
  const music = elements.sounds.landingMusic;
  if (!music) return;

  // Fade out
  let volume = music.volume;
  const fadeOut = setInterval(() => {
    if (volume > 0) {
      volume -= 0.02;
      music.volume = Math.max(0, volume);
    } else {
      clearInterval(fadeOut);
      music.pause();
      music.currentTime = 0;
    }
  }, 50);
}

// ==========================================
// Success Flow
// ==========================================

async function handleYesClick() {
  // Save answer
  localStorage.setItem('hasAnswered', 'true');
  state.hasAnswered = true;

  // Play success sound
  playSound(elements.sounds.success);

  // 🔥 MAGIC: Show Love Prediction AI instead of direct success!
  if (!state.predictionShown) {
    state.predictionShown = true;
    await showLovePrediction();
  } else {
    // If prediction already shown, go to success directly
    await showSuccessDirectly();
  }
}

/**
 * Show success directly (used on replay or if prediction already shown)
 */
async function showSuccessDirectly() {
  // Hide question card
  elements.questionCard.classList.add('hidden');

  // Show success card
  elements.successCard.classList.remove('hidden');

  // Trigger confetti
  if (window.confettiSystem) {
    window.confettiSystem.burst();
  }

  // Type success message
  const message = getRandomMessage();
  await typeText(elements.successMessage, message, 30);

  // Play background music
  playSound(elements.sounds.bgMusic);
}

// ==========================================
// Replay Functionality
// ==========================================

function handleReplay() {
  // Reset state
  state.escapeAttempts = 0;
  state.hasAnswered = false;
  localStorage.removeItem('hasAnswered');

  // 🔥 Reset magic state
  state.predictionShown = false;
  userAnswers = {}; // Reset quiz answers

  // Reset UI
  elements.escapeCount.textContent = '0';
  elements.noBtn.style.position = 'relative';
  elements.noBtn.style.transform = 'scale(1)';
  elements.noBtn.querySelector('.btn-text').textContent = 'No 🙄';

  // Hide all cards
  elements.successCard.classList.add('hidden');
  elements.predictionCard.classList.add('hidden');
  elements.predictionResult.classList.add('hidden');
  elements.quizContainer.classList.remove('hidden');
  elements.submitQuizBtn.classList.add('hidden');

  // Show question card
  elements.questionCard.classList.remove('hidden');

  // Retype question
  typeText(elements.question, CONFIG.question);
}

// ==========================================
// Easter Eggs
// ==========================================

// Konami Code Easter Egg
function initKonamiCode() {
  document.addEventListener('keydown', (e) => {
    if (e.key === CONFIG.konamiCode[state.konamiIndex]) {
      state.konamiIndex++;
      if (state.konamiIndex === CONFIG.konamiCode.length) {
        triggerKonamiEasterEgg();
        state.konamiIndex = 0;
      }
    } else {
      state.konamiIndex = 0;
    }
  });
}

function triggerKonamiEasterEgg() {
  // Secret message for Priyanka
  alert("🎮 Dev Mode Activated! You found the secret! 🎉\n\nYou're not just beautiful, you're brilliantly smart too! 💝");

  // Extra confetti
  if (window.confettiSystem) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => window.confettiSystem.burst(), i * 200);
    }
  }
}

// Double-click easter egg on title
function initTitleEasterEgg() {
  let clickCount = 0;
  const title = document.getElementById('title');

  title.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 3) {
      title.style.animation = 'heartBeat 0.5s ease 3';
      setTimeout(() => {
        title.style.animation = '';
      }, 1500);
      clickCount = 0;
    }
  });
}

// ==========================================
// Initialization
// ==========================================

async function init() {
  // ✨ ROMANTIC LANDING SCREEN - Wait for user to enter
  // (Landing screen shows automatically, no timeout needed)

  // Initialize features immediately
  initCustomCursor();
  initKonamiCode();
  initTitleEasterEgg();

  // 🔥 Initialize MAGIC features!
  initJealousySystem();
  initConsoleEasterEggs();

  // 🎵 Start romantic landing music!
  initLandingMusic();

  // Initialize particles if available
  if (window.particleSystem) {
    window.particleSystem.init();
  }
}

/**
 * ✨ Handle landing screen "Enter" button click
 */
async function handleEnterClick() {
  // 🎵 Fade out romantic music
  stopLandingMusic();

  // Fade out landing screen with beautiful transition
  elements.landingScreen.style.transition = 'opacity 1s ease, transform 1s ease';
  elements.landingScreen.style.opacity = '0';
  elements.landingScreen.style.transform = 'scale(1.1)';

  // Wait for fade animation
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Hide landing screen
  elements.landingScreen.style.display = 'none';

  // Show main content
  elements.mainContent.classList.remove('hidden');

  // Calculate and animate days together
  const daysTogether = calculateDaysTogether();
  animateCounter(elements.daysCount, daysTogether);

  // Type the question with dramatic effect
  await typeText(elements.question, CONFIG.question);

  // Don't auto-show success - let user interact with buttons
  // (Removed auto-advance on page reload)
}

// ==========================================
// Event Listeners
// ==========================================

// ✨ ROMANTIC LANDING: Enter button
elements.enterBtn.addEventListener('click', handleEnterClick);

// Button clicks
elements.yesBtn.addEventListener('click', handleYesClick);
elements.replayBtn.addEventListener('click', handleReplay);

// 🔥 NEW: Continue button (from prediction to success)
elements.continueBtn.addEventListener('click', showSuccessAfterPrediction);

// No button hover (desktop) and touch (mobile)
elements.noBtn.addEventListener('mouseenter', handleNoButtonEscape);
elements.noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  handleNoButtonEscape();
});

// Controls
elements.soundToggle.addEventListener('click', toggleSound);

// Prevent context menu on mobile for better UX
document.addEventListener('contextmenu', (e) => {
  if (e.target.closest('button')) {
    e.preventDefault();
  }
});

// Handle visibility change (pause music when tab hidden)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    elements.sounds.bgMusic.pause();
  } else if (state.soundEnabled && state.hasAnswered) {
    playSound(elements.sounds.bgMusic);
  }
});

// ==========================================
// Performance Optimization
// ==========================================

// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ==========================================
// Start Application
// ==========================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ==========================================
// Export for debugging (dev mode)
// ==========================================

if (process.env.NODE_ENV === 'development') {
  window.valentineApp = {
    state,
    config: CONFIG,
    elements,
    playSound,
    triggerKonamiEasterEgg
  };
}
