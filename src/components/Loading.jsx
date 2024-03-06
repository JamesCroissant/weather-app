import React from 'react'
import { SyncLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 ">
      <SyncLoader color="#a3cdef" size={28} margin={10} />
    </div>
    
  )
}

export default Loading