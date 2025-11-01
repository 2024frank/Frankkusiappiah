# Deploy Your Portfolio in 5 Minutes

## Option 1: Vercel (Recommended - Easiest) ⭐

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
(This will open your browser to authenticate)

### Step 3: Deploy
```bash
vercel
```
Just press Enter to accept defaults!

### Step 4: Set Environment Variable
After deploy:
1. Go to vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - Name: VITE_BASE44_API_KEY
   - Value: 14a50d735e764232b4e41e3834b3f6c7
5. Click "Redeploy" to apply changes

### Step 5: Production Deploy
```bash
vercel --prod
```

✅ Done! Your portfolio is live at: https://your-portfolio.vercel.app

---

## Option 2: Netlify (Also Great)

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Build your project
```bash
npm run build
```

### Step 3: Deploy
```bash
netlify deploy --prod --dir=dist
```

### Step 4: Add Environment Variable
1. Go to app.netlify.com
2. Site Settings → Environment Variables
3. Add: VITE_BASE44_API_KEY = 14a50d735e764232b4e41e3834b3f6c7
4. Redeploy

✅ Done! Live at: https://your-portfolio.netlify.app

---

## Option 3: GitHub Pages (Free, but needs setup)

### Step 1: Push to GitHub first
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

### Step 2: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 3: Update package.json
Add to scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Add at top level:
```json
"homepage": "https://yourusername.github.io/portfolio"
```

### Step 4: Update vite.config.ts
```typescript
export default defineConfig({
  base: '/portfolio/',  // Your repo name
  // ... rest of config
})
```

### Step 5: Deploy
```bash
npm run deploy
```

⚠️ Note: API key will be in code (already set as fallback)

✅ Done! Live at: https://yourusername.github.io/portfolio

---

## Quick Comparison

| Platform | Speed | Setup | Custom Domain | Best For |
|----------|-------|-------|---------------|----------|
| **Vercel** | ⚡⚡⚡ | Easiest | ✅ Free | **Recommended** |
| **Netlify** | ⚡⚡⚡ | Easy | ✅ Free | Great alternative |
| **GitHub Pages** | ⚡⚡ | Medium | ✅ Paid | Open source |
| **Cloudflare** | ⚡⚡⚡ | Easy | ✅ Free | Advanced users |

---

## 🎯 I Recommend: Start with Vercel

It's the absolute easiest:

```bash
# 1. Install
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Production
vercel --prod
```

That's it! 🎉

See full guide: DEPLOYMENT.md
