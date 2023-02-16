import { ADD_UPLOAD, UPDATE_UPDLOAD } from "../actions/upload.action"

const initialState = {
    uploads:[]
}

export const uploadReducer = (state=initialState,actions) =>{
        switch(actions.type){
            case ADD_UPLOAD:
                return {
                    uploads:[
                        ...state.uploads,
                        {
                            key:actions.payload,
                            progress:0
                        }
                    ]
                }

            case UPDATE_UPDLOAD:
                const uploads = [...state.uploads]
                for(let i=0; i<uploads.length; i++){
                    if(uploads[i].key==actions.payload.key){
                        uploads[i].progress=actions.payload.progress
                    }
                }

                return {
                    uploads:[...uploads]
                }
                
            default:
               return  state
        }
}