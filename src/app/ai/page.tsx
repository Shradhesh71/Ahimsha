"use client";
import Chat from "@/components/chat";

export default function AI() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold">Welcome to Ahimsha</h1>
      <p className="text-zinc-400 mt-2 mb-2">An AI-powered Ahimsha experience</p>

      <Chat />
    </main>
  );
}
