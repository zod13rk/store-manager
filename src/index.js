import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import { create } from 'jss'
import rtl from 'jss-rtl'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'

const jss = create({ plugins: [...jssPreset().plugins, rtl()] })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StylesProvider jss={jss}>
        <App />
      </StylesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
