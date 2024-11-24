'use client';

import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push("/login");
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <button
            onClick={navigateToLogin}
            className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </div>
  );
}
