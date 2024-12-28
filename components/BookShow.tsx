"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'

const BookShow = () => {

    const searchParams = useSearchParams()
    const search = searchParams.get('show')

    console.log(search)

  return (
    <div>BookShow</div>
  )
}

export default BookShow