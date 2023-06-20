const configureStore = require('@reduxjs/toolkit').configureStore
const reduxLogger = require('redux-logger')
const cakeReducer = require('../features/cake/cakeSlice')
const iceCreamReducer = require('../features/iceCream/iceCreamSlice')

const logger = reduxLogger.createLogger()

const store = configureStore({
    reducer : {
        cake : cakeReducer,
        iceCream : iceCreamReducer
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger)
    
})

module.exports = store