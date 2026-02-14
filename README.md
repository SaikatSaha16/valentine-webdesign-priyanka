# 💝 Valentine Website for Priyanka

> *"She Clicked, I Fell" ❤️*

A modern, interactive, and beautifully crafted Valentine's Day website built with pure HTML, CSS, and JavaScript. Features advanced animations, particle effects, and delightful interactions designed to impress a pro developer! 🚀

![Version](https://img.shields.io/badge/version-1.0.0-ff4d6d)
![Mobile First](https://img.shields.io/badge/mobile-first-ff8fab)
![No Dependencies](https://img.shields.io/badge/dependencies-zero-success)
![Love](https://img.shields.io/badge/made_with-❤️-ff4d6d)

---

## ✨ Features

### 🎨 Visual Excellence
- **Mobile-First Design** - Optimized for all devices (320px to 4K)
- **Dark Mode Support** - Toggle between light and dark themes
- **Floating Particle System** - Romantic hearts floating in the background
- **Confetti Celebration** - Explosion of colors when she says YES!
- **Custom Cursor** - Smooth, interactive cursor effect (desktop)
- **Smooth Animations** - 60fps CSS animations with GPU acceleration

### 🎯 Interactive Features
- **Escaping "NO" Button** - The NO button runs away (classic viral effect!)
- **Typing Animation** - Question types out character by character
- **Escape Counter** - Tracks how many times she tries to click NO 😏
- **Persistent State** - Remembers her answer using localStorage
- **Sound Effects** - Celebration sounds and background music
- **Easter Eggs** - Hidden Konami code and secret interactions

### 💻 Technical Highlights (Developer Flex)
- **Zero Dependencies** - Pure vanilla JavaScript, no frameworks
- **Performance Optimized** - Lazy loading, debounced events, RAF animations
- **Accessible** - ARIA labels, keyboard navigation, reduced motion support
- **Clean Code** - Modular architecture, ES6+, well-documented
- **Responsive Images** - Optimized image loading
- **Cross-Browser** - Works on Chrome, Firefox, Safari, Edge

### 🎵 Audio System
- **Background Music** - Romantic tunes (when she says YES)
- **Sound Toggle** - Mute/unmute control
- **Auto-pause** - Music pauses when tab is hidden (battery-friendly)

---

## 🚀 Quick Start

### 1. Clone or Download
```bash
git clone https://github.com/yourusername/valentine-priyanka.git
cd valentine-priyanka
```

### 2. Add Sound Files (Optional)
Add these MP3 files to `assets/sounds/`:
- `success.mp3` - Plays when YES is clicked
- `hover.mp3` - Plays when NO button escapes
- `bg-music.mp3` - Background music loop

*See [assets/sounds/README.md](assets/sounds/README.md) for sound sources*

### 3. Add Your Photo
Replace `assets/images/placeholder.svg` with your couple photo:
- Recommended size: 800x600px
- Format: JPG or PNG
- Name it: `couple-photo.jpg` or update the image src in `index.html`

### 4. Customize the Content
Edit `js/app.js` to personalize:

```javascript
const CONFIG = {
  // Change this to your actual relationship start date!
  startDate: new Date('2024-02-14'),

  // Customize the success message
  successMessages: [
    "Your custom message here! 💕",
    // Add more messages...
  ]
};
```

### 5. Open in Browser
Simply open `index.html` in any modern browser. No build process needed! 🎉

---

## 📁 Project Structure

```
valentine-priyanka/
│
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Complete styling (mobile-first)
├── js/
│   ├── app.js             # Main application logic
│   ├── particles.js       # Floating hearts system
│   └── confetti.js        # Confetti celebration effect
├── assets/
│   ├── images/
│   │   └── placeholder.svg    # Placeholder image
│   └── sounds/
│       └── README.md          # Sound instructions
└── README.md              # This file
```

---

## 🎨 Customization Guide

### Change Colors
Edit CSS variables in `css/style.css`:

```css
:root {
  --primary: #ff4d6d;         /* Main pink */
  --primary-light: #ffb3c6;   /* Light pink */
  --primary-dark: #c9184a;    /* Dark pink */
  /* Customize to your liking! */
}
```

### Change Messages
Edit the messages in `js/app.js`:

```javascript
const CONFIG = {
  question: "Will you be my Valentine? 💕",
  successMessages: [
    "Add your own romantic messages here!",
    "Multiple messages will be shown randomly",
  ]
};
```

### Adjust Particle Count
For better performance on slower devices:

```javascript
// In js/particles.js
this.config = {
  maxParticles: 15,  // Reduce for slower devices
};
```

---

## 🌟 Advanced Features Explained

### 1. **Particle System**
- Canvas-based animation using `requestAnimationFrame`
- Optimized for mobile (fewer particles on small screens)
- Click/touch to create particle burst
- Auto-pauses when tab is hidden (saves battery)

### 2. **Confetti System**
- Pure JavaScript confetti (no libraries!)
- Physics simulation (gravity, wind, rotation)
- Fades out gracefully
- Responsive to screen size

### 3. **Smart "NO" Button**
- Calculates safe zones to avoid screen edges
- Gets smaller after 10 escape attempts
- Changes text after 20 attempts
- Mobile-friendly (touch events)

### 4. **Theme System**
- CSS variables for easy theming
- Persistent theme choice (localStorage)
- Smooth transitions
- Particles adapt to theme

### 5. **Easter Eggs**
- **Konami Code** (↑ ↑ ↓ ↓ ← → ← → B A) - Secret message!
- **Triple Click Title** - Heart beat animation
- More to discover... 🔍

---

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Full Support |
| Firefox | 88+     | ✅ Full Support |
| Safari  | 14+     | ✅ Full Support |
| Edge    | 90+     | ✅ Full Support |
| Mobile Safari | 14+ | ✅ Full Support |
| Chrome Mobile | 90+ | ✅ Full Support |

---

## 🚀 Deployment Options

### Option 1: GitHub Pages (Free & Easy)
```bash
# 1. Push to GitHub
git add .
git commit -m "Valentine website for Priyanka ❤️"
git push origin main

# 2. Enable GitHub Pages
# Go to: Settings > Pages > Source: main branch
# Your site will be live at: https://yourusername.github.io/valentine-priyanka
```

### Option 2: Netlify (Drag & Drop)
1. Go to [netlify.com](https://netlify.com)
2. Drag the project folder
3. Get instant URL!

### Option 3: Vercel
```bash
npm i -g vercel
vercel
```

### Option 4: Share via QR Code
Use any QR code generator to create a QR code of your deployed URL and share it with Priyanka! 📱

---

## 🎯 Performance Metrics

### Lighthouse Scores (Target)
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 90+

### Optimizations Applied
- ✅ Lazy loading images
- ✅ Debounced resize events
- ✅ RequestAnimationFrame for animations
- ✅ CSS containment for better rendering
- ✅ Reduced particles on mobile
- ✅ Auto-pause animations when tab hidden
- ✅ Preload critical assets

---

## 🛠️ Development

### Local Development
No build process needed! Just edit files and refresh browser.

### Code Style
- ES6+ JavaScript
- BEM-inspired CSS naming
- Mobile-first responsive design
- Semantic HTML5

### Adding New Features?
1. Keep it lightweight (no dependencies)
2. Test on mobile first
3. Consider performance
4. Add comments for complex logic

---

## 📝 TODO / Future Enhancements

- [ ] PWA support (installable on phone)
- [ ] More photo gallery section
- [ ] Countdown to next special date
- [ ] Love letter section
- [ ] Share button for social media
- [ ] Custom love song player
- [ ] Memory timeline

---

## 💌 Personalization Checklist

Before sharing with Priyanka:

- [ ] Update `startDate` in `js/app.js` to your relationship start date
- [ ] Add your couple photo to `assets/images/`
- [ ] Customize success messages in `js/app.js`
- [ ] Add sound files (optional)
- [ ] Test on mobile device
- [ ] Deploy to a public URL
- [ ] Create a QR code for easy sharing

---

## 🐛 Troubleshooting

### Particles not showing?
- Check browser console for errors
- Ensure `particleCanvas` element exists
- Try refreshing the page

### Sounds not playing?
- Modern browsers block autoplay - user interaction required first
- Check if sound files exist in `assets/sounds/`
- Click the sound toggle button

### "NO" button not moving?
- Ensure JavaScript is enabled
- Check if button has enough space to move (not at edge)

### Dark mode not working?
- Clear localStorage: `localStorage.clear()`
- Check theme toggle button

---

## 📄 License

This is a personal project made with ❤️ for Priyanka.
Feel free to fork and create your own version!

MIT License - See LICENSE file for details.

---

## 🙏 Credits

**Created by**: Saikat
**For**: Priyanka 💝
**Date**: February 14, 2026

### Inspiration
- Modern web animations
- Viral Valentine's Day websites
- Love and creativity ❤️

---

## 💬 Share Your Version!

If you create your own version:
1. Star this repo ⭐
2. Fork and customize
3. Share your deployed link!

---

<div align="center">

### Made with 💝 by Saikat for Priyanka

*"Code is poetry, and this is my love poem"*

[![GitHub](https://img.shields.io/badge/GitHub-View%20Source-ff4d6d?style=for-the-badge&logo=github)](https://github.com/yourusername/valentine-priyanka)

</div>

---

## 🎉 Final Notes

This website combines:
- ❤️ Romance
- 💻 Clean code
- 🎨 Beautiful design
- ⚡ Performance
- 📱 Mobile-first approach

Perfect for impressing a developer with both technical skills and romantic gesture!

**Pro Tip**: Send her the GitHub repo link so she can see the code too - she'll appreciate the clean architecture! 😉

Happy Valentine's Day! 💝
