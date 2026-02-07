"use client";
import { AbsoluteFill, Audio, Img, Sequence, useVideoConfig } from "remotion";

const RemotionVideo = ({ imageList = [], audioFileUrl, duration = 10 }) => {
  const { fps } = useVideoConfig();

  const totalFrames = duration * fps;
  const framesPerImage = Math.floor(totalFrames / imageList.length);

  return (
    <AbsoluteFill>
      {imageList?.map((item, i) => {
        if (!item || !item.startsWith("data:image")) return null;

        return (
          <Sequence
            key={i}
            from={i * framesPerImage}
            durationInFrames={framesPerImage}
          >
            <Img
              src={item}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Sequence>
        );
      })}
      {audioFileUrl && <Audio src={audioFileUrl} />}
      console.log("Audio SRC:", audioFileUrl);
    </AbsoluteFill>
  );
};

export default RemotionVideo;
