import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'

const routingStore = new RouterStore()

const history = syncHistoryWithStore(browserHistory, routingStore)

import Stores from './stores'

import App from './containers/App'
import Home from './components/Home'
import Settings from './components/Settings'

render(
    <Provider stores={Stores} routingStore={routingStore}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="settings" component={Settings} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
