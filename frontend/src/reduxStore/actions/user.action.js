
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER='LOGOUT_USER'
export const LOADING_USER='LOADING_USER'
export const UPDATE_USER='UPDATE_USER'
export const ERROR_USER ='ERROR_USER'
export const UPDATE_FILES='UPDATE_FILES'

export const errorUser = (data)=>{

    return {
        type: ERROR_USER,
        payload: data
    }
}


export const fetchUser =()=>async(dispatch)=>{
        try{
            const result =await (await fetch(`/api/v1/user/me`)).json()

            if(!result.success){
                return {isAuthenticated: false, user:null}
            }
            localStorage.setItem('user',JSON.stringify(result.data))
            // const data = 
            return dispatch(updateUser({...result.data}))

        } catch(e) {
            console.log(e)
        }
}

export const logoutUser = ()=>{
    return {
        type: LOGOUT_USER,
    }
}
export const logout= () =>async (dispatch)=>{
    try{
            const result = await( await fetch(`/api/v1/user/logout`)).json()
            console.log(result)

            // if(!result.success) return
            // console.log(result.success)
            localStorage.clear()

            return dispatch(logoutUser())

    }catch(e){

        console.log(e)

    }
}


export const loadingUser = ()=>{
    return {
        type: LOADING_USER
    }
}

export const updateUser = (data)=>{
    return {
        type: UPDATE_USER,
        payload: data
    }
}

export const loginUser = (data)=>async(dispatch)=>{
    try{
        // dispatch(loadingUser())
       const result =await ( await fetch(`/api/v1/google/get-url`)).json()

       if(!result.success) return 

       window.location.href = result.data

    }catch(e){
        console.log(e)
    }
}

export const updateFiles=(data)=>{
    return {
        type: UPDATE_FILES,
        payload:data
    }
}

