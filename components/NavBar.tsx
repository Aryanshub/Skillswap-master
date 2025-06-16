"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Menu, X, User, LogOut, Home, FileText, Plus } from "lucide-react";

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userHoverState, setUserHoverState] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLink = ({ href, children, icon: Icon, onClick }: { 
    href?: string; 
    children: React.ReactNode; 
    icon: React.ComponentType<any>;
    onClick?: () => void;
  }) => {
    const isActive = pathname === href;
    
    if (onClick) {
      return (
        <button
          onClick={onClick}
          className="group flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300 font-medium relative overflow-hidden"
        >
          <Icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
          <span className="relative">
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
          </span>
        </button>
      );
    }

    return (
      <Link href={href || "/"}>
        <div className={`group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 font-medium relative overflow-hidden ${
          isActive 
            ? 'text-blue-600 bg-blue-50 shadow-sm' 
            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
        }`}>
          <Icon size={18} className={`transition-transform duration-300 group-hover:scale-110 ${
            isActive ? 'text-blue-600' : ''
          }`} />
          <span className="relative">
            {children}
            <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
              isActive ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </span>
        </div>
      </Link>
    );
  };

  if (!isClient) {
    return (
      <nav className="bg-white border-b border-gray-200 shadow-sm fixed w-full z-50">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="animate-pulse flex justify-between items-center">
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
            <div className="flex space-x-4">
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className={`bg-white/95 backdrop-blur-md border-b transition-all duration-300 fixed w-full z-50 ${
        isScrolled 
          ? 'border-gray-300 shadow-lg' 
          : 'border-gray-200 shadow-sm'
      }`}>
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo with animation */}
            <Link href="/">
              <div className="group cursor-pointer">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent transition-all duration-300 group-hover:from-blue-700 group-hover:to-blue-900">
                  SkillSwap
                </span>
                <div className="h-0.5 w-0 bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-300 group-hover:w-full rounded-full"></div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-2 items-center">
              <NavLink href="/" icon={Home}>Home</NavLink>
              <NavLink href="/posts" icon={FileText}>Posts</NavLink>
              <NavLink href="/createpost" icon={Plus}>Create</NavLink>

              {loggedIn ? (
                <div 
                  className="relative"
                  onMouseEnter={() => setUserHoverState(true)}
                  onMouseLeave={() => setUserHoverState(false)}
                >
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                    <User size={18} className="text-gray-600" />
                    <span className="text-gray-700 font-medium">Account</span>
                  </div>
                  
                  {/* Dropdown */}
                  <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 transform origin-top-right ${
                    userHoverState 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}>
                    <div className="py-2">
                      <NavLink onClick={handleLogout} icon={LogOut}>
                        Sign out
                      </NavLink>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/auth/signin">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105">
                    <User size={18} />
                    <span>Login</span>
                  </div>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="relative w-6 h-6">
                <Menu 
                  size={24} 
                  className={`absolute transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                  }`}
                />
                <X 
                  size={24} 
                  className={`absolute transition-all duration-300 ${
                    isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-4 space-y-2">
            <div onClick={() => setIsMenuOpen(false)}>
              <NavLink href="/" icon={Home}>Home</NavLink>
            </div>
            <div onClick={() => setIsMenuOpen(false)}>
              <NavLink href="/posts" icon={FileText}>Posts</NavLink>
            </div>
            <div onClick={() => setIsMenuOpen(false)}>
              <NavLink href="/createpost" icon={Plus}>Create</NavLink>
            </div>

            <div className="border-t border-gray-200 pt-2 mt-2">
              {loggedIn ? (
                <NavLink onClick={handleLogout} icon={LogOut}>
                  Sign out
                </NavLink>
              ) : (
                <div onClick={() => setIsMenuOpen(false)}>
                  <Link href="/auth/signin">
                    <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium">
                      <User size={18} />
                      <span>Login</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className=""></div>
    </>
  );
};

export default NavBar;