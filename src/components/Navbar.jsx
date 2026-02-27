"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const userName = user?.name || "User";

  const isLoggedIn = Boolean(user);

  useEffect(() => {
    const loadMe = async () => {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        const data = await res.json();
        setUser(data.user || null);
      } catch {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    loadMe();
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    setIsProfileOpen(false);
    setIsOpen(false);
    router.refresh();
  };

  const linkClass = (path) =>
    `font-medium transition-colors ${
      pathname === path
        ? "text-emerald-600 border-b-2 border-emerald-600"
        : "text-gray-700 hover:text-emerald-600"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Care.xyz Logo"
                width={70}
                height={40}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-grow justify-center space-x-10 items-center">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/services" className={linkClass("/services")}>
              Services
            </Link>
            <Link href="/about" className={linkClass("/about")}>
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            {loadingUser ? null : isLoggedIn ? (
              /* --- Logged In --- */
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none border border-transparent hover:border-emerald-200 p-1 rounded-full transition"
                >
                  <span className="text-gray-700 font-medium ml-2">
                    {userName}
                  </span>
                  <div className="h-10 w-10 rounded-full bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center overflow-hidden">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt="User"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <span className="text-emerald-700 font-bold">
                        {userName.charAt(0)}
                      </span>
                    )}
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-50">
                    <Link
                      href="/my-bookings"
                      className="block px-4 py-2 text-gray-700 hover:bg-emerald-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-medium"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* --- if NOT Logged In --- */
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-emerald-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition shadow-md font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-6 px-6 space-y-4 shadow-xl">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block text-lg border-b pb-2"
          >
            Home
          </Link>
          <Link
            href="/services"
            onClick={() => setIsOpen(false)}
            className="block text-lg border-b pb-2"
          >
            Services
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block text-lg border-b pb-2"
          >
            About
          </Link>

          {loadingUser ? null : isLoggedIn ? (
            <>
              <Link
                href="/my-bookings"
                onClick={() => setIsOpen(false)}
                className="block text-lg border-b pb-2"
              >
                My Bookings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left text-lg text-red-600 font-bold py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-3 pt-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-center py-2 border border-emerald-600 rounded-full text-emerald-600 font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="text-center py-2 bg-emerald-600 rounded-full text-white font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
