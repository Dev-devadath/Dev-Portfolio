import { MetadataRoute } from 'next'
import { fetchAllRepos } from '@/lib/github-api'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://devadath.dev'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/writings`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/writings/my-gift-my-curse`,
      lastModified: new Date('2026-07-10'),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ]

  // Try to fetch dynamic project pages (optional - only if you have individual project pages)
  // For now, we'll just return static pages since projects are listed on /projects
  // If you add individual project pages later, you can uncomment and modify this:
  
  /*
  try {
    const repos = await fetchAllRepos()
    const projectPages = repos.map((repo) => ({
      url: `${baseUrl}/projects/${repo.name.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date(repo.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
    return [...staticPages, ...projectPages]
  } catch (error) {
    console.error('Error fetching repos for sitemap:', error)
  }
  */

  return staticPages
}

