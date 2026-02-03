"use client"
import React, { useState } from 'react'
import SelectTopic from './_component/SelectTopic'
import SelectStyle from './_component/SelectStyle';
import SelectDuration from './_component/SelectDuration';
import { Button } from '@/components/ui/button';

const CreateNew = () => {
  const[formData, setFormData] = useState([]);
  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({  
    ...prev,
    [fieldName]: fieldValue
  }));
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
        <Button className='mt-10 w-full hover:bg-purple-900 hover:cursor-pointer font-bold'>Create short video</Button>
      </div>
    </div>
  )
}

export default CreateNew