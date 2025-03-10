import { useState } from "react";
import { User, X } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { useAuthStore } from "../../store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UserAvatar from "./avatar";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, isAuthenticated } = useAuthStore();
  return (
    <div className="px-8 md:px-24 lg:px-48 py-3 shadow-md mx-auto">
      <div className="relative flex items-center justify-between">
        <Link
          to={"/"}
          aria-label="Company"
          title="Company"
          className="inline-flex items-center"
        >
          <svg
            className="w-8 text-deep-purple-accent-400"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            stroke="currentColor"
            fill="none"
          >
            <rect x="3" y="1" width="7" height="12" />
            <rect x="3" y="17" width="7" height="6" />
            <rect x="14" y="1" width="7" height="6" />
            <rect x="14" y="11" width="7" height="12" />
          </svg>
          <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
            Xipper
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-8">
          <li>
            <Link
              to="/"
              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/browse"
              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              Browse Listings
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              About us
            </Link>
          </li>
        </ul>

        {/* Right-side Actions */}
        <div className="flex items-center">
          {/* Login Button (Always Visible) */}
          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <UserAvatar />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500 font-medium"
                    onClick={logout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to={"/login"} className="mr-2">
              <Button>Login</Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex gap-1">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-gray-100"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-full">
            <div className="p-5 bg-white border rounded shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <Link
                  to="/"
                  aria-label="Company"
                  title="Company"
                  className="inline-flex items-center"
                >
                  <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                    Company
                  </span>
                </Link>
                <button
                  aria-label="Close Menu"
                  title="Close Menu"
                  className="p-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <nav>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/"
                      className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/browse"
                      className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                    >
                      Browse Listings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                    >
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                    >
                      Sign up
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
