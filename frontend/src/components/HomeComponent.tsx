import React from 'react'
import Footer from './Footer'
import LottieBookAnimation from './LottieBookAnimation'

export default function HomeComponent() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Main content section - will take remaining height */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-blue-200 flex-grow">
        {/* Text Content */}
        <div className="w-full md:w-1/2 p-4 md:p-8 lg:p-12">
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center md:text-left">
            Read <br />
            Write <br />
            & More!
          </p>
        </div>

        {/* Animation - constrain height to prevent overflow */}
        <div className="w-full md:w-1/2 h-[300px] md:h-[400px] lg:h-[500px] px-4">
          <LottieBookAnimation />
        </div>
      </div>

      {/* Footer - fixed height */}
      <Footer />
    </div>
  )
}