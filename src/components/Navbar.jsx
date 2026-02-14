"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 

  const isLoggedIn = false;

 
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

          {/* Links  */}
          <div className="hidden md:flex flex-grow justify-center space-x-10 items-center">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/services" className={linkClass("/services")}>
              Services
            </Link>
            {isLoggedIn && (
              <Link href="/my-bookings" className={linkClass("/my-bookings")}>
                My Bookings
              </Link>
            )}
            <Link href="/about" className={linkClass("/about")}>
              About
            </Link>
          </div>

          {/* Login/Logout Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <button
                className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition shadow-sm font-medium"
                onClick={() => console.log("Logout Logic Here")}
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className={linkClass("/login")}>
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

          {/* Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-emerald-600 focus:outline-none"
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

      {/*  Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-6 space-y-4 px-6 shadow-xl">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`block text-lg border-b pb-2 ${pathname === "/" ? "text-emerald-600 font-bold" : "text-gray-800"}`}
          >
            Home
          </Link>
          <Link
            href="/services"
            onClick={() => setIsOpen(false)}
            className={`block text-lg border-b pb-2 ${pathname === "/services" ? "text-emerald-600 font-bold" : "text-gray-800"}`}
          >
            Services
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className={`block text-lg border-b pb-2 ${pathname === "/about" ? "text-emerald-600 font-bold" : "text-gray-800"}`}
          >
            About
          </Link>
          
        </div>
      )}
    </nav>
  );
};

export default Navbar;
