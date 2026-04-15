import { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import BlogSidebar from "../components/BlogSidebar";
import { usePost, usePosts } from "../hooks/usePosts";
import { sections } from "../config";
import { cn } from "../utils";

function SkeletonArticle({ darkMode }) {
  const bar = (w) => (
    <div className={cn("h-3 rounded animate-pulse", darkMode ? "bg-slate-700" : "bg-slate-200", w)} />
  );
  return (
    <div>
      {/* Title */}
      <div className={cn("h-9 w-3/4 rounded animate-pulse mb-3", darkMode ? "bg-slate-700" : "bg-slate-200")} />
      {/* Date */}
      <div className={cn("h-3 w-28 rounded animate-pulse mb-10", darkMode ? "bg-slate-700" : "bg-slate-200")} />
      {/* Body lines */}
      <div className="space-y-3">
        {bar("w-full")}
        {bar("w-full")}
        {bar("w-5/6")}
        {bar("w-full")}
        {bar("w-4/5")}
        <div className="pt-2" />
        {bar("w-full")}
        {bar("w-full")}
        {bar("w-2/3")}
        <div className="pt-2" />
        {bar("w-full")}
        {bar("w-11/12")}
        {bar("w-3/4")}
        {bar("w-full")}
        {bar("w-1/2")}
      </div>
    </div>
  );
}

export default function BlogDetail({ darkMode, toggleDark }) {
  const { slug } = useParams();
  const { post, loading, error } = usePost(slug);
  const { posts } = usePosts();
  const articleRef = useRef(null);
  const [isTall, setIsTall] = useState(false);

  useEffect(() => {
    if (!articleRef.current) return;
    const check = () => setIsTall(articleRef.current.offsetHeight > window.innerHeight);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [post]);

  return (
    <div className={cn("min-h-screen flex flex-col", darkMode ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900")}>
      <Nav sections={sections} darkMode={darkMode} toggleDark={toggleDark} />

      <main className="flex-1 pt-24 pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">

          <Link
            to="/blogs"
            className="inline-block mb-8 pt-10 text-sm font-medium text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
          >
            ← Back to Blogs
          </Link>

          <div className="flex flex-col lg:flex-row gap-10">

            <article ref={articleRef} className="flex-1 min-w-0">
              {loading                    && <SkeletonArticle darkMode={darkMode} />}
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

                  {isTall && (
                    <div className="mt-12 pt-8 border-t border-slate-700/50">
                      <Link
                        to="/blogs"
                        className="inline-block text-sm font-medium text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
                      >
                        ← Back to Blogs
                      </Link>
                    </div>
                  )}
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
