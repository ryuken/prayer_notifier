import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'

const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()

const history = syncHistoryWithStore(browserHistory, routingStore)

import Stores from './stores'

import App from './containers/App'
import Home from './components/Home'
import Clock from './components/Clock'
import Settings from './components/Settings'

render(
    <Provider stores={Stores}>
        <Router history={history}>
            <App>
                <Route exact path="/" component={Home} />
                <Route path="/clock" component={Clock} />
                <Route path="/settings" component={Settings} />
            </App>
        </Router>
    </Provider>,
    document.getElementById('root')
)
