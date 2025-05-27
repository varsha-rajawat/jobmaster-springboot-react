import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { auth, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full h-14 bg-white border-b shadow-sm flex items-center px-6 fixed top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center justify-start flex-grow">
        <Link
          to={auth.token ? "/dashboard" : "/"}
          className="text-lg font-bold text-blue-600 hover:text-blue-700 tracking-tight"
        >
          JobMaster
        </Link>
      </div>

      {/* Middle: Navigation */}
      {auth.token && (
        <nav className="hidden md:flex gap-6 text-sm text-gray-700 font-medium flex-grow justify-center">
          <Link
            to="/dashboard"
            className={`hover:text-blue-600 ${
              isActive("/dashboard") ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Dashboard
          </Link>
        </nav>
      )}

      {/* Right: Auth Controls */}
      <div className="flex items-center gap-4 text-sm">
        {auth.token ? (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition text-xs"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-600">
              Login
            </Link>
            <Link to="/signup" className="hover:text-blue-600">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
