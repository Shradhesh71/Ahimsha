"use client";
import Chat from "@/components/chat";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center p-4 text-center">
      <h1 className="text-3xl font-bold">Welcome to Ahimsha</h1>
      <p className="text-zinc-400 mt-2 mb-2">
        An AI-powered Ahimsha experience
      </p>

      <p className="text-zinc-300 mt-3 px-6 md:px-16 lg:px-32 xl:px-48">
        Ahimsha is an AI-powered platform designed to bring the timeless wisdom
        of Lord Mahaveer Ji into the digital age. In today's fast-paced world,
        many people struggle to deeply engage with Jain scriptures, missing out
        on their profound teachings. Ahimsha bridges this gap by providing
        instant, AI-driven answers to user queries based on the core principles
        of Ahimsa (Non-Violence), Satya (Truth), Aparigraha (Non-Possession),
        and Anekantavada (Multiple Perspectives). Rooted in Truthful Wisdom,
        Compassionate Guidance, and Spiritual Enlightenment, our platform
        empowers individuals to incorporate Jain philosophy into daily life,
        fostering peace, ethical living, and self-realization in an accessible
        and modern way.
      </p>

      <Button variant="outline" className="mt-6 bg-zinc-800 hover:bg-zinc-700">
        <Link href="/ai" className="flex items-center">
          <ChevronRight /> Get Started
        </Link>
      </Button>
    </main>
  );
}
