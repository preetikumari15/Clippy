"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Video, Wand2, Share2, Sparkles, CheckCircle2 } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

const images = [
  "https://picsum.photos/300/400?random=1",
  "https://picsum.photos/300/400?random=2",
  "https://picsum.photos/300/400?random=3",
  "https://picsum.photos/300/400?random=4",
  "https://picsum.photos/300/400?random=5",
  "https://picsum.photos/300/400?random=6",
];

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-white">
      <nav className="p-5 px-10 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex gap-2 items-center">
          <Image src={"/logo.png"} alt="logo" width={35} height={35} />
          <h1 className="font-bold text-2xl text-purple-600">Clippy</h1>
        </div>

        <div className="flex gap-4 items-center">
          {isSignedIn ? (
            <Link href={"/dashboard"}>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link href={"/sign-in"}>
              <Button
                variant="outline"
                className="text-purple-600 border-purple-600 hover:bg-purple-50"
              >
                Sign In
              </Button>
            </Link>
          )}
          {/* User Profile */}
          <div className="flex items-center">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-linear-to-b from-purple-50 to-white">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in">
          <Sparkles className="h-4 w-4" /> #1 AI Video Generator
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Turn Text into <span className="text-purple-600">Viral Videos</span>
        </h1>

        <p className="text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed">
          Create professional, engaging short videos in seconds with the power
          of AI. Perfect for YouTube Shorts, TikTok, and Instagram Reels.
        </p>

        <Link href={"/dashboard"}>
          <Button className="h-16 px-10 text-xl rounded-full bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all shadow-xl shadow-purple-200">
            Get Started for Free
          </Button>
        </Link>

        {/* Dashboard Preview */}
        <div className="mt-20 relative w-full max-w-5xl h-125 rounded-2xl shadow-2xl border-4 border-white bg-black overflow-hidden flex justify-center items-center">
          <div className="absolute inset-0 z-20 pointer-events-none bg-linear-to-b from-gray-900 via-transparent to-gray-900"></div>

          {/* The Grid of Flowing Columns */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 w-full h-[150%] -rotate-2 scale-110 opacity-95">
            {/* Column 1 - Flowing UP */}
            <div className="flex flex-col gap-3 animate-scroll-up">
              {[...images, ...images, ...images].map((src, i) => (
                <div
                  key={i}
                  className="relative w-full h-48 rounded-lg overflow-hidden shadow-md shadow-yellow-200"
                >
                  <Image src={src} alt="AI" fill className="object-cover" />
                </div>
              ))}
            </div>

            {/* Column 2 - Flowing DOWN */}
            <div className="flex flex-col gap-3 animate-scroll-down">
              {[...images, ...images, ...images].map((src, i) => (
                <div
                  key={i}
                  className="relative w-full h-64 rounded-lg overflow-hidden shadow-md shadow-yellow-200"
                >
                  <Image
                    src={`https://picsum.photos/300/500?random=${i + 25}`}
                    alt="AI"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Column 3 - Flowing UP */}
            <div className="flex flex-col gap-3 animate-scroll-up">
              {[...images, ...images, ...images].map((src, i) => (
                <div
                  key={i}
                  className="relative w-full h-48 rounded-lg overflow-hidden shadow-md shadow-yellow-200"
                >
                  <Image
                    src={`https://picsum.photos/300/400?random=${i + 50}`}
                    alt="AI"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Column 4- Flowing DOWN */}
            <div className="hidden md:flex flex-col gap-3 animate-scroll-down">
              {[...images, ...images, ...images].map((src, i) => (
                <div
                  key={i}
                  className="relative w-full h-56 rounded-lg overflow-hidden shadow-md shadow-yellow-200"
                >
                  <Image
                    src={`https://picsum.photos/300/400?random=${i + 10}`}
                    alt="AI"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-10 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Why content creators love Clippy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 bg-white">
            <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <Wand2 className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Script to Video</h3>
            <p className="text-gray-500">
              Just enter a topic, and our AI writes the script, selects scenes,
              and adds voiceovers automatically.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 bg-white">
            <div className="w-14 h-14 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
              <Video className="h-8 w-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Custom Styles</h3>
            <p className="text-gray-500">
              Choose from Realistic, Cartoon, Comic, or 3D Animation styles to
              match your brand's aesthetic.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 bg-white">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Share2 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">One-Click Export</h3>
            <p className="text-gray-500">
              Download your videos in 1080p instantly, optimized for all major
              social media platforms.
            </p>
          </div>
        </div>
      </section>

      {/* --- How It Works --- */}
      <section className="bg-gray-50 py-20 px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How it Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-3">
            {[
              {
                step: 1,
                title: "Select Topic",
                desc: "Enter a simple prompt or topic for your video.",
              },
              {
                step: 2,
                title: "Choose Style",
                desc: "Pick a visual style like Cartoon or Realistic.",
              },
              {
                step: 3,
                title: "Generate",
                desc: "Wait 30 seconds while AI creates your masterpiece.",
              },
            ].map((item) => (
              <div key={item.step} className="relative pl-10">
                <div className="absolute left-0 top-0 text-6xl font-black text-purple-200 -z-10">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-pink-500">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-10 text-center border-t border-gray-100 text-gray-500 text-sm">
        <p>© 2026 Clippy AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
