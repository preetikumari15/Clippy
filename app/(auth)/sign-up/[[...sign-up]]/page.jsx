import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
   return (
      <div className="flex h-screen w-full overflow-hidden bg-white">
        <div className="relative hidden w-1/2 lg:block">
          <Image
            src= {'/sigin.jpg'}
            alt="Office Workspace"
            fill
            className="object-contain"
            priority
          />
          
        </div>
  
        <div className="flex w-full flex-col items-center justify-center bg-gray-50 lg:w-1/2">
          <SignUp 
              appearance={{
                  elements: {
                      card: "shadow-xl border-none",
                      formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case"
                  }
              }}
          />
        </div>
      </div>
    );
}