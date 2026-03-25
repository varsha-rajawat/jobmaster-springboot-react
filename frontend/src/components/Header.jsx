import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { auth, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link
          to={auth.token ? "/dashboard" : "/login"}
          className="text-lg font-bold text-gray-900 tracking-tight"
        >
          Job<span className="text-blue-600">Master</span>
        </Link>

        {/* Navigation */}
        {auth.token && (
          <nav className="flex items-center gap-2 text-sm">
            <Link
              to="/dashboard"
              className={`px-3 py-1 rounded-full transition ${
                isActive("/dashboard")
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/insights"
              className={`px-3 py-1 rounded-full transition ${
                isActive("/insights")
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Insights
            </Link>

            <Link
              to="/ai/resume-analysis"
              className={`px-3 py-1 rounded-full transition ${
                isActive("/ai/resume-analysis")
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              AI Resume
            </Link>
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3 text-sm">
          {auth.token ? (
            <button
              onClick={logout}
              className="px-3 py-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;