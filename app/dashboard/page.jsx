"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Video } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function Dashboard() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  return (
    <div className="p-10 bg-gray-50 h-screen">
      <div className="flex items-center justify-between mb-10">
        <h2 className="font-bold text-3xl text-primary flex items-center gap-2">
          Dashboard
        </h2>
      </div>

      <div className="p-10 border-2 border-dashed border-purple-200 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center h-[60vh] hover:border-purple-500 transition-all duration-300">
        <div className="bg-purple-100 p-5 rounded-full mb-6 animate-pulse">
          <Video className="h-10 w-10 text-purple-600" />
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-2">CLIPPY AI</h3>

        <p className="text-gray-500 mb-8 max-w-md text-center">
          Harness the power of AI to create engaging short videos in seconds.
          Click below to start your creative journey.
        </p>

        {isSignedIn ? (
          <Link href={"/dashboard/create-new"}>
            <Button className="bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-purple-200 flex items-center gap-2">
              <Sparkles className="h-5 w-5 fill-white" />
              Create New Video
            </Button>
          </Link>
        ) : (
          <Link href={"/sign-up"}>
            <Button className="bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-purple-200 flex items-center gap-2">
              <Sparkles className="h-5 w-5 fill-white" />
              Sign In to Create
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
