# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables (creates .env with API key)
npm run setup

# 3. Start development server
npm run dev
```

Visit `http://localhost:5173` to see your portfolio!

## Customization Checklist

### Step 1: Update Personal Info
- [ ] `Hero3D.tsx` - Change name and GitHub link
- [ ] `AboutSection.tsx` - Update bio and highlights
- [ ] `ContactSection.tsx` - Add your email, GitHub, LinkedIn

### Step 2: Add Your Projects

Your projects are managed through the **Base44 API**!

**To add projects:**
1. Go to your Base44 dashboard: https://app.base44.com
2. Navigate to the Project entity
3. Add projects with these fields:
   - `title` - Project name
   - `description` - What it does
   - `category` - PCB Design, IoT, Embedded Systems, etc.
   - `technologies` - Array of tech used
   - `image_url` - Project screenshot URL
   - `github_url` - GitHub repo link
   - `demo_url` - Live demo link
   - `featured` - true/false (highlights on homepage)
   - `completion_date` - When you finished it

Projects automatically appear on your portfolio! No code changes needed.

### Step 3: Update Experience
Edit `ExperienceTimeline.tsx` with your work and education history

### Step 4: Customize Skills
Edit `SkillsSection.tsx` to match your skill levels

### Step 5: Update Achievements
Edit `AchievementsSection.tsx` with your accomplishments

## Build for Production

```bash
npm run build
```

## Deploy

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### GitHub Pages
```bash
npm run build
# Then upload the dist/ folder to GitHub Pages
```

## Common Issues

**Issue: Three.js not rendering**
- Check browser console for WebGL support
- Update graphics drivers

**Issue: Slow performance**
- Reduce particle count in Hero3D.tsx (line 31)
- Disable some animations on mobile

**Issue: Images not loading**
- Check image URLs are valid
- Use optimized images (< 500KB)

## Need Help?

- Check the main [README.md](./README.md)
- Open an issue on GitHub
- Email: fkusiappiah@oberlin.edu

Happy coding! 🚀

