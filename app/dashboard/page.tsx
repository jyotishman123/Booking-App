import React from 'react'
import Logout from '@/components/Logout'

const page = () => {
  return (
    <div className="m-4 p-4">
    <div className="flex items-center justify-between p-4">
      <h1 className="text-3xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
        User Dashboard
      </h1>
      <Logout />
    </div>
  </div>
  )
}

export default page