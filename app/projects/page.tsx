import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../components/ThemeToggle";
import { fetchAllRepos } from "@/lib/github-api";
import { RepoData } from "@/lib/github-repos";

export const revalidate = 3600; // Revalidate every hour

export default async function Projects() {
  let repos: RepoData[] = [];
  
  try {
    repos = await fetchAllRepos();
  } catch (error) {
    console.error('Error fetching repos:', error);
    // Return empty array on error, page will still render
  }
  return (
    <main className="min-h-screen flex items-center justify-center md:justify-end px-6 py-12">
      <div className="max-w-4xl w-full md:mr-[15%]">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <Image
                src="/avatar.jpg"
                alt="Devadath"
                width={80}
                height={80}
                className="w-full h-full object-cover avatar-position"
                priority
                quality={100}
              />
            </div>
          </div>

          {/* Header Section */}
          <div className="flex-1">
            <Link href="/">
              <h1 className="text-4xl font-bold mb-4 hover:opacity-70 transition-opacity cursor-pointer">
                Devadath
              </h1>
            </Link>

            {/* Navigation */}
            <nav className="flex gap-8 text-xs">
              <Link
                href="/"
                className="text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors"
              >
                HOME
              </Link>
              <Link
                href="/projects"
                className="text-foreground hover:opacity-70 transition-opacity font-bold"
              >
                PROJECTS
              </Link>
              <Link
                href="/writings"
                className="text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors"
              >
                WRITINGS
              </Link>
              <Link
                href="/features"
                className="text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors"
              >
                FEATURES
              </Link>
            </nav>
          </div>

          {/* Spacer */}
          <div className="flex-[0.3]"></div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Content Section */}
        <div className="space-y-8 max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">Projects</h2>

          {repos.length === 0 ? (
            <p className="text-secondary">
              No projects configured yet. Add repositories to{" "}
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                lib/github-repos.ts
              </code>{" "}
              to display them here.
            </p>
          ) : (
            <div className="space-y-6">
              {repos.map((repo) => (
                <ProjectCard key={repo.fullName} repo={repo} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-sm text-secondary">© Devadath</footer>
      </div>
    </main>
  );
}

function ProjectCard({ repo }: { repo: RepoData }) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
      <div className="flex gap-4">
        {/* Optional: Project Image */}
        {repo.image && (
          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
            <Image
              src={repo.image}
              alt={repo.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Title and Languages */}
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-xl font-bold hover:opacity-70 transition-opacity">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {repo.name}
              </a>
            </h3>
            {repo.languages && repo.languages.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {repo.languages.map((language, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {language}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Date */}
          <p className="text-sm text-secondary mb-3">
            Created{" "}
            {new Date(repo.createdAt).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </p>

          {/* Description/README Preview */}
          <p className="text-sm text-secondary mb-4 line-clamp-3">
            {repo.readme || repo.description}
          </p>

          {/* Links */}
          <div className="flex gap-3 text-sm flex-wrap">
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:opacity-70 transition-opacity font-medium"
            >
              View on GitHub →
            </a>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-foreground transition-colors"
              >
                Live Demo →
              </a>
            )}
          </div>

          {/* Stars */}
          {repo.stars > 0 && (
            <div className="mt-3 flex items-center gap-1 text-xs text-secondary">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {repo.stars}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
