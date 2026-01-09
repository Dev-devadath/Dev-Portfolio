export interface FeaturedPost {
  id: string;
  title: string;
  content: string; // Small excerpt/preview
  date: string; // ISO date string (e.g., "2025-01-15")
  image: string; // Path to thumbnail image
  url: string; // Post/article URL
}

// Add your featured posts/articles here
// Posts will be sorted by id (ascending order)
export const featuredPosts: FeaturedPost[] = [
  {
    id: "1",
    title: "Public product showcase at Kerala Innovation Festival",
    content:
      "Jarvis had his best public product showcase yet at the Kerala Innovation Festival hosted by Kerala Startup Mission and wow, what an experience it was. I got to meet some amazing founders, investors, and mentors...",
    date: "2025-05-15", // Will display as "May 2025"
    image: "/post1.jpg",
    url: "https://www.linkedin.com/posts/dev-devadath_keralainnovationfestival-jarvis-ai-activity-7357613688381431808-vaXb",
  },
  {
    id: "2",
    title: "Podcast interview",
    content:
      "An interview podcast with Sapience Edu Connect about Jarvis AI and my journey as a founder.",
    date: "2025-08-23", // Will display as "Jan 2026"
    image: "/post2.jpg",
    url: "https://youtu.be/ztNDeMkRqog?si=vp7dadpG66GIffWY",
  },
  {
    id: "3",
    title: "NASA SPACE APPS 2025",
    content:
      "Won first prize at NASA SPACE APPS local event and was the top runner up at the global event.",
    date: "2025-11-15", // Will display as "Jan 2026"
    image: "/post3.jpg",
    url: "https://www.linkedin.com/posts/dev-devadath_nasa-spaceappschallenge-urbanplanning-activity-7388392429504299008-fD4I",
  },
  {
    id: "4",
    title: "Maker Chat Session",
    content:
      "I’m leading a hands-on introduction to building the SO101 robotic arm using LeRobot by Hugging Face—sharing practical insights from my own build journey",
    date: "2025-12-15",
    image: "/post4.jpg",
    url: "https://www.linkedin.com/posts/makergram_makerchat-0x33-features-two-engaging-sessions-activity-7402220090823475200-G_ak",
  },
];
