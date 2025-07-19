import React from 'react'
import Aboutme from '@/components/Aboutme'
import { Metadata } from 'next'

const page = () => {
  return (
    <div>
       <Aboutme />
    </div>
  )
}

export default page
export const metadata: Metadata = {
  title: "About Me - Skillswap",
  description: "A fun and quirky about me page showcasing my skills, personality, and developer mode.",
};
