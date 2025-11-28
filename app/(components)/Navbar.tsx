"use client";

import Link from "next/link";

export default function Navbar() {
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
      {/* Logo / Site title */}
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

      {/* Right navigation links */}
      <div style={{ display: "flex", gap: "20px", fontSize: "16px" }}>
        <Link href="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        <Link href="/charge-map" style={{ color: "white", textDecoration: "none" }}>
          Find Stations
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
    </nav>
  );
}
