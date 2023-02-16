import {createStore,combineReducers , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { downloadReducer } from './reducers/download.reducer'
import { uploadReducer } from './reducers/upload.reducer'
import { userReducer } from './reducers/user.reducer'


const reducer = combineReducers({
    user: userReducer,
    download: downloadReducer,
    upload: uploadReducer
})

const store = createStore(reducer,applyMiddleware(thunk))

export default store