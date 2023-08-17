import { IconEdit } from '@tabler/icons-react'
import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';

type OnePage_TP = {
     pageName?:string,
     sectionName?:string
}


const OnePage = ({pageName,sectionName}:OnePage_TP) => {

    const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
    <Modal opened={opened} onClose={close} title="Authentication">
    {/* Modal content */}
  </Modal>

    <div className="border w-[100%]  border-white-light dark:border-[#1b2e4b] rounded-md mb-3 pb-5">
    <h5 className="mb-5 w-[100%] text-base  font-bold dark:text-white p-2  border-b   border-white-light">{pageName}</h5>
        <div className="grid lg:grid-cols-12 max-sm:grid-cols-1 gap-5 px-3 ">
            <div className="lg:col-span-12 max-sm:col-span-1 p-1">
                <div className='flex flex-row items-center justify-between w-[100%]  border py-5 px-2  bg-gray-100 '>
                    <h6 className=' font-semibold '>{sectionName}</h6>
                    <button className='' onClick={open}>
                      <IconEdit className='text-blue-700' />
                    </button>
                </div>
            </div>
        </div>
     </div>
</>
  )
}

export default OnePage
