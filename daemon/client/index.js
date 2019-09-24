import 'babel-polyfill'
import React, { Suspense } from 'react'
import { render } from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'

const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()

const history = syncHistoryWithStore(browserHistory, routingStore)

import Stores from './stores'

const App = React.lazy(() => import('./containers/App'))
const Home = React.lazy(() => import('./components/Home'))
const Clock = React.lazy(() => import('./components/Clock'))
const Settings = React.lazy(() => import('./components/Settings'))

render(
    <Provider stores={Stores}>
        <Router history={history}>
            <Suspense fallback={<div>Loading...</div>}>
                <App>
                    <Route exact path="/" component={Home} />
                    <Route path="/clock" component={Clock} />
                    <Route path="/settings" component={Settings} />
                </App>
            </Suspense>
        </Router>
    </Provider>,
    document.getElementById('root')
)