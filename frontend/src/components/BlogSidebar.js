import { Link } from "react-router-dom";
import { cn } from "../utils";

function BlogSidebar({ posts, activeId = null, darkMode }) {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className={cn(
        "sticky top-24 rounded-2xl border p-6",
        darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"
      )}>
        <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-4">
          Recent Posts
        </h3>
        <ul className="flex flex-col gap-4">
          {posts.map((post) => {
            const isCurrent = post.id === activeId;
            return (
              <li key={post.id}>
                <Link
                  to={`/blog/${post.slug}`}
                  className={cn("group block", isCurrent && "pointer-events-none")}
                >
                  <p className={cn(
                    "text-sm font-medium leading-snug transition-colors",
                    isCurrent
                      ? "text-[var(--primary)]"
                      : darkMode
                        ? "text-slate-200 group-hover:text-[var(--primary)]"
                        : "text-slate-800 group-hover:text-[var(--primary)]"
                  )}>
                    {post.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{post.date}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default BlogSidebar;
