import React from 'react'
import AllShow from '@/components/AllShow'

const page = () => {
  return (
    <div className="m-4 p-4">
    <div className="flex items-center justify-between ">
      <h1 className="text-3xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
        Upcomming Show
      </h1>
      
    </div>
      
      <div>
           <AllShow />
      </div>

  </div>
  )
}

export default page