import reducer from './reducers/anecdoteReducer'

import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer:{
        anecdotes: reducer
    }
})

// const store = createStore(
//     reducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )

export default store