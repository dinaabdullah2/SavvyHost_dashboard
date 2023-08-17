import { IconEdit } from '@tabler/icons-react'
import React from 'react'
import OnePage from './OnePage'

const PageBuilder = () => {
  return (
    <div className='px-10 flex '>
        <div className='m-auto w-[80%]'>
              <div className='grid grid-cols-12'>
                  <div className='col-span-12 '>
                     <div className='flex flex-col '>
                         <div className='flex flex-row justify-between bg-white items-center'>
                            <OnePage pageName='Home Page' sectionName='Feature Section' />
                         </div>
                     </div>
                  </div>
              </div>
        </div>
    </div>
  )
}

export default PageBuilder
