import React from 'react'
import { render } from 'react-dom'
import { HashRouter, BrowserRouter } from 'react-router-dom'
import 'normalize'
import Routers from './pages'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routers />
            </BrowserRouter>
        )
    }
}

render(<App/>, document.getElementById('root'))

if (module.hot) {
    module.hot.accept()
}
