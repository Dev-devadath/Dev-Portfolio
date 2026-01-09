import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../components/ThemeToggle";
import { featuredPosts, FeaturedPost } from "@/lib/linkedin-posts";

export default function Features() {
  // Sort posts by id (ascending order)
  const sortedPosts = [...featuredPosts].sort((a, b) => {
    const numA = parseInt(a.id, 10);
    const numB = parseInt(b.id, 10);
    return numA - numB;
  });

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
                className="text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors"
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
                className="text-foreground hover:opacity-70 transition-opacity font-bold"
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
          <h2 className="text-3xl font-bold mb-8">Features</h2>

          {sortedPosts.length === 0 ? (
            <p className="text-secondary">
              No featured posts yet. Add posts to{" "}
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                lib/linkedin-posts.ts
              </code>{" "}
              to display them here.
            </p>
          ) : (
            <div className="space-y-6">
              {sortedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
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

function PostCard({ post }: { post: FeaturedPost }) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
      <div className="flex gap-4">
        {/* Post Thumbnail */}
        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
          <Image
            src={post.image}
            alt={post.title}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="text-xl font-bold mb-2 hover:opacity-70 transition-opacity">
            {post.title}
          </h3>

          {/* Date */}
          <p className="text-sm text-secondary mb-3">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </p>

          {/* Content Preview */}
          <p className="text-sm text-secondary mb-4 line-clamp-3">
            {post.content}
          </p>

          {/* View Link */}
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground hover:opacity-70 transition-opacity font-medium inline-flex items-center gap-1"
          >
            View →
          </a>
        </div>
      </div>
    </div>
  );
}
