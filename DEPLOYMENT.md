# Deployment Guide

Deploy your portfolio to the web in minutes!

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended) ⭐

**Why Vercel?**
- Automatic HTTPS
- Global CDN
- Zero configuration
- Free tier available

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   - Go to your project on vercel.com
   - Settings → Environment Variables
   - Add: `VITE_BASE44_API_KEY` = `14a50d735e764232b4e41e3834b3f6c7`
   - Redeploy

5. **Production Deploy**
   ```bash
   vercel --prod
   ```

**Custom Domain:**
- Go to Settings → Domains
- Add your domain (e.g., frankkusi.com)

---

### Option 2: Netlify

**Steps:**

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build your project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Add Environment Variables**
   - Go to Site Settings → Build & Deploy → Environment
   - Add: `VITE_BASE44_API_KEY` = `14a50d735e764232b4e41e3834b3f6c7`
   - Trigger redeploy

---

### Option 3: GitHub Pages

**Steps:**

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/portfolio",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/portfolio/', // Your repo name
     plugins: [react()],
     // ... rest of config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

**Note:** GitHub Pages doesn't support environment variables at build time. The API key will be in your code (already configured as fallback).

---

### Option 4: Cloudflare Pages

**Steps:**

1. **Build your project**
   ```bash
   npm run build
   ```

2. **Connect GitHub repo**
   - Go to pages.cloudflare.com
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `dist`

3. **Add Environment Variables**
   - Environment Variables section
   - Add: `VITE_BASE44_API_KEY` = `14a50d735e764232b4e41e3834b3f6c7`

---

## 🔐 Security Checklist

Before deploying:

- [ ] API key is in environment variables (not committed to Git)
- [ ] `.env` file is in `.gitignore`
- [ ] HTTPS is enabled on your domain
- [ ] Build completes without errors
- [ ] All images load correctly
- [ ] Contact form works (if integrated)

## ⚡ Performance Optimization

### Before Deployment

1. **Optimize Images**
   - Use WebP format when possible
   - Compress images (< 200KB each)
   - Use CDN URLs for better loading

2. **Reduce Bundle Size**
   ```bash
   npm run build
   # Check dist/ folder size - should be < 500KB
   ```

3. **Test Performance**
   ```bash
   npm run preview
   # Then run Lighthouse in Chrome DevTools
   ```

### Post-Deployment

1. **Check Lighthouse Scores**
   - Performance: > 90
   - Accessibility: > 95
   - Best Practices: > 90
   - SEO: > 90

2. **Test on Multiple Devices**
   - Desktop (Chrome, Firefox, Safari)
   - Mobile (iOS Safari, Chrome Android)
   - Tablet

## 🌐 Custom Domain Setup

### With Vercel

1. Buy domain (Namecheap, Google Domains, etc.)
2. In Vercel: Settings → Domains → Add Domain
3. Update DNS records as instructed
4. Wait for DNS propagation (5-30 minutes)

### With Netlify

1. Buy domain
2. In Netlify: Domain Settings → Add Custom Domain
3. Update nameservers or DNS records
4. Enable HTTPS (automatic)

## 📊 Analytics (Optional)

### Google Analytics

1. Create GA4 property at analytics.google.com
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `.env`:
   ```
   VITE_GA_TRACKING_ID=G-XXXXXXXXXX
   ```
4. Add to `index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

## 🔄 Continuous Deployment

### Automatic Deploys

Most platforms support automatic deployment:

**Vercel/Netlify:**
- Connect your GitHub repo
- Every push to `main` branch automatically deploys
- Pull requests get preview URLs

**Setup:**
1. Push code to GitHub
2. Connect repo in Vercel/Netlify dashboard
3. Configure build settings
4. Enable automatic deploys

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### White Screen After Deploy

- Check browser console for errors
- Verify all assets are loading (images, fonts)
- Check `vite.config.ts` base URL
- Verify API key is set in environment

### API Not Working

- Check environment variables are set correctly
- Verify API key is valid
- Check browser network tab for failed requests
- Ensure CORS is not blocking requests

### Images Not Loading

- Use absolute URLs (https://...)
- Check image URLs are accessible
- Verify content security policy

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Vite Docs:** https://vitejs.dev/guide/static-deploy.html

---

## ✅ Pre-Deploy Checklist

Before you deploy, make sure:

- [ ] Build completes successfully (`npm run build`)
- [ ] No console errors in dev mode
- [ ] All personal info is updated
- [ ] Projects are added in Base44
- [ ] Contact email is correct
- [ ] GitHub links work
- [ ] Images load properly
- [ ] Mobile responsive (test on phone)
- [ ] Environment variables set on hosting platform
- [ ] Custom domain configured (if using)
- [ ] Analytics setup (if desired)

---

**You're ready to deploy!** 🎉

Choose your preferred platform above and follow the steps. Your portfolio will be live in minutes!


