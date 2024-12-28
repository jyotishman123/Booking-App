import React from 'react'
import CreateShowForm from '@/components/admin/CreateShowForm'

const page = () => {
  return (
    <div className="m-4 p-4">
      <div className="flex items-center justify-between ">
        <h1 className="text-3xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
            Create A Show
        </h1>
      </div>

          <div className='mt-6'>
              <CreateShowForm />
          </div>
      </div>
  )
}

export default page