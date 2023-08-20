import React, { useEffect, useState } from 'react'
import {  Modal } from '@mantine/core';
type Modal_TP = {
    opened?:any;
    children?:any;
    onClose?:any;
    title?:string
}
const ModalCusom = ({opened,onClose,title,children}:Modal_TP) => {
    const [windowSize, setWindowSize] = useState<number | any>();

    useEffect(() => {
        function handleResize() {
          setWindowSize(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
      }, []);
  return (
    <Modal opened={opened} size={windowSize >= 900? '50%':windowSize >= 600?  '70%' :'95%'} onClose={onClose} title={title}>
        {children}
    </Modal>
  )
}

export default ModalCusom
