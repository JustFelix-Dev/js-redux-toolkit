const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const iceCREAM_ORDERED = "iceCREAM_ORDERED"
const iceCREAM_RESTOCKED = "iceCREAM_RESTOCKED"

function orderIceCream(){
    return{
        type : iceCREAM_ORDERED,
        payload : 1
    }
}

function restockIceCream(qty=1){
    return{
        type : iceCREAM_RESTOCKED,
        payload : qty
    }
}
function restockCake(qty=1){
    return {
        type : CAKE_RESTOCKED,
        payload : qty
    }
}
function orderCake(){
    return{
        type : CAKE_ORDERED,
        payload : 1
    }
}

initialCakeState = {
    numOfCakes : 10,
}

initialIceCreamState = {
    numOfCreams : 20
}

const iceCreamReducer = (state = initialIceCreamState,action)=>{
    switch(action.type){
        case iceCREAM_ORDERED:
            return{
                 ...state,
                 numOfCreams : state.numOfCreams - action.payload
            }
        case iceCREAM_RESTOCKED:
            return{
                ...state,
                numOfCreams : state.numOfCreams + action.payload
            }
            default:
                return state
    }
}

const cakeReducer = (state = initialCakeState,action)=>{
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state, 
                numOfCakes : state.numOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return{
                 ...state,
                 numOfCakes : state.numOfCakes + action.payload
            }
            default :
            return state
    }
}

const rootReducer = combineReducers({
    cake :cakeReducer,
    iceCream : iceCreamReducer
})

const store = createStore(rootReducer)
console.log("InitialState:",store.getState())
const unsubscribe = store.subscribe(()=>{console.log("Update State:", store.getState())})
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake())
const actions = bindActionCreators({orderCake,restockCake,orderIceCream,restockIceCream},store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream()
actions.restockCake()
unsubscribe()



