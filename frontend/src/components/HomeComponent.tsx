import React from 'react'
import Footer from './Footer'
import LottieBookAnimation from './LottieBookAnimation'

export default function HomeComponent() {
  return (
    <div className="max-h-screen flex flex-col">
    <div className="flex items-center justify-between bg-blue-200">
      {/* <Middle /> */}
      <div className="">
        <p className="text-7xl font-bold absolute top-1/4 left-2">
          Read <br />
          Write <br />
          & More!
        </p>
      </div>

      <div>
        <div className="w-full h-full">
          <LottieBookAnimation />
        </div>
      </div>
    </div>

    <div>
      <Footer />
    </div>
  </div>
  )
}
