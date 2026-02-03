"use client"
import React, { useState } from 'react'
import SelectTopic from './_component/SelectTopic'
import SelectStyle from './_component/SelectStyle';
import SelectDuration from './_component/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_component/CustomLoading';

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

    console.log("API RESPONSE:", res.data.result);
    setVideoScript(res.data.result);
  } catch (error) {
    console.error("ERROR:", error);
  }
  setLoading(false);
};


  const onClickCreateHandler=()=>{
    GetVideoScript();
  }

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