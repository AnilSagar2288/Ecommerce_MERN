import { configureStore, combineReducers} from '@reduxjs/toolkit'
import { productReducer,productDtailsReducer } from './reducers/productReducer';
import { userReducer } from './reducers/userReducer';

const reducer = combineReducers({
    products :productReducer,
    productDetails:productDtailsReducer,
    user:userReducer
});

const initialState={
    
}


const store = configureStore({reducer,initialState})


export default store
