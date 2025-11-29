"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/";
  };

  const NavLinks = () => (
    <>
      <Link href="/" className="hover:text-emerald-400 transition">
        Home
      </Link>
      <a
        href="https://github.com/yourname/yourrepo"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-emerald-400 transition"
      >
        Repo
      </a>
    </>
  );

  const AuthLinks = () => (
    <>
      {!user && (
        <Link href="/login" className="hover:text-emerald-400 transition">
          Login
        </Link>
      )}

      {user && (
        <div className="flex items-center gap-3">
          {user.user_metadata?.avatar_url && (
            <img
              src={user.user_metadata.avatar_url}
              alt="profile"
              className="w-9 h-9 rounded-full border border-white"
            />
          )}

          <span className="hidden sm:block text-sm text-zinc-300">
            {user.user_metadata?.full_name || user.email}
          </span>

          <button
            onClick={handleLogout}
            className="border border-white rounded-full px-3 py-1 text-sm hover:bg-white hover:text-black transition"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-3 bg-black text-white sticky top-0 z-50">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold">
          ⚡ EV Locate
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-lg">
          <NavLinks />
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-6 text-lg">
          <AuthLinks />
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-3xl"
        >
          <FiMenu />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black text-white flex flex-col gap-8 items-center justify-center text-2xl">
          {/* Close btn */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-5 text-4xl"
          >
            <FiX />
          </button>

          {/* Nav links */}
          <NavLinks />

          {/* Auth */}
          <AuthLinks />
        </div>
      )}
    </>
  );
}

