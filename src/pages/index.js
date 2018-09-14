import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import stores from '../stores/index'
import Loadable from 'react-loadable'
import DelayLoading from '../components/DelayLoading'

const Home = Loadable({loader: () => import('./Home'), loading : DelayLoading,delay: 3000})

@withRouter
class Routers extends Component {
    constructor(props){
        super(props)
        this.pathname = this.props.location.pathname
    }

    render(){
        return (
            <Provider Store={stores}>
              <Switch>
                <Route path='/home' component={Home}/>
              </Switch>
            </Provider>
        )
    }
}

export default Routers
