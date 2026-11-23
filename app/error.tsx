'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  retry,
}: {
  error: unknown
  retry: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#fafafa] px-6 py-16">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#fa921a] sm:text-6xl">
         
          <span className="font-normal">Something Went Wrong</span>
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-[#3d4657]">
          We couldn&apos;t load this page due to an unexpected error. Please try again in a moment.
        </p>
        
         <p className='pt-3 font-bold'>
         {`${error}`} 
         </p>

        <p className="mt-6 text-[#3d4657]">
          We apologize for the inconvenience.
        </p>

        <button
          onClick={
            // Attempt to recover by re-fetching and re-rendering the segment
            () => retry()
          }
          className="mt-8 rounded-md bg-[#f59c0c] px-6 py-2.5 text-sm text-white transition-colors hover:bg-[#4a5464]"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}