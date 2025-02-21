"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full p-4 md:px-8">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ahimsha </h1>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="mt-4 p-2 border rounded-lg flex items-center gap-2"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
          Theme
        </button>
      </nav>
    </header>
  );
}
