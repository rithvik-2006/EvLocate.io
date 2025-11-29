"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBolt, FaGlobe, FaHeart, FaMoon, FaSun } from "react-icons/fa";

export default function Home() {
  const [isDark, setIsDark] = useState(true);

  const bgClass = isDark ? "bg-black text-white" : "bg-zinc-50 text-zinc-900";

  return (
    <div
      className={`relative min-h-screen w-full ${bgClass} flex flex-col items-center transition-colors duration-500`}
    >
      {/* Animated Earth background */}
      <div className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center">
        <div
          className="h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-sky-500 via-emerald-400 to-blue-900 opacity-25 blur-3xl animate-spin"
          style={{ animationDuration: "40s" }}
        />
      </div>

      {/* Subtle radial vignette */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-radial from-white/5 via-transparent to-black" />

      {/* Theme toggle */}
      <button
        onClick={() => setIsDark((d) => !d)}
        className="fixed right-4 top-20 z-20 flex items-center gap-2 rounded-full border border-zinc-700/60 bg-black/50 px-3 py-1 text-xs font-medium text-zinc-200 backdrop-blur-md transition hover:border-zinc-300 hover:text-white
                   dark:border-zinc-600"
      >
        {isDark ? (
          <>
            <FaSun className="text-yellow-400" />
            Light mode
          </>
        ) : (
          <>
            <FaMoon className="text-sky-500" />
            Dark mode
          </>
        )}
      </button>

      {/* Hero */}
      <section className="flex flex-col items-center text-center max-w-3xl px-6 py-28">
        <div className="mb-6 text-4xl text-amber-400 animate-pulse">
          <FaBolt />
        </div>

        <h1 className="text-4xl font-bold leading-tight mb-4">
          EV Locator — Charging Stations, Anywhere.
        </h1>

        <p className="text-lg max-w-2xl text-black dark:text-zinc-300">
          A completely free and <span className="text-emerald-400 font-semibold">non-profit</span>{" "}
          web app that helps EV users around the world find nearby charging
          stations with ease. No subscription. No ads. No tracking.
        </p>

        <Link
          href="/charge-map"
          className="mt-8 px-6 py-3 rounded-full text-lg font-semibold bg-emerald-500 hover:bg-emerald-400 text-black transition-colors shadow-lg shadow-emerald-500/25"
        >
          🔍 Get Started
        </Link>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-zinc-800/70" />

      {/* Features */}
      <section className="flex flex-col items-center mt-20 gap-12 max-w-5xl px-6 pb-24">
        <div className="grid gap-10 md:grid-cols-3 text-center">
          <div className="flex flex-col items-center gap-3">
            <FaGlobe className="text-3xl text-blue-400" />
            <h3 className="text-xl font-semibold">Worldwide Coverage</h3>
            <p className="text-zinc-400 text-sm max-w-xs">
              Uses the Open Charge Map API to surface EV charging stations across
              the globe.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <FaBolt className="text-3xl text-amber-400" />
            <h3 className="text-xl font-semibold">Fast & Simple</h3>
            <p className="text-zinc-400 text-sm max-w-xs">
              Detects your location and highlights the nearest charging spots
              in just a few seconds.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <FaHeart className="text-3xl text-rose-400" />
            <h3 className="text-xl font-semibold">Non-Profit & Open</h3>
            <p className="text-zinc-400 text-sm max-w-xs">
              Built as an open-source, non-profit tool to support the EV
              community and sustainable transport.
            </p>
          </div>
        </div>

        <Link
          href="https://github.com/YOUR_GITHUB_REPO"
          target="_blank"
          className="mt-6 px-5 py-2 rounded-full border border-zinc-600 text-zinc-900 dark:text-white hover:border-white hover:text-white transition-colors"
        >
          ⭐ Star the project on GitHub
        </Link>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-sm text-zinc-500 border-t border-zinc-900/70">
        Made with <span className="text-rose-400">❤️</span> for EV users worldwide · Free & open-source
      </footer>
    </div>
  );
}

