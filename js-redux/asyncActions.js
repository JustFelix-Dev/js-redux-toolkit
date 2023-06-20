const redux = require('redux');
const { createStore } = require("redux");
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios');
const applyMiddleware = redux.applyMiddleware

const initialState = {
    loading : false,
    users : [],
    error : ''
}

const FETCHED_USER_REQUESTED = 'FETCHED_USER_REQUESTED';
const FETCHED_USER_SUCCEEDED = 'FETCHED_USER_SUCCEEDED';
const FETCHED_USER_FAILED = 'FETCHED_USER_FAILED';

const fetchUsersRequest=()=>{
    return {
        type : FETCHED_USER_REQUESTED
    }
}

const fetchedUsersSucceed=(users)=>{
    return {
        type : FETCHED_USER_SUCCEEDED,
        payload : users
    }
}


const fetchUsersFailed = (error)=>{
    return {
        type : FETCHED_USER_FAILED,
        payload: error
    }
}


const reducer = (state = initialState,action)=>{
    switch(action.type){
        case FETCHED_USER_REQUESTED:
            return{
                ...state,
                loading : true
            }
        case FETCHED_USER_SUCCEEDED:
            return {
                ...state,
                loading : false,
                users : action.payload,
                error : ''
            }
        case FETCHED_USER_FAILED:
            return {
                ...state,
                loading :true,
                users : [],
                error : action.payload
            }
        default:
            return state;
    }

}

const fetchUsers= ()=>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response)=>{
            const users = response.data.map(user=> user.id )
            dispatch(fetchedUsersSucceed(users))
        }).catch(err=>{
           dispatch(fetchUsersFailed(err.message))
        })
    }

}

const store = createStore(reducer,applyMiddleware(thunkMiddleware))

store.subscribe(()=>{ console.log(store.getState())})
store.dispatch(fetchUsers())