"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const origin = window.location.origin;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/charge-map`, // after login, go to map
      },
    });

    if (error) {
      console.error(error);
      alert("Failed to sign in with Google");
    } else if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-lg shadow-emerald-500/10">
        <h1 className="text-2xl font-semibold mb-2 text-center">
          Welcome back to EV Locator
        </h1>
        <p className="text-sm text-zinc-400 mb-8 text-center">
          Login to access the global EV charging map. Always free. No ads.
        </p>

        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-white text-black py-2.5 font-medium hover:bg-zinc-100 transition-colors"
        >
          <FaGoogle className="text-lg" />
          Continue with Google
        </button>

        <p className="mt-6 text-xs text-zinc-500 text-center">
          New here?{" "}
          <a href="/signup" className="text-emerald-400 hover:underline">
            Create a free account
          </a>
        </p>
      </div>
    </div>
  );
}

