"use client";
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_component/SelectTopic";
import SelectStyle from "./_component/SelectStyle";
import SelectDuration from "./_component/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_component/CustomLoading";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import PlayerDialog from "../_component/PlayerDialog";

const CreateNew = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [playVideo, setPlayVideo] = useState(false);
  const { videoData, setVideoData } = useContext(VideoDataContext);

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onClickCreateHandler = async () => {
    await GetVideoScript();
  };

  // Restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("videoData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setVideoData(parsed);
      setImageList(parsed.imageList);
    }
  }, []);

  // SCRIPT
  const GetVideoScript = async () => {
    setLoading(true);

    const prompt =
      "Write a script to generate " +
      formData.duration +
      " video on topic: " +
      formData.topic +
      " along with Ai image prompt in " +
      formData.imageStyle +
      " format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No plain text.";

    try {
      const res = await axios.post("/api/get-video-script", { prompt });

      const scriptArray = res.data.result;

      if (!Array.isArray(scriptArray)) {
        console.log("Invalid Script:", scriptArray);
        setLoading(false);
        return;
      }

      const images = await generateImage(scriptArray);
      const audioUrl = await generateAudio(scriptArray);

      const finalVideoData = {
        videoScript: scriptArray,
        imageList: images,
        audioFileUrl: audioUrl,
        duration: parseInt(formData.duration),
      };

      setVideoData(finalVideoData);
      localStorage.setItem(
        "videoData",
        JSON.stringify({
          videoScript: scriptArray,
          imageList: images,
          audioFileUrl: audioUrl,
          duration: parseInt(formData.duration),
        }),
      );

      setPlayVideo(true);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  // AUDIO
  const generateAudio = async (scriptArray) => {
    const fullScript = scriptArray.map((s) => s.ContentText).join(" ");

    const res = await fetch("/api/generate-audio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: fullScript }),
    });

    const blob = await res.blob();

    if (!blob.type.startsWith("audio/")) {
      console.log("Invalid audio");
      return null;
    }

    const base64 = await blobToBase64(blob);
    return base64;
  };

  //  IMAGE
  const blobToBase64 = (blob) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

  const generateImage = async (videoScriptData) => {
    let images = [];

    for (const scene of videoScriptData) {
      try {
        const response = await fetch(
          "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: scene.imagePrompt }),
          },
        );

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`HF Error: ${response.status} - ${errText}`);
        }

        const blob = await response.blob();

        if (!blob.type.startsWith("image/")) {
          console.log("Skipped invalid image:", blob.type);
          continue; // DO NOT PUSH
        }

        const base64 = await blobToBase64(blob);
        images.push(base64);
      } catch (e) {
        console.log("Image error:", e);
        throw new Error(
          "Image generation failed. Image Generation quota may be exceeded.",
        );
      }
    }

    setImageList(images);
    return images;
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-primary text-4xl text-center">
        Create New
      </h2>

      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />

        <Button
          onClick={onClickCreateHandler}
          className="mt-10 w-full font-bold"
        >
          Create short video
        </Button>
      </div>

      <CustomLoading loading={loading} />

      <PlayerDialog playVideo={playVideo} videoData={videoData} />
    </div>
  );
};

export default CreateNew;
