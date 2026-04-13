import { Link } from "react-router-dom";
import Form from "../components/Form";
import logo from "../assets/img/logo-ringo-pad.png";

function Login() {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">

                    {/* Logo + heading */}
                    <div className="flex flex-col items-center mb-8">
                        <Link to="/">
                            <img src={logo} alt="Ringo" className="w-16 h-16 rounded-xl mb-4 cursor-pointer hover:opacity-80 transition" />
                        </Link>
                        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
                        <p className="text-slate-400 text-sm mt-1">Sign in to your account</p>
                    </div>

                    <Form route="/auth/token/" method="login" />

                    <p className="mt-6 text-center text-sm text-slate-400">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-[#247A3B] hover:text-[#FF8C2D] font-medium transition-colors">
                            Register
                        </Link>
                    </p>
                </div>

                {/* Back to site */}
                <p className="mt-6 text-center text-sm text-slate-500">
                    <Link to="/" className="hover:text-slate-300 transition-colors">
                        ← Back to site
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;
