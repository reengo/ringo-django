import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import logo from '../assets/img/logo-ringo-pad.png';
import { cn } from "../utils";
import { Moon, Sun } from "lucide-react";

function Nav({ sections, darkMode, toggleDark }) {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleNav = (id) => {
        setOpen(false);
        if (location.pathname === '/') {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            navigate('/');
            // after navigation Landing mounts and browser resolves the hash
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    };

    return (
        <nav className={cn("fixed top-0 left-0 right-0 z-50 backdrop-blur", darkMode ? "bg-slate-900/80" : "bg-white/60")}>
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <img src={logo} alt="Logo" className="cursor-pointer rounded-xl hover:opacity-80 transition" />
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <button
                        onClick={toggleDark}
                        className="rounded-full p-2 hover:bg-slate-200/20 border-none bg-transparent"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <Sun size={18} className="text-yellow-300" /> : <Moon size={18} className="text-slate-700" />}
                    </button>
                    {sections.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => handleNav(s.id)}
                            className={cn(
                                "relative text-sm font-semibold border-none cursor-pointer",
                                "px-3 py-1.5 rounded-lg",
                                "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full",
                                "after:scale-x-0 hover:after:scale-x-100 after:origin-center",
                                "after:transition-transform after:duration-300 after:ease-out",
                                "transition-all duration-200",
                                darkMode
                                    ? "text-slate-200 hover:text-white hover:bg-white/10 after:bg-[var(--accent)]"
                                    : "text-slate-700 hover:text-slate-900 hover:bg-black/10 after:bg-[var(--primary)]"
                            )}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                <button
                    className="md:hidden rounded-xl text-black px-3 py-2 bg-slate-100 hover:bg-slate-200"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    Menu
                </button>
            </div>

            {open && (
                <div className="md:hidden px-4 pb-4 grid gap-2">
                    {sections.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => handleNav(s.id)}
                            className={cn("text-left rounded-xl px-3 py-2 border-none bg-transparent cursor-pointer", darkMode ? "bg-slate-800 text-slate-100" : "bg-white/50 hover:bg-white/70")}
                        >
                            {s.label}
                        </button>
                    ))}
                    <button
                        onClick={toggleDark}
                        className={cn("mt-2 rounded-xl px-3 py-2 text-left border-none cursor-pointer", darkMode ? "bg-slate-800 text-slate-100" : "bg-slate-100")}
                    >
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Nav;
