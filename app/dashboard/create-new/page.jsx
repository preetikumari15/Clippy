"use client"
import React, { useState } from 'react'
import SelectTopic from './_component/SelectTopic'
import SelectStyle from './_component/SelectStyle';
import SelectDuration from './_component/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_component/CustomLoading';
import { v4 as uuidv4 } from 'uuid';

const scriptData = 'It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him. The hallway smelt of boiled cabbage and old rag mats. At one end of it a coloured poster, too large for indoor display, had been tacked to the wall. It depicted simply an enormous face, more than a metre wide: the'
const CreateNew = () => {
  const[formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({  
    ...prev,
    [fieldName]: fieldValue
  }));
}

const onClickCreateHandler=()=>{
    //GetVideoScript();
    downloadAudio(scriptData);
  }
  //get video script
const GetVideoScript = async () => {
  setLoading(true);
  const prompt =
    'Write a script to generate ' +
    formData.duration +
    ' video on topic: ' +
    formData.topic +
    ' along with Ai image prompt in ' +
    formData.imageStyle +
    ' format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No plain text.';

  console.log("PROMPT:", prompt);

  try {
    const res = await axios.post("/api/get-video-script", {
      prompt,
    });
    //console.log(res.data.result);

    setVideoScript(res.data.result);
    GenerateAudioFile(res.data.result);
  } catch (error) {
    console.error("ERROR:", error);
  }
  setLoading(false);
};

//generate audio file
 const downloadAudio = async (scriptText) => {
    try {
      setLoading(true);

      const res = await fetch("/api/generate-audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: scriptText }),
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "output.wav"; // speechmatics returns wav
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download Error:", error);
    }

    setLoading(false);
  };

  

  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-primary text-4xl text-center'>Create New</h2>
      <div className='mt-10 shadow-md p-10'>
        {/* Select topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />
        {/* Select style */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />
        {/* Create button */}
        <Button onClick={onClickCreateHandler} className='mt-10 w-full hover:bg-purple-900 hover:cursor-pointer font-bold'>Create short video</Button>
      </div>
      <CustomLoading loading={loading} />
    </div>
  )
}

export default CreateNew