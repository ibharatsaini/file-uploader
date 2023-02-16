import { ADD_DOWNLOAD, UPDATE_DOWNLOAD } from "../actions/download.action"

const initialState = {
    downloads:[]
}

export const downloadReducer = (state=initialState,actions) =>{
        switch(actions.type){
            case ADD_DOWNLOAD:
                return {
                    downloads:[
                        ...state.downloads,
                        {
                            key:actions.payload,
                            progress:0
                        }
                    ]
                }

            case UPDATE_DOWNLOAD:
                const downloads = [...state.downloads]
                for(let i=0; i<downloads.length; i++){
                    if(downloads[i].key==actions.payload.key){
                        downloads[i].progress=actions.payload.progress
                    }
                }

                return {
                    downloads:[...downloads]
                }
            default:
               return  state
        }
}