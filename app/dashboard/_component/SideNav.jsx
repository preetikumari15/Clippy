"use client"
import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function SideNav() {
    const MenuOption = [
        {
            id: 1,
            name: 'Dashboard',
            path: '/dashboard',
            Icon: PanelsTopLeft
        },
        {
            id: 2,
            name: 'Create New',
            path: '/dashboard/create-new',
            Icon: FileVideo
        },
        {
            id: 3,
            name: 'Upgrade',
            path: '/upgrade',
            Icon: ShieldPlus
        },
        {
            id: 4,
            name: 'Account',
            path: '/account',
            Icon: CircleUser
        }
    ]
    const path = usePathname();
  return (
    <div className='w-64 h-screen shadow-md p-5'>
        <div className='grid gap-3'>
            {MenuOption.map((item, index) => (
                <Link href={item.path} key={index}>
                    <div className={`${path === item.path ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'} flex items-center gap-3 p-3 rounded-md cursor-pointer`}>
                        <item.Icon/>
                        <h2>{item.name}</h2>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SideNav