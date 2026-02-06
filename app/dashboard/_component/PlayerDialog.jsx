import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";

const PlayerDialog = ({ playVideo, videoData }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [durationInFrame, setDurationInFrame] = useState(120);

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

  const stream = canvas.captureStream(30);

  const audio = new Audio(videoData.audioFileUrl);
  audio.crossOrigin = "anonymous";

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
  };

  // IMAGE SLIDESHOW
  let index = 0;
  const drawFrame = () => {
    const img = new Image();
    img.src = videoData.imageList[index];

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    index = (index + 1) % videoData.imageList.length;
  };

  // Change image every 2 sec
  const interval = setInterval(drawFrame, 2000);

  drawFrame(); // draw first frame

  // WAIT 500ms before recording
  await new Promise((res) => setTimeout(res, 500));

  recorder.start();

  await audioCtx.resume();
  audio.play();

  audio.onended = () => {
    clearInterval(interval);
    setTimeout(() => recorder.stop(), 800);
  };
};





  return (
    <Dialog open={openDialog}>
      <DialogContent className="bg-white flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your Video is Ready!
          </DialogTitle>
        </DialogHeader>

        {/* Guard */}
        {videoData?.imageList?.length > 0 && (
          <Player
            component={RemotionVideo}
            durationInFrames={Number(durationInFrame.toFixed(0))}
            compositionWidth={300}
            compositionHeight={450}
            fps={30}
            controls
            inputProps={{
              ...videoData,
              setDurationInFrame: (frameValue) =>
                setDurationInFrame(frameValue),
            }}
          />
        )}

        <div className="flex gap-10 mt-10">
          <Button variant="ghost">Cancel</Button>
          <Button onClick={handleExport}>Export</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;
