"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const EmptyState = () => {
  return (
    <div className='p-5 py-24 flex flex-col items-center mt-10 border-2 border-dotted'>
        <h2>No Videos Found</h2>
        <Link href={'/dashboard/create-new'}>
          <Button>Create New Video</Button>
        </Link>
    </div>
  )
}

export default EmptyState