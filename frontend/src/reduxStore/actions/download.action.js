import axios from 'axios'
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md'

export const CREATE_DOWNLOAD = 'CREATE_DOWNLOAD'
export const UPDATE_DOWNLOAD = 'UPDATE_DOWNLOAD'
export const ADD_DOWNLOAD = 'ADD_DOWNLOAD'

export const addDownload = (data)=>{
    return {
        type: ADD_DOWNLOAD,
        payload: data
    }
}

export const createDownload = (key,size)=>async(dispatch)=>{
            console.log(size)
            dispatch(addDownload(key))
            const url = `/api/v1/amazon/download-url`
            axios({
                url: `${url}?key=${key}`, 
                method: 'GET',
                onDownloadProgress:(p)=>{
                    const percent = Math.floor((p.loaded/size)*100)
                    dispatch(updateDownload({key,progress:percent}))
                },
                responseType: 'blob', // .then(response => {
              }).then(res => {
                    console.log(res)
                    const fileURL = URL.createObjectURL(new Blob([res.data]));
                    let alink = document.createElement('a');
                    alink.href = fileURL;
                    alink.download = key;
                    alink.click();
                    URL.revokeObjectURL()
                })
                .catch(e=>console.log(e))  
          
        
}

export const updateDownload = (data)=>{
    return {
        type: UPDATE_DOWNLOAD,
        payload: data
    }
}


