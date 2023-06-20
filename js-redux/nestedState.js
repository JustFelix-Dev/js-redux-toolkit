const redux = require('redux');
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

const produce = require('immer').produce
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger()

const initialState = {
    name : "Felix",
    address : {
        street :"Yoaco road",
        city : "Ogbomosho",
        state : "Oyo"
    }
}

const STREET_UPDATED = "STREET_UPDATED";

function updateStreet(){
    return{
        type : STREET_UPDATED,
        payload : "Chevron road"
    }
}

const reducer = ( state = initialState,action)=>{
    switch(action.type){
        case STREET_UPDATED:
            // return{
            //      ...state,
            //      address: {
            //         ...state.address,
            //         street : action.payload
            //      }
            // }
            return produce(state,(draft)=>{
                draft.address.street = action.payload
            })
        default:
            return state
    }
}

const store = createStore(reducer,applyMiddleware(logger));
console.log("Initial State:", store.getState())
const unsubscribe = store.subscribe(()=>{})

store.dispatch(updateStreet());

unsubscribe()

