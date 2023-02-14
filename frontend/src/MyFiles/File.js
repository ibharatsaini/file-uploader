import React, { useState } from 'react'
import { FiFileText } from 'react-icons/fi'
import { BsThreeDotsVertical } from 'react-icons/bs'

function File({name,size,handleDownload}) {
    
    const [visible,setVisible] = useState(false)

    function callDownload(){
        setVisible(false)
        handleDownload(name)
    }
  return (
    <div className='file'>
                     <FiFileText className='fileIco' />
                    
                    <div className='name'>
                        {
                          name
                        }
                    </div>
                    <div className='download'>
                      <BsThreeDotsVertical onClick={()=>setVisible(!visible)}/>
                      {  visible && (
                                        <div onClick={callDownload} id='down'>
                                                Download
                                        </div>
                                    )
                      }
                    </div>
    </div>
  )
}

export default File