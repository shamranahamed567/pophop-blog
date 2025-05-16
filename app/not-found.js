import Link from 'next/link'
import Image from 'next/image'

import { Button } from "@/components/ui/button"

import designImg from '../public/img/error-des.svg'
import designGradiant from '../public/img/error-gradiant.png'
import { ChevronLeft } from 'lucide-react'
 
export default async function NotFound() {

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 w-full h-full">
        <Image src={designImg} alt="Design image" className="absolute w-full h-full" />

        <div 
          className="absolute inset-0 w-full h-full bg-error-bg backdrop-blur-48"
          aria-hidden="true"
        />

        <Image src={designGradiant} alt="Design image" className="absolute inset-0 w-full h-full" />
      </div>

      <div className="max-w-130 w-full flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <h1 className="text-20 font-semibold font-geistSemiBold text-transparent bg-clip-text bg-gradient-text">
          404
        </h1>
        <h4 style={{lineHeight: "normal"}} className="text-4xl font-semibold font-geistSemiBold text-card-foreground my-3">Something’s missing <span className='tracking-error-sec'>...</span></h4>
        <p className='text-sm font-normal text-muted-foreg font-geistRegular'>{`Sorry, the page you're looking for doesn't exist or may have been moved.`}</p>
        <Button asChild>
            <Link href="/" className='flex items-center gap-1 px-8 bg-black shadow-error-btn !rounded-full mt-8 text-white'>
              <ChevronLeft color='#FFFFFF' size={20} strokeWidth={1.5} />
              Back to home
            </Link>
        </Button>
      </div>
    </div>
  )
}