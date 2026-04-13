import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import BlogSidebar from "../components/BlogSidebar";
import { usePosts } from "../hooks/usePosts";
import { sections } from "../config";
import { cn } from "../utils";

export default function Blog({ darkMode, toggleDark }) {
  const { posts, loading, error } = usePosts();

  return (
    <div className={cn("min-h-screen flex flex-col", darkMode ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900")}>
      <Nav sections={sections} darkMode={darkMode} toggleDark={toggleDark} />

      <main className="flex-1 pt-24 pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">

          <div className="mb-10">
            <span className="mb-2 block text-sm font-semibold text-orange-400">Writing</span>
            <h1 className="text-4xl font-bold sm:text-5xl">Blog</h1>
            <p className={cn("mt-3 max-w-xl text-sm leading-relaxed", darkMode ? "text-slate-400" : "text-slate-500")}>
              Thoughts on technology, leadership, and building software that matters.
            </p>
          </div>

          {loading && <p className="text-slate-400">Loading posts…</p>}
          {error   && <p className="text-red-400">Could not load posts.</p>}

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className={cn(
                    "flex flex-col rounded-2xl border p-6 transition-colors",
                    darkMode
                      ? "bg-slate-800 border-slate-700 hover:border-[var(--primary)]"
                      : "bg-white border-slate-200 hover:border-[var(--primary)] shadow-sm"
                  )}
                >
                  <p className="text-xs text-slate-400 mb-3">{post.date}</p>
                  <h2 className="text-lg font-semibold mb-2 leading-snug">{post.title}</h2>
                  <p className={cn("text-sm leading-relaxed flex-1", darkMode ? "text-slate-300" : "text-slate-600")}>
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="mt-5 inline-block text-sm font-medium text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>

            <BlogSidebar posts={posts.slice(0, 5)} darkMode={darkMode} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
