# Base44 API Setup Guide

Your portfolio is now connected to the **Base44 API** for dynamic project management!

## 🔑 API Configuration

### 1. Environment Variables

Create a `.env` file in the project root with your API key:

```bash
# .env
VITE_BASE44_API_KEY=14a50d735e764232b4e41e3834b3f6c7
```

> **Note:** The API key is already configured in the code with a fallback, but using a `.env` file is recommended for security.

### 2. API Endpoints

**Base URL:** `https://app.base44.com/api/apps/690018262fbe2ee995ff1584`

**Your App ID:** `690018262fbe2ee995ff1584`

## 📋 Managing Projects

### Through Base44 Dashboard

1. Visit: https://app.base44.com
2. Navigate to your app
3. Go to the **Project** entity
4. Add, edit, or delete projects

### Project Schema

```typescript
{
  id: string;                    // Auto-generated
  title: string;                 // Required
  description: string;           // Required
  category: string;              // Required - See categories below
  technologies?: string[];       // Array of tech stack
  image_url?: string;           // Project screenshot URL
  github_url?: string;          // GitHub repository
  demo_url?: string;            // Live demo link
  featured?: boolean;           // Show on homepage (default: false)
  completion_date?: string;     // ISO date format
}
```

### Available Categories

- **PCB Design**
- **Embedded Systems**
- **Power Electronics**
- **RF Design**
- **IoT**
- **Automation**
- **Circuit Design**

## 🚀 Using the API in Code

The Base44 client is available throughout your app:

```typescript
import { base44 } from '@/api/base44Client';

// List all projects (sorted by most recent)
const projects = await base44.entities.Project.list('-created_date');

// Get a specific project
const project = await base44.entities.Project.get('project-id');

// Create a new project
const newProject = await base44.entities.Project.create({
  title: 'My New Project',
  description: 'An amazing IoT system',
  category: 'IoT',
  technologies: ['Python', 'React', 'AWS'],
  featured: true,
  completion_date: '2025-01-15'
});

// Update a project
await base44.entities.Project.update('project-id', {
  title: 'Updated Title',
  featured: true
});

// Delete a project
await base44.entities.Project.delete('project-id');

// Filter by category
const iotProjects = await base44.entities.Project.filterByCategory('IoT');

// Get only featured projects
const featured = await base44.entities.Project.getFeatured();
```

## 🔧 API Client Features

The Base44 client (`src/api/base44Client.ts`) includes:

✅ **Full CRUD operations** (Create, Read, Update, Delete)  
✅ **Type-safe TypeScript interfaces**  
✅ **Error handling** with console logging  
✅ **Response normalization** (handles different response formats)  
✅ **Filtering capabilities** (by category, featured status)  
✅ **Sorting support** (by any field)  
✅ **Automatic authentication** (API key in headers)

## 🛡️ Security Best Practices

### For Development
- Keep the API key in `.env` file
- The `.env` file is gitignored (don't commit it)

### For Production
- Set `VITE_BASE44_API_KEY` as an environment variable in your hosting platform:
  - **Vercel:** Project Settings → Environment Variables
  - **Netlify:** Site Settings → Build & Deploy → Environment
  - **GitHub Pages:** Use GitHub Secrets

## 📊 Example Project Data

Here's an example of a complete project entry:

```json
{
  "title": "Environmental Dashboard IoT System",
  "description": "Distributed IoT sensor network processing 10,000+ readings daily with real-time monitoring and anomaly detection across 30+ sensors.",
  "category": "IoT",
  "technologies": [
    "Python",
    "IoT Sensors",
    "Data Pipelines",
    "Grafana",
    "Real-time Processing",
    "Cloud APIs"
  ],
  "image_url": "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800",
  "github_url": "https://github.com/2024frank/environmental-dashboard",
  "demo_url": "https://dashboard.oberlin.edu",
  "featured": true,
  "completion_date": "2025-01-15"
}
```

## 🔄 How It Works

1. **On Page Load:** The Portfolio component fetches projects using React Query
2. **Caching:** React Query caches the data for better performance
3. **Auto-refresh:** Projects update when you add/edit them in Base44
4. **Error Handling:** If the API fails, an empty array is returned (graceful degradation)

## 🐛 Troubleshooting

### Projects not showing up?
- Check browser console for API errors
- Verify API key is correct in `.env`
- Ensure projects exist in your Base44 dashboard
- Check network tab for failed requests

### API errors?
- Verify the app ID is correct: `690018262fbe2ee995ff1584`
- Check that your API key has proper permissions
- Ensure your Base44 subscription is active

### CORS errors?
- Base44 API should handle CORS automatically
- If issues persist, contact Base44 support

## 📞 Support

- **Base44 Docs:** https://docs.base44.com
- **Base44 Support:** support@base44.com
- **Your Portfolio Issues:** Open an issue on your GitHub repo

---

**Your portfolio is now fully integrated with Base44!** 🎉

Add projects through the Base44 dashboard and watch them appear automatically on your portfolio.


