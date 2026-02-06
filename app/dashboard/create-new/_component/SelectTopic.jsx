"use client"
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'

const SelectTopic = ({onUserSelect}) => {
    const options = ['Custom Prompt', 'Random AI Sory', 'Scary Story', 'Kids Story', 'Adventure Story', 'Romance Story']
    const [selectedOption, setSelectedOption] = useState();
  return (
    <div>
        <h2 className='font-bold text-2xl text-primary'>Content</h2>
        <p className='text-gray-600'>Select a topic to get started</p>
        <Select onValueChange={(value) => {
            setSelectedOption(value)
            value != 'Custom Prompt' && onUserSelect('topic',value)
            }}>
            <SelectTrigger className="w-full mt-2 p-6 text-lg">
                <SelectValue placeholder="Content Type" />
            </SelectTrigger>
            <SelectContent>
                {options.map((item, index) => (
                <SelectItem key={index} value={item}>{item}</SelectItem>
                ))}
            </SelectContent>
        </Select>

        {selectedOption==='Custom Prompt' && 
            <Textarea className="mt-4"
            onChange={(e) => onUserSelect('topic',e.target.value)}
            placeholder="Enter your custom prompt here..." />
        }
    </div>
  )
}

export default SelectTopic