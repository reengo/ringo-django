import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import BlogSidebar from "../components/BlogSidebar";
import { usePost, usePosts } from "../hooks/usePosts";
import { sections } from "../config";
import { cn } from "../utils";

export default function BlogDetail({ darkMode, toggleDark }) {
  const { id } = useParams();
  const { post, loading, error } = usePost(id);
  const { posts } = usePosts();

  return (
    <div className={cn("min-h-screen flex flex-col", darkMode ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900")}>
      <Nav sections={sections} darkMode={darkMode} toggleDark={toggleDark} />

      <main className="flex-1 pt-24 pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">

          <Link
            to="/blogs"
            className="inline-block mb-8 text-sm font-medium text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
          >
            ← Back to Blogs
          </Link>

          <div className="flex flex-col lg:flex-row gap-10">

            <article className="flex-1 min-w-0">
              {loading                    && <p className="text-slate-400">Loading…</p>}
              {error                      && <p className="text-red-400">Could not load post.</p>}
              {!loading && !error && !post && <p className="text-slate-400">Blog post not found.</p>}

              {post && (
                <>
                  <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
                  <p className={cn("text-sm mb-10", darkMode ? "text-slate-400" : "text-slate-500")}>
                    {post.date}
                  </p>

                  <div className={cn(
                    "prose max-w-none",
                    darkMode ? "prose-invert" : "",
                    "prose-headings:font-bold prose-a:text-[var(--primary)] prose-a:no-underline hover:prose-a:text-[var(--accent)]",
                    "prose-code:bg-slate-800 prose-code:text-green-400 prose-code:px-1 prose-code:rounded",
                    "prose-pre:bg-slate-800 prose-pre:text-slate-100",
                    "prose-blockquote:border-[var(--primary)] prose-blockquote:text-slate-400"
                  )}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {post.content}
                    </ReactMarkdown>
                  </div>
                </>
              )}
            </article>

            <BlogSidebar posts={posts.slice(0, 5)} activeId={post?.id} darkMode={darkMode} />

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
