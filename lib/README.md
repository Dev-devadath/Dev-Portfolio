# GitHub Repositories Integration

This folder contains the configuration and API functions for fetching GitHub repositories to display on the Projects page.

## Setup Instructions

### 1. Add Topics to Your Repositories on GitHub

Instead of editing code, simply add topics to your repositories on GitHub:

1. Go to your repository on GitHub
2. Click on the gear icon next to "About" section
3. Add one of these topics:
   - **`portfolio-featured-1`** - Top priority (shows first)
   - **`portfolio-featured-2`** - Second priority (shows second)
   - **`portfolio-featured-3`** - Third priority (shows third)
   - **`portfolio-featured`** - Regular featured (shows after priority repos)

**Example:**

- Add `portfolio-featured-1` to your most important repo → It will appear first
- Add `portfolio-featured-2` to your second most important repo → It will appear second
- Add `portfolio-featured` to other repos you want to showcase → They'll appear after priority repos

### 2. **Add GitHub Token (Highly Recommended)**

**IMPORTANT**: Without a GitHub token, you'll hit rate limits quickly (60 requests/hour). With a token, you get 5000 requests/hour.

**To add a GitHub Personal Access Token:**

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Portfolio Website"
4. Select scope: `public_repo` (or just `public_repo` if you only need public repos)
5. Generate the token and copy it
6. Create `.env.local` file in the root directory:
   ```
   GITHUB_TOKEN=your_token_here
   ```
7. Restart your dev server

**Why this is important:**

- Without token: 60 requests/hour (can be exhausted quickly)
- With token: 5000 requests/hour (plenty for most use cases)
- Prevents 403 errors in production

### 3. How It Works

- **Automatic Discovery**: The system automatically fetches all your repositories
- **Topic-Based Filtering**: Only repos with featured topics are displayed
- **Priority Sorting**: Repos are sorted by topic priority (1, 2, 3, then regular featured)
- **Caching**: Repositories are fetched at build time and cached for 1 hour
- Each repository displays:
  - Project image from README (if available)
  - Project name (linked to GitHub)
  - Programming language badge
  - Last updated date
  - First 2-3 paragraphs from README (or description)
  - Star count
  - Links to GitHub and live demo (if available)

### 4. Customization

You can customize the display by editing:

- `app/projects/page.tsx` - Project card layout and styling
- `lib/github-api.ts` - Data fetching logic and topic names
- `lib/github-repos.ts` - TypeScript types

## Notes

- **No code changes needed**: Just add/remove topics on GitHub to control what's displayed
- **Priority system**: Use numbered topics (1, 2, 3) for fixed order, regular topic for auto-discovery
- **Sorting**: Repos with `portfolio-featured-1` appear first, then `-2`, then `-3`, then regular `portfolio-featured`
- Only public repositories can be fetched
- If a repository doesn't have a README, the description will be used instead
- Project images are automatically extracted from README markdown images
