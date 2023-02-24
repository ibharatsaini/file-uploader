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
            const url = `/api/v1/amazon/download-url`
            // const stream = new ReadableStream({
            //     async start(controller) {
            //       while (true) {
            //         const { done, value } = await reader.read();
            
            //         if (done) {
            //           controller.close();
            //           break;
            //         }
            
            //         controller.enqueue(value);
            //       }
            //     },
            //   });
            axios({
                url: `${url}?key=${key}`, 
                method: 'GET',
                onDownloadProgress:(p)=>{
                    console.log(p)
                    dispatch(updateDownload({key,progress:(Math.floor(p.progress*100))}))
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


