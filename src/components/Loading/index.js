import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject,observer } from 'mobx-react'
import { Spin } from 'antd'
import './index.less'

@withRouter
@inject('Store')
@observer
class Loading extends Component {

    constructor(props) {
      super(props);
      this.store = this.props.Store.commonStore;
    }

    shouldComponentUpdate(nextProps){
        if (this.props.location.pathname != nextProps.location.pathname) {
            return true
        }
    }
    render() {
        return (
            <Spin wrapperClassName='Loading_wrap' className='Loading_Container' spinning={this.store.loading}>
                {this.props.children}
            </Spin>
        )
    }
}

export default Loading
