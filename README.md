# Personal Portfolio Website

A minimal and elegant personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✨ Clean and minimal design
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive
- ⚡ Built with Next.js 14
- 🎨 Styled with Tailwind CSS
- 🔤 TypeScript support

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your profile image:**
   - Place your profile image as `public/profile.jpg`
   - Recommended size: 200x200px or larger (square)

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Customization

### Update Personal Information

Edit `app/page.tsx` to update:
- Your name
- Bio text
- Links (micro.company, projects, writings, features)
- Social media links (Twitter, LinkedIn, Email)

### Theme Colors

Modify theme colors in `app/globals.css`:
- Light theme colors in `:root`
- Dark theme colors in `.dark`

### Navigation

Add more pages by creating new files in the `app` directory:
- `app/projects/page.tsx` for Projects page
- `app/writings/page.tsx` for Writings page
- `app/features/page.tsx` for Features page

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

### Quick Deploy

1. **Push your code to GitHub**
2. **Import your repository on [Vercel](https://vercel.com)**
3. **Add Environment Variables** (if needed):
   - `GITHUB_TOKEN` - Your GitHub Personal Access Token (for higher API rate limits)
   - `REVALIDATE_SECRET` - Secret token for on-demand revalidation API (optional)
4. **Deploy** - Vercel will automatically build and deploy your site!

### On-Demand Revalidation

To instantly update your projects page after making changes to your GitHub repos, call:

```bash
POST https://your-domain.vercel.app/api/revalidate/projects?secret=your-secret
```

Or set up a GitHub webhook:
1. Go to your repo → Settings → Webhooks
2. Add webhook with payload URL: `https://your-domain.vercel.app/api/revalidate/projects?secret=your-secret`
3. Select event: `Push` or `Repository`

## License

MIT License - Feel free to use this template for your own portfolio!

