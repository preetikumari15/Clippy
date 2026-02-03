"use client"
import Image from 'next/image'
import React, { useState } from 'react'

const SelectStyle = ({ onUserSelect }) => {
    const styleOptions = [
        {
            name: 'Realistic',
            image: '/real.jpg'
        },
        {
            name: 'Cartoon',
            image: '/cartoon.jpg'
        },
        {
            name: 'Comic',
            image: '/comic.jpg'
        },
        {
            name: 'Pixel Art',
            image: '/pixel.jpg'
        },
        {
            name: 'Anime',
            image: '/anime.jpg'
        }
    ]
    const [selectedOption, setSelectedOption] = useState();
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-2xl text-primary'>Content</h2>
        <p className='text-gray-600'>Select a topic to get started</p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3'>
            {styleOptions.map((item, index) => (
                <div
                key={index}
                className={`relative hover:scale-105 transition-all cursor-pointer ${selectedOption==item.name&&'border-4 border-primary rounded-xl'}`}>
                    <Image src={item.image} alt={item.name} width={100} height={100}
                    className='h-80 object-fit rounded-lg w-full'
                    onClick={() => {setSelectedOption(item.name)
                        onUserSelect('imageStyle', item.name)
                    }} />
                    <h2 className='absolute bottom-0 p-1 bg-black text-center text-white font-bold rounded-b-lg w-full'>
                        {item.name}
                    </h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SelectStyle