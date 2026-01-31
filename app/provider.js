"use client";
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useEffect } from 'react'
import { db } from '@/configs/db';
import { Users } from '@/configs/schema';

const Provider = ({ children }) => {
  const {user} = useUser();

  useEffect(() => {
    user&&isNewUser();
  }, [user]);

  const isNewUser = async () => {
    const result = await db.select().from(Users)
    .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

    if(!result[0]){
      // Create new user
      await db.insert(Users).values({
        email: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        imageUrl: user?.imageUrl
      });
    }
  }

  return (
    <div>
        {children}
    </div>
  )
}

export default Provider