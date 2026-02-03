"use client"
import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectDuration = ({ onUserSelect }) => {
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-2xl text-primary'>Duration</h2>
        <p className='text-gray-600'>Select duration for your content</p>
        <Select onValueChange={(value) => {
            value != 'Custom Prompt' && onUserSelect('duration',value)
            }}>
            <SelectTrigger className="w-full mt-2 p-6 text-lg">
                <SelectValue placeholder="Content Duration" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='30 seconds'>30 seconds</SelectItem>
                <SelectItem value='60 seconds'>60 seconds</SelectItem>
                <SelectItem value='90 seconds'>90 seconds</SelectItem>
            </SelectContent>
        </Select>
    </div>
  )
}

export default SelectDuration