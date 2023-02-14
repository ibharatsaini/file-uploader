import { fetchUser,ERROR_USER, LOGIN_USER, LOGOUT_USER, UPDATE_USER, UPDATE_FILES } from "../actions/user.action";


const localUser = () => {

    const userInfo= localStorage.getItem('user')!=="undefined" ? 
                        JSON.parse(localStorage.getItem("user")) : 
                        localStorage.clear()
    
    
    
    return  userInfo ? { 
            isAuthenticated:true, 
            user:userInfo
    } : {
        isAuthenticated:false,
        user:null
    }

}

const {isAuthenticated,user} = localUser()

const initialState = {
    loading:false,
    error:null,
    isAuthenticated,
    user
}


export const userReducer = (state=initialState,actions)=>{
            switch(actions.type){

                case LOGOUT_USER:
                    console.log('logout')
                    return {
                        loading:false,
                        error:false,
                        user:null,
                        isAuthenticated:false
                    }

                case ERROR_USER:

                    return {
                        loading:false,
                        error:actions.payload,
                        user:null,
                        isAuthenticated:false
                    }
                case UPDATE_USER:
                    return {
                        loading:false,
                        error: null,
                        user: actions.payload,
                        isAuthenticated:true
                    }
                case UPDATE_FILES:
                    return {
                        ...state,
                        user:{
                            ...state.user,
                            files:[
                                ...state.user.files,
                                actions.payload
                            ]
                        }
                    }
                
                default:
                    return state
            }
}