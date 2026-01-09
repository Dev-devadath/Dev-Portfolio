// This file is now used only for TypeScript types
// Repos are automatically discovered via GitHub topics:
// - Add 'portfolio-featured-1' topic for top priority repos
// - Add 'portfolio-featured-2' topic for second priority repos
// - Add 'portfolio-featured-3' topic for third priority repos
// - Add 'portfolio-featured' topic for regular featured repos
//
// Repos will be displayed in order: featured-1, featured-2, featured-3, then featured

export interface RepoData {
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage: string | null;
  stars: number;
  languages: string[]; // Array of all languages
  createdAt: string;
  readme: string;
  image?: string;
}
