import { RepoData } from './github-repos';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional, for higher rate limits
const GITHUB_USERNAME = 'Dev-devadath'; // Your GitHub username

// Topics to look for (in priority order)
const FEATURED_TOPICS = [
  'portfolio-featured-1',  // Highest priority
  'portfolio-featured-2',  // Second priority
  'portfolio-featured-3',  // Third priority
  'portfolio-featured',    // Regular featured
];

export async function fetchRepoData(repoFullName: string): Promise<RepoData | null> {
  try {
    const [owner, repo] = repoFullName.split('/');
    
    // Create abort controller for timeout (fallback if AbortSignal.timeout not available)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    // Fetch repo details
    const repoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          ...(GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}),
          'User-Agent': 'Portfolio-Website',
        },
        next: { revalidate: 3600 }, // Revalidate every hour
        signal: controller.signal,
      }
    );
    
    clearTimeout(timeoutId);
    
    if (!repoResponse.ok) {
      if (repoResponse.status === 403) {
        // Rate limit exceeded
        const rateLimitRemaining = repoResponse.headers.get('x-ratelimit-remaining');
        const rateLimitReset = repoResponse.headers.get('x-ratelimit-reset');
        console.error(`Rate limit exceeded for repo ${repoFullName}. Remaining: ${rateLimitRemaining}, Resets at: ${rateLimitReset}`);
      } else {
        console.error(`Failed to fetch repo ${repoFullName}: ${repoResponse.status}`);
      }
      return null;
    }
    
    const repoData = await repoResponse.json();
    
    // Fetch languages
    let languages: string[] = [];
    try {
      const languagesController = new AbortController();
      const languagesTimeoutId = setTimeout(() => languagesController.abort(), 5000);
      
      const languagesResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/languages`,
        {
          headers: {
            ...(GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}),
            'User-Agent': 'Portfolio-Website',
          },
          signal: languagesController.signal,
        }
      );
      
      clearTimeout(languagesTimeoutId);
      
      if (languagesResponse.ok) {
        const languagesData = await languagesResponse.json();
        // Get all language names (keys of the object)
        languages = Object.keys(languagesData);
      }
    } catch (error) {
      // Silently fail, use primary language as fallback
      if (repoData.language) {
        languages = [repoData.language];
      }
    }
    
    // If no languages found, use primary language
    if (languages.length === 0 && repoData.language) {
      languages = [repoData.language];
    }
    
    // Fetch README
    let readme = '';
    let readmeImage: string | undefined;
    
    try {
      const readmeController = new AbortController();
      const readmeTimeoutId = setTimeout(() => readmeController.abort(), 10000);
      
      const readmeResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/readme`,
        {
          headers: {
            Accept: 'application/vnd.github.raw',
            'User-Agent': 'Portfolio-Website',
            ...(GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {})
          },
          next: { revalidate: 3600 },
          signal: readmeController.signal,
        }
      );
      
      clearTimeout(readmeTimeoutId);
      
      if (readmeResponse.ok) {
        const readmeContent = await readmeResponse.text();
        
        // Extract image from README (markdown or HTML)
        let imageMatch = readmeContent.match(/!\[.*?\]\((https?:\/\/[^\s\)]+)\)/);
        if (!imageMatch) {
          // Try HTML img tag
          const htmlImgMatch = readmeContent.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
          if (htmlImgMatch) {
            imageMatch = htmlImgMatch;
          }
        }
        if (imageMatch) {
          readmeImage = imageMatch[1];
        }
        
        // Extract multiple paragraphs (skip headers, images, and short lines)
        // Remove HTML img tags first to clean up the content
        let cleanedContent = readmeContent.replace(/<img[^>]*>/gi, '');
        
        // Split by double newlines (with optional whitespace)
        let paragraphs = cleanedContent
          .split(/\n\s*\n/)
          .map(p => p.trim())
          .filter(p => {
            // Skip headers, markdown images, code blocks, and very short/empty lines
            return (
              p.length > 20 &&
              !p.startsWith('#') &&
              !p.startsWith('![') &&
              !p.startsWith('```') &&
              !p.match(/^[-*+]\s/) && // Skip list items at start
              !p.match(/^\[/) && // Skip link-only lines
              !p.match(/^\.+$/) && // Skip lines with only dots
              !p.match(/^<[^>]+>$/) // Skip standalone HTML tags
            );
          });
        
        // If no paragraphs found, try splitting by single newlines
        if (paragraphs.length === 0) {
          paragraphs = cleanedContent
            .split('\n')
            .map(p => p.trim())
            .filter(p => {
              return (
                p.length > 20 &&
                !p.startsWith('#') &&
                !p.startsWith('![') &&
                !p.startsWith('```') &&
                !p.match(/^[-*+]\s/) &&
                !p.match(/^\[/) &&
                !p.match(/^\.+$/) &&
                !p.match(/^<[^>]+>$/)
              );
            });
        }
        
        // Get first 2-3 paragraphs for better intro
        const introParagraphs = paragraphs.slice(0, 3);
        readme = introParagraphs.join(' ').trim();
        
        // If still no readme content, use description
        if (!readme || readme.length < 20) {
          readme = repoData.description || '';
        }
        
        // Clean up markdown links and formatting
        readme = readme
          .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove markdown links
          .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
          .replace(/\*([^*]+)\*/g, '$1') // Remove italic
          .replace(/`([^`]+)`/g, '$1') // Remove code blocks
          .replace(/\n/g, ' ') // Replace newlines with spaces
          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
          .trim();
      }
    } catch (error) {
      console.error(`Error fetching README for ${repoFullName}:`, error);
    }
    
    return {
      name: repoData.name,
      fullName: repoData.full_name,
      description: repoData.description || '',
      url: repoData.html_url,
      homepage: repoData.homepage,
      stars: repoData.stargazers_count,
      languages: languages,
      createdAt: repoData.created_at,
      readme: readme.substring(0, 300), // First 300 chars (increased for more content)
      image: readmeImage || undefined, // Use README image if found, otherwise undefined (no GitHub avatar)
    };
  } catch (error: any) {
    // Handle different types of errors
    if (error.name === 'AbortError') {
      console.error(`Timeout fetching repo ${repoFullName}`);
    } else if (error.code === 'CERT_NOT_YET_VALID' || error.code === 'CERT_HAS_EXPIRED') {
      console.error(`Certificate error fetching repo ${repoFullName}. Please check your system clock.`);
    } else {
      console.error(`Error fetching repo ${repoFullName}:`, error.message || error);
    }
    return null;
  }
}

/**
 * Fetch all repos from user and filter by featured topics
 */
async function fetchUserRepos(): Promise<Array<{ full_name: string; topics: string[]; created_at: string }>> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: {
          ...(GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}),
          'User-Agent': 'Portfolio-Website',
          'Accept': 'application/vnd.github.mercy-preview+json', // Include topics in response
        },
        next: { revalidate: 3600 },
        signal: controller.signal,
      }
    );
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      if (response.status === 403) {
        // Rate limit exceeded
        const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
        const rateLimitReset = response.headers.get('x-ratelimit-reset');
        const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString() : 'unknown';
        console.error(`⚠️ GitHub API rate limit exceeded when fetching user repos.`);
        console.error(`   Remaining requests: ${rateLimitRemaining || 'unknown'}`);
        console.error(`   Resets at: ${resetTime}`);
        if (!GITHUB_TOKEN) {
          console.error(`   💡 SOLUTION: Add GITHUB_TOKEN to .env.local for 5000 requests/hour (vs 60/hour without token)`);
        }
      } else {
        console.error(`Failed to fetch user repos: ${response.status}`);
      }
      return [];
    }
    
    const repos = await response.json();
    
    // Fetch topics for each repo (topics might not be in the list response)
    const reposWithTopics = await Promise.all(
      repos.map(async (repo: any) => {
        // Topics should be in the response, but fetch separately if needed
        let topics = repo.topics || [];
        
        // If topics are empty, try fetching them separately
        if (!topics || topics.length === 0) {
          try {
            const topicsController = new AbortController();
            const topicsTimeoutId = setTimeout(() => topicsController.abort(), 5000);
            
            const topicsResponse = await fetch(
              `https://api.github.com/repos/${repo.full_name}/topics`,
              {
                headers: {
                  ...(GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}),
                  'User-Agent': 'Portfolio-Website',
                  'Accept': 'application/vnd.github.mercy-preview+json',
                },
                signal: topicsController.signal,
              }
            );
            
            clearTimeout(topicsTimeoutId);
            
            if (topicsResponse.ok) {
              const topicsData = await topicsResponse.json();
              topics = topicsData.names || [];
            }
          } catch (error) {
            // Silently fail, use empty array
            topics = [];
          }
        }
        
        return {
          full_name: repo.full_name,
          topics: topics,
          created_at: repo.created_at,
        };
      })
    );
    
    return reposWithTopics;
  } catch (error: any) {
    console.error('Error fetching user repos:', error.message || error);
    return [];
  }
}

/**
 * Get priority number from topic (e.g., 'portfolio-featured-1' -> 1)
 */
function getTopicPriority(topics: string[]): number {
  for (const topic of topics) {
    if (topic.startsWith('portfolio-featured-')) {
      const match = topic.match(/portfolio-featured-(\d+)/);
      if (match) {
        return parseInt(match[1], 10);
      }
    }
  }
  // If has 'portfolio-featured' but no number, return 999 (lowest priority)
  if (topics.includes('portfolio-featured')) {
    return 999;
  }
  return 0; // Not featured
}

/**
 * Check if repo has any featured topic
 */
function hasFeaturedTopic(topics: string[]): boolean {
  return topics.some(topic => 
    FEATURED_TOPICS.some(featuredTopic => topic === featuredTopic)
  );
}

export async function fetchAllRepos(): Promise<RepoData[]> {
  // Fetch all user repos
  const userRepos = await fetchUserRepos();
  
  // Filter repos with featured topics
  const featuredRepos = userRepos.filter(repo => hasFeaturedTopic(repo.topics));
  
  if (featuredRepos.length === 0) {
    return [];
  }
  
  // Sort by priority (1, 2, 3, then regular featured by created date)
  featuredRepos.sort((a, b) => {
    const priorityA = getTopicPriority(a.topics);
    const priorityB = getTopicPriority(b.topics);
    
    // If both have numbered priorities, sort by number
    if (priorityA < 999 && priorityB < 999) {
      return priorityA - priorityB;
    }
    
    // If one has numbered priority, it comes first
    if (priorityA < 999) return -1;
    if (priorityB < 999) return 1;
    
    // Both are regular featured (999), sort by created date (newest first)
    if (priorityA === 999 && priorityB === 999) {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA; // Newest first (descending)
    }
    
    return 0;
  });
  
  // Fetch detailed data for each featured repo
  const repoPromises = featuredRepos.map(repo => fetchRepoData(repo.full_name));
  const repos = await Promise.all(repoPromises);
  
  // Filter out nulls and maintain order
  const validRepos = repos.filter((repo): repo is RepoData => repo !== null);
  
  return validRepos;
}

