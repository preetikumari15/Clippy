"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PlayerDialog = ({ playVideo, videoData }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const fps = 30;

  useEffect(() => {
    setOpenDialog(playVideo);
  }, [playVideo]);

  const handleExport = async () => {
    if (!videoData?.imageList?.length || !videoData?.audioFileUrl) {
      alert("Missing video data");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 1280;
    const ctx = canvas.getContext("2d");

    const audio = new Audio(videoData.audioFileUrl);
    audio.crossOrigin = "anonymous";

    const stream = canvas.captureStream(30);
    const audioCtx = new AudioContext();
    const src = audioCtx.createMediaElementSource(audio);
    const dest = audioCtx.createMediaStreamDestination();
    src.connect(dest);
    src.connect(audioCtx.destination);

    const finalStream = new MediaStream([
      ...stream.getVideoTracks(),
      ...dest.stream.getAudioTracks(),
    ]);

    const recorder = new MediaRecorder(finalStream, {
      mimeType: "video/webm;codecs=vp8",
    });

    let chunks = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "video.webm";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);

      finalStream.getTracks().forEach((track) => track.stop());

      toast.success("Video exported 🎉");
    };

    // IMAGE SLIDESHOW
    let index = 0;
    const drawFrame = () => {
      const img = new Image();

      img.crossOrigin = "anonymous";
      img.src = videoData.imageList[index];

      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };

      img.onerror = () => {
        console.warn("Failed to load image:", videoData.imageList[index]);
      };

      index = (index + 1) % videoData.imageList.length;
    };

    const interval = setInterval(drawFrame, 2000);
    drawFrame();

    audio.onended = () => {
      clearInterval(interval);
      recorder.stop();
    };

    await new Promise((res) => setTimeout(res, 500));

    recorder.start();

    // Resume context and play audio safely
    await audioCtx.resume();

    try {
      await audio.play();
    } catch (err) {
      console.error("Audio play failed. Check browser autoplay policies.", err);

      recorder.stop();
      clearInterval(interval);
    }
  };

  return (
    <Dialog open={openDialog}>
      <DialogContent className="bg-white flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your Video is Ready!
          </DialogTitle>
        </DialogHeader>

        {videoData?.imageList?.length > 0 && (
          <Player
            component={RemotionVideo}
            durationInFrames={Math.floor(
              (Number(videoData?.duration) || 10) * fps,
            )}
            compositionWidth={300}
            compositionHeight={450}
            fps={fps}
            controls
            inputProps={{
              ...videoData,
              duration: Number(videoData?.duration) || 10,
            }}
          />
        )}

        <div className="flex gap-10 mt-10">
          <Button
            variant="ghost"
            className="hover:cursor-pointer"
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            className="hover:bg-purple-900 hover:cursor-pointer"
          >
            Export
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;
