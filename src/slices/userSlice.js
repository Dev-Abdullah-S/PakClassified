import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const userSlice = createSlice({
    name : 'userSlice' ,
    initialState,
    reducers:{
        setUserInfo:(state , action) =>{
            state.userInfo = action.payload
            localStorage.setItem("userInfo" , JSON.stringify(action.payload))
        },
        setUserLogout : (state , action) => {
            state.userInfo = null 
            localStorage.removeItem('userInfo')
        }
    }
})

export const {setUserInfo , setUserLogout} = userSlice.actions

export default userSlice.reducer