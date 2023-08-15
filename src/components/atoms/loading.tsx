"use client";

import { Loader } from "@mantine/core";

function Loading() {
  return(
    
  <>
    <div className="fixed top-0 bottom-0 left-0 right-0 flex w-full h-full bg-transparent">
      <Loader size="xl" variant="oval" className="m-auto !text-bg_banfsgy" />;
    </div>
  </>
  )
}

export default Loading;
