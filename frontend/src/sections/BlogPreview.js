import { Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";

function BlogPreview() {
  const { posts: blogs, loading } = usePosts();
  return (
    <div className="bg-slate-800 py-60">
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

        {loading && <p className="text-slate-400 mb-6">Loading posts…</p>}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="flex flex-col bg-slate-900 rounded-2xl border border-slate-700 p-6 hover:border-[var(--primary)] transition-colors"
            >
              <p className="text-xs text-slate-400 mb-3">{blog.date}</p>
              <h3 className="text-lg font-semibold text-white mb-2 leading-snug">{blog.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed flex-1">{blog.excerpt}</p>
              <Link
                to={`/blog/${blog.id}`}
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
