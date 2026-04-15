import { Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";

function SkeletonCard() {
  return (
    <div className="flex flex-col bg-slate-900 rounded-2xl border border-slate-700 p-6 animate-pulse">
      <div className="h-3 w-20 bg-slate-700 rounded mb-4" />
      <div className="h-5 w-3/4 bg-slate-700 rounded mb-2" />
      <div className="h-5 w-1/2 bg-slate-700 rounded mb-5" />
      <div className="space-y-2 flex-1">
        <div className="h-3 w-full bg-slate-700 rounded" />
        <div className="h-3 w-full bg-slate-700 rounded" />
        <div className="h-3 w-2/3 bg-slate-700 rounded" />
      </div>
      <div className="h-3 w-24 bg-slate-700 rounded mt-6" />
    </div>
  );
}

function BlogPreview() {
  const { posts, loading } = usePosts();
  const blogs = posts.slice(0, 3);

  return (
    <div className="bg-slate-800 py-40 sm:py-60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <span className="mb-2 block text-sm font-semibold text-orange-400">Latest Writing</span>
          <div className="flex items-end justify-between">
            <h2 className="text-4xl font-bold text-white sm:text-5xl">Blog</h2>
            <Link
              to="/blogs"
              className="text-sm font-medium text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
            >
              View all posts →
            </Link>
          </div>
          <p className="mt-3 text-slate-300 max-w-2xl">
            Thoughts on technology, leadership, and building software that matters.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="flex flex-col bg-slate-900 rounded-2xl border border-slate-700 p-6 hover:border-[var(--primary)] transition-colors"
                >
                  <p className="text-xs text-slate-400 mb-3">{blog.date}</p>
                  <h3 className="text-lg font-semibold text-white mb-2 leading-snug">{blog.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed flex-1">{blog.excerpt}</p>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="mt-5 inline-block text-sm font-medium text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPreview;
