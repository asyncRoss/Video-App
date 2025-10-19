"use client";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white dark:bg-neutral-900 transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex gap-6">
        <span className="w-8 h-8 rounded-full bg-[#2D4054] animate-pingOnce"></span>
        <span className="w-8 h-8 rounded-full bg-yellow-500 animate-pingOnce [animation-delay:0.2s]"></span>
      </div>

      <style jsx>{`
        @keyframes pingOnce {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(3);
            opacity: 0.6;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        .animate-pingOnce {
          animation: pingOnce 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
