import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (err) {
            const msg = err.response?.data?.detail || "Invalid credentials. Please try again.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full p-3 rounded-xl border border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#247A3B] transition";

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
                <input
                    className={inputClass}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    autoComplete="username"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                <input
                    className={inputClass}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                />
            </div>

            {error && (
                <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-[#247A3B] hover:bg-[#FF8C2D] text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Please wait…" : method.charAt(0).toUpperCase() + method.slice(1)}
            </button>
        </form>
    );
}

export default Form;
