"use client";
import React, { useState } from "react";
import Header from "./_component/Header";
import { VideoDataContext } from "../_context/VideoDataContext";

function DashboardLayout({ children }) {
  const [videoData, setVideoData] = useState([]);
  return (
    <VideoDataContext.Provider value={{ videoData, setVideoData }}>
      <div>
        <Header />
        <div className="mx-5 md:mx-20 my-10">
            {children}
        </div>
      </div>
    </VideoDataContext.Provider>
  );
}

export default DashboardLayout;
