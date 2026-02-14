# 🚀 Quick Setup Guide

**Get your Valentine website ready in 5 minutes!**

---

## Step 1: Essential Customization (MUST DO)

### Open `js/app.js` and find line ~13:

```javascript
const CONFIG = {
  // CHANGE THIS! Set your relationship start date
  startDate: new Date('2024-02-14'),  // ← Change to your actual date
```

**Replace** `2024-02-14` with your actual relationship start date!
- Format: `YYYY-MM-DD`
- Example: `new Date('2023-06-15')`

This will show "X days of smiles" counter on the page.

---

## Step 2: Add Your Photo (Recommended)

1. **Find a nice couple photo** (800x600px recommended)

2. **Save it as:**
   - `assets/images/couple-photo.jpg` OR
   - `assets/images/couple-photo.png`

3. **Update the image reference in `index.html` (line ~73):**

```html
<!-- Change this: -->
<img src="assets/images/placeholder.svg" alt="Our memory" id="couplePhoto" class="couple-photo">

<!-- To this: -->
<img src="assets/images/couple-photo.jpg" alt="Our memory" id="couplePhoto" class="couple-photo">
```

**OR** just replace `placeholder.svg` with `couple-photo.jpg` in the filename!

---

## Step 3: Customize Messages (Optional but Sweet)

### In `js/app.js` around line ~17-23:

```javascript
successMessages: [
  // Replace these with your own messages!
  "Yayyy! 🎉 You just made me the happiest person ever!",
  "Every moment with you feels like a dream come true 💝",
  "You're not just my Valentine, you're my everything 💕",
  // Add more personalized messages here
  "Your custom message here! ❤️"
],
```

**Tips:**
- Add inside jokes
- Reference shared memories
- Keep them romantic but genuine
- The website will randomly pick one message

---

## Step 4: Add Sounds (Optional)

### Download 3 sound files (MP3 format):

1. **success.mp3** - Celebration sound (2-5 seconds)
   - Try: "yay", "celebration", "success" sounds

2. **hover.mp3** - Whoosh sound (< 1 second)
   - Try: "whoosh", "pop", "swoosh" sounds

3. **bg-music.mp3** - Romantic background music (30-60 seconds)
   - Try: romantic instrumentals, lo-fi beats

### Where to download (FREE):
- 🎵 [Pixabay](https://pixabay.com/sound-effects/) - No attribution needed
- 🎵 [Freesound](https://freesound.org/) - Needs attribution
- 🎵 [YouTube Audio Library](https://studio.youtube.com/) - Free music

### Save them to:
```
assets/sounds/success.mp3
assets/sounds/hover.mp3
assets/sounds/bg-music.mp3
```

**Note:** The website works perfectly without sounds too! Just skip this step if you want.

---

## Step 5: Test Locally

1. **Open** `index.html` in your browser
2. **Test on mobile** (use browser DevTools or your phone)
3. **Check:**
   - ✅ Days counter shows correct number
   - ✅ Your photo appears
   - ✅ Messages are personalized
   - ✅ Dark mode toggle works
   - ✅ "NO" button runs away 😄

---

## Step 6: Deploy (Make it Live!)

### Option A: GitHub Pages (Recommended - Free!)

```bash
# 1. Create a new GitHub repository
# Go to: https://github.com/new

# 2. In your project folder, run:
git init
git add .
git commit -m "💝 Valentine website for Priyanka"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main

# 3. Enable GitHub Pages:
# Go to: Settings > Pages > Source: main branch > Save

# 4. Your website will be live at:
# https://YOUR_USERNAME.github.io/YOUR_REPO_NAME
```

### Option B: Netlify (Super Easy - Drag & Drop!)

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Deploy manually"
3. Drag your entire project folder
4. Get instant URL! 🎉

### Option C: Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import from GitHub or drag folder
3. Deploy!

---

## Step 7: Share with Priyanka! 💝

### Creative Ways to Share:

1. **QR Code**
   - Generate at: [qr-code-generator.com](https://www.qr-code-generator.com/)
   - Print it on a Valentine's card! 💌

2. **Text Message**
   ```
   Hey Priyanka! 💝
   I made something special for you...
   [Your Website URL]
   ```

3. **Social Media**
   - Share the link
   - Tag her (if comfortable)

4. **In Person**
   - Show it on your phone
   - More romantic! ✨

---

## 🎨 Quick Color Change

Want different colors? Edit `css/style.css` line ~8:

```css
:root {
  --primary: #ff4d6d;        /* Change to your color! */
  --primary-light: #ffb3c6;  /* Lighter version */
  --primary-dark: #c9184a;   /* Darker version */
}
```

**Try these color schemes:**
- **Red Love**: `#e63946`, `#f1aeb5`, `#a4161a`
- **Purple Passion**: `#9d4edd`, `#e0aaff`, `#7209b7`
- **Blue Romance**: `#457b9d`, `#a8dadc`, `#1d3557`

Use [coolors.co](https://coolors.co/) to find perfect color combinations!

---

## 🐛 Troubleshooting

### Website not loading?
- Make sure all files are in correct folders
- Check browser console (F12) for errors

### Photo not showing?
- Check file path matches in HTML
- Ensure image file is in `assets/images/`
- Try JPG instead of PNG or vice versa

### Days counter showing wrong number?
- Check `startDate` format in `js/app.js`
- Must be: `new Date('YYYY-MM-DD')`

### Sounds not playing?
- Click somewhere on the page first (browser security)
- Check sound toggle button (top right)
- Verify MP3 files are in correct folder

---

## ✅ Final Checklist

Before sharing:

- [ ] Relationship start date updated
- [ ] Couple photo added
- [ ] Success messages customized
- [ ] Tested on phone
- [ ] Tested dark mode
- [ ] Sounds added (optional)
- [ ] Website deployed
- [ ] URL is live and working

---

## 💡 Pro Tips

1. **Test on HER phone** before sending (different screen sizes!)
2. **Send at the right time** (morning? evening? midnight surprise?)
3. **Don't over-explain** - let the website speak for itself
4. **Keep it a surprise** - don't tell her you're making it
5. **Send the GitHub link later** so she can see the code! (Developer appreciation bonus 😉)

---

## 🆘 Need Help?

- Check [README.md](README.md) for detailed documentation
- Check [assets/sounds/README.md](assets/sounds/README.md) for sound help
- Google the error message
- Ask ChatGPT or Claude for help with code

---

<div align="center">

### You're all set! 🎉

**Now go make Priyanka's day! 💝**

</div>

---

**Remember:** It's not about perfect code - it's about the effort and thought you put in! ❤️

Good luck! 🍀
