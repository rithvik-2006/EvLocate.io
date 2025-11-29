"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Listen to login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/"; // redirect home
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 22px",
        background: "#000000",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Left — Logo */}
      <Link
        href="/"
        style={{
          color: "white",
          fontSize: "20px",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        ⚡ EV Locate
      </Link>

      {/* Center — Navigation Links */}
      <div style={{ display: "flex", gap: "20px", fontSize: "16px" }}>
        <Link href="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <a
          href="https://github.com/yourname/yourrepo"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white", textDecoration: "none" }}
        >
          Repo
        </a>
      </div>

      {/* Right — Auth controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {!user && (
          <>
            <Link
              href="/login"
              style={{ color: "white", textDecoration: "none", fontSize: "16px" }}
            >
              Login
            </Link>
          </>
        )}

        {user && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Google profile avatar */}
            {user.user_metadata?.avatar_url && (
              <img
                src={user.user_metadata.avatar_url}
                alt="profile"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "2px solid white",
                }}
              />
            )}
            <span style={{ fontSize: "15px" }}>
              {user.user_metadata?.full_name || user.email}
            </span>

            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "1px solid white",
                borderRadius: "18px",
                padding: "4px 10px",
                fontSize: "14px",
                cursor: "pointer",
                color: "white",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

