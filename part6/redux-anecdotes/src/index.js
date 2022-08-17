import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store'
// import { legacy_createStore as createStore} from 'redux'
import { Provider } from 'react-redux'
import App from './App'

// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
