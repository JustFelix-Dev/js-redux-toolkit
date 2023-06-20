const createSlice = require('@reduxjs/toolkit').createSlice

const initialState = {
    numOfCreams : 15
}
const iceCreamSlice = createSlice({
    name : "iceCream",
    initialState,
    reducers : {
           ordered : (state)=>{
               state.numOfCreams--
           },
           restocked : (state,action)=>{
               state.numOfCreams += action.payload
           }
    },
    extraReducers : {
        ['cake/ordered']: (state)=>{
            state.numOfCreams--
        }
    }
})

module.exports = iceCreamSlice.reducer
module.exports.iceCreamActions = iceCreamSlice.actions