import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {store} from './helpers/store'
import { Provider } from 'react-redux';

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'))
serviceWorker.unregister();