import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'

const CustomLoading = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
        <AlertDialogContent className='bg-white'>
            <div className='bg-white flex flex-col items-center justify-center my-10'>
                <Image src={'/loading.gif'} alt='Loading' width={100} height={100} />
                <h2 className="text-xl font-bold">Generating your video...</h2>
                <p className='text-gray-600 mt-2'>This may take a few moments. Please do not close the window.</p>
            </div>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default CustomLoading