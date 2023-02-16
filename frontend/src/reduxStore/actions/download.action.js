import axios from 'axios'

export const CREATE_DOWNLOAD = 'CREATE_DOWNLOAD'
export const UPDATE_DOWNLOAD = 'UPDATE_DOWNLOAD'
export const ADD_DOWNLOAD = 'ADD_DOWNLOAD'

export const addDownload = (data)=>{
    return {
        type: ADD_DOWNLOAD,
        payload: data
    }
}

export const createDownload = (key,url)=>async(dispatch)=>{
        
            dispatch(addDownload(key))
            axios({
                url: url, //your url
                method: 'GET',
                onDownloadProgress:(p)=>{
                    dispatch(updateDownload({key,progress:(Math.floor(p.progress*100))}))
                },
                responseType: 'blob', // .then(response => {
              }).then(res => {
                    const fileURL = window.URL.createObjectURL(res.data);
                    let alink = document.createElement('a');
                    alink.href = fileURL;
                    alink.download = key;
                    alink.click();
                })
                .catch(e=>console.log(e))  
        
}

export const updateDownload = (data)=>{
    return {
        type: UPDATE_DOWNLOAD,
        payload: data
    }
}


