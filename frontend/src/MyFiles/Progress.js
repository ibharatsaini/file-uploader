import React from 'react'
import { FiFileText } from 'react-icons/fi'
import '../styles/myfiles.css'


function Progress({name,progress}) {
    
  return (
            <div className='file'>
                <FiFileText className='fileIco' />
                <div className='colName'>
                        <div classname='name'>
                            {name}
                        </div>
                        <div className='progress'>
                            <span>{progress}%</span>
                            <div style={{width:`${progress}%`}} className='progressBar'>
                                
                            </div>
                            
                        </div>
                </div>
            </div>
  )
}

export default Progress