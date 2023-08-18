import { IconEdit } from '@tabler/icons-react'
import React from 'react'
import OnePage from './Features'
import Features from './Features'
import Security from './Security'
import AboutUs from './AboutUs'
import Events from './Events'
import Blog from './Blog'
import HeroSection from './HeroSection'
import Newsletter from './Newsletter'
import ServiceHero from './ServiceHero'
import FeaturesArea from './FeatureArea'
import FeatureImg from './FeatureImg'


const PageBuilder = () => {
  return (
    <div className='md:px-10 px-2 flex '>
        <div className='m-auto lg:w-[80%] w-[100%] '>
              <div className='grid grid-cols-12 gap-5'>
                  <div className='col-span-12 '>
                     <div className='flex flex-col '>
                         <div className='flex flex-row justify-between bg-white items-center'>
                           <div className="border w-[100%]  border-white-light dark:border-[#1b2e4b] rounded-md mb-3 pb-5">
                                <h5 className="mb-5 w-[100%] text-base  font-bold dark:text-white p-2  border-b   border-white-light">Home Page </h5>
                                <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
                                    <HeroSection />
                                    <Features />
                                    <Security />
                                    <AboutUs />
                                    <Events />
                                    <Blog />
                                    <Newsletter />


                                </div>
                            </div>
                         </div>
                     </div>
                  </div>
                  <div className='col-span-12 '>
                     <div className='flex flex-col '>
                         <div className='flex flex-row justify-between bg-white items-center'>
                           <div className="border w-[100%]  border-white-light dark:border-[#1b2e4b] rounded-md mb-3 pb-5">
                                <h5 className="mb-5 w-[100%] text-base  font-bold dark:text-white p-2  border-b   border-white-light">Services Page </h5>
                                <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
                                    <ServiceHero />
                                    <FeaturesArea />
                                    <FeatureImg />
                                </div>
                            </div>
                         </div>
                     </div>
                  </div>
              </div>
        </div>
    </div>
  )
}

export default PageBuilder
