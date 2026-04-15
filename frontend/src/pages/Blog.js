import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, List, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import BlogSidebar from "../components/BlogSidebar";
import { usePosts } from "../hooks/usePosts";
import { sections } from "../config";
import { cn } from "../utils";

const MIN_SEARCH  = 5;
const PAGE_SIZE   = 10;

function SkeletonCard({ darkMode }) {
  return (
    <div className={cn(
      "flex flex-col rounded-2xl border p-6 animate-pulse",
      darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
    )}>
      <div className={cn("h-3 w-20 rounded mb-4", darkMode ? "bg-slate-700" : "bg-slate-200")} />
      <div className={cn("h-5 w-3/4 rounded mb-2", darkMode ? "bg-slate-700" : "bg-slate-200")} />
      <div className={cn("h-5 w-1/2 rounded mb-5", darkMode ? "bg-slate-700" : "bg-slate-200")} />
      <div className="space-y-2 flex-1">
        <div className={cn("h-3 w-full rounded", darkMode ? "bg-slate-700" : "bg-slate-200")} />
        <div className={cn("h-3 w-full rounded", darkMode ? "bg-slate-700" : "bg-slate-200")} />
        <div className={cn("h-3 w-2/3 rounded", darkMode ? "bg-slate-700" : "bg-slate-200")} />
      </div>
      <div className={cn("h-3 w-24 rounded mt-6", darkMode ? "bg-slate-700" : "bg-slate-200")} />
    </div>
  );
}

function SkeletonListRow({ darkMode }) {
  return (
    <div className={cn("py-5 flex gap-4 animate-pulse border-b", darkMode ? "border-slate-700/40" : "border-slate-200")}>
      <div className={cn("h-3 w-24 rounded flex-shrink-0 mt-1", darkMode ? "bg-slate-700" : "bg-slate-200")} />
      <div className="flex-1 space-y-2">
        <div className={cn("h-4 w-2/3 rounded", darkMode ? "bg-slate-700" : "bg-slate-200")} />
        <div className={cn("h-3 w-full rounded", darkMode ? "bg-slate-700" : "bg-slate-200")} />
        <div className={cn("h-3 w-4/5 rounded", darkMode ? "bg-slate-700" : "bg-slate-200")} />
      </div>
    </div>
  );
}

function CardView({ posts, darkMode }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
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
            to={`/blog/${post.slug}`}
            className="mt-5 inline-block text-sm font-medium text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
          >
            Read more →
          </Link>
        </article>
      ))}
    </div>
  );
}

function ListView({ posts, darkMode }) {
  return (
    <div className="flex flex-col divide-y divide-slate-700/40">
      {posts.map((post) => (
        <article key={post.id} className="py-5 flex flex-col sm:flex-row sm:items-start gap-4">
          <p className="text-xs text-slate-400 w-28 flex-shrink-0 pt-0.5">{post.date}</p>
          <div className="flex-1 min-w-0">
            <Link to={`/blog/${post.slug}`}>
              <h2 className={cn(
                "text-base font-semibold leading-snug mb-1 hover:text-[var(--primary)] transition-colors",
                darkMode ? "text-slate-100" : "text-slate-900"
              )}>
                {post.title}
              </h2>
            </Link>
            <p className={cn("text-sm leading-relaxed", darkMode ? "text-slate-400" : "text-slate-500")}>
              {post.excerpt}
            </p>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="text-sm font-medium text-[var(--primary)] hover:text-[var(--accent)] transition-colors flex-shrink-0 sm:pt-0.5"
          >
            Read →
          </Link>
        </article>
      ))}
    </div>
  );
}

function Pagination({ page, totalPages, onChange, darkMode }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={cn(
          "p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
          darkMode ? "hover:bg-slate-700 text-slate-300" : "hover:bg-slate-100 text-slate-600"
        )}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={cn(
            "w-8 h-8 rounded-lg text-sm font-medium transition-colors",
            p === page
              ? "bg-[var(--primary)] text-white"
              : darkMode
                ? "text-slate-400 hover:bg-slate-700 hover:text-slate-100"
                : "text-slate-600 hover:bg-slate-100"
          )}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className={cn(
          "p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
          darkMode ? "hover:bg-slate-700 text-slate-300" : "hover:bg-slate-100 text-slate-600"
        )}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default function Blog({ darkMode, toggleDark }) {
  const { posts, loading, error } = usePosts();
  const [view, setView]   = useState("card");
  const [query, setQuery] = useState("");
  const [page, setPage]   = useState(1);

  const isSearching = query.length >= MIN_SEARCH;
  const needle      = query.toLowerCase();

  const filtered = isSearching
    ? posts.filter((p) =>
        p.title.toLowerCase().includes(needle) ||
        p.excerpt.toLowerCase().includes(needle) ||
        (p.content || "").toLowerCase().includes(needle)
      )
    : posts;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset to page 1 whenever search query changes
  useEffect(() => { setPage(1); }, [query]);

  return (
    <div className={cn("min-h-screen flex flex-col", darkMode ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900")}>
      <Nav sections={sections} darkMode={darkMode} toggleDark={toggleDark} />

      <main className="flex-1 pt-24 pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* Page header */}
          <div className="mb-10 pt-10">
            <span className="mb-2 block text-sm font-semibold text-orange-400">Classic</span>
            <h1 className="text-4xl font-bold sm:text-5xl">Blog</h1>
            <p className={cn("mt-3 max-w-xl text-sm leading-relaxed", darkMode ? "text-slate-400" : "text-slate-500")}>
              Thoughts on technology, leadership, and building software that matters.
            </p>
          </div>

          {error && <p className="text-red-400 mb-6">Could not load posts.</p>}

          <div className="flex flex-col lg:flex-row gap-10">

            {/* Main listing column */}
            <div className="flex-1 min-w-0">

              {/* Search + view toggle toolbar */}
              <div className="flex items-center gap-3 mb-5">
                <div className={cn(
                  "flex-1 flex items-center gap-2 rounded-xl border px-4 py-2.5",
                  darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-sm"
                )}>
                  <Search size={15} className="text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search posts"
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500"
                  />
                  {query && (
                    <button onClick={() => setQuery("")} className="text-slate-400 hover:text-slate-200 transition-colors">
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className={cn(
                  "flex items-center gap-1 rounded-xl p-1 border flex-shrink-0",
                  darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-200"
                )}>
                  <button
                    onClick={() => setView("card")}
                    aria-label="Card view"
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      view === "card"
                        ? "bg-[var(--primary)] text-white"
                        : darkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
                    )}
                  >
                    <LayoutGrid size={15} />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    aria-label="List view"
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      view === "list"
                        ? "bg-[var(--primary)] text-white"
                        : darkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"
                    )}
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>

              {/* Search feedback */}
              {isSearching && !loading && (
                <p className={cn("text-xs mb-4", darkMode ? "text-slate-400" : "text-slate-500")}>
                  {filtered.length === 0
                    ? `No results for "${query}"`
                    : `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${query}"`}
                </p>
              )}
              {!isSearching && query.length > 0 && query.length < MIN_SEARCH && (
                <p className="text-xs text-slate-500 mb-4">
                  Keep typing — search activates at {MIN_SEARCH} characters ({MIN_SEARCH - query.length} more to go)
                </p>
              )}

              {loading ? (
                view === "card"
                  ? <div className="grid gap-6 sm:grid-cols-2">
                      {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} darkMode={darkMode} />)}
                    </div>
                  : <div>
                      {Array.from({ length: 6 }).map((_, i) => <SkeletonListRow key={i} darkMode={darkMode} />)}
                    </div>
              ) : (
                view === "card"
                  ? <CardView posts={paginated} darkMode={darkMode} />
                  : <ListView posts={paginated} darkMode={darkMode} />
              )}

              <Pagination page={page} totalPages={totalPages} onChange={setPage} darkMode={darkMode} />
            </div>

            {/* Sidebar */}
            <BlogSidebar posts={posts.slice(0, 5)} darkMode={darkMode} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
