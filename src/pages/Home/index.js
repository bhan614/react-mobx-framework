import React, {Component} from 'react'
import Loading from '../../components/Loading'
import { Icon, Modal, Form, Input, Button, Row, Col, Select, DatePicker, Table, Spin, message } from 'antd';
import { inject, observer } from 'mobx-react'

@inject('Store')
@observer

class Home extends Component {

  constructor(props) {
    super(props);
    this.store = this.props.Store.homeStore;
    this.commonStore = this.props.Store.commonStore;
  }

  componentDidMount() {
    this.commonStore.updateLoading(true).then(() => {
      this.store.getList()
    }).then(() => {
      this.commonStore.updateLoading(false)
    })
  }

  getTable() {
        let columns = [
            {
                title: '名称',
                dataIndex: 'newBasePojo.name',
                key: 'newBasePojo.name',
            }, {
                title: '城市',
                dataIndex: 'cityName',
                key: 'cityName',
            }, {
                title: '提交时间',
                dataIndex: 'firstCommitDate',
                key: 'firstCommitDate',
            }, {
                title: '数据粒度',
                dataIndex: 'number',
                key: 'number',
            }, {
                title: '领取时间',
                dataIndex: 'getDate',
                key: 'getDate',
            }, {
                title: '状态',
                dataIndex: 'stateStr',
                key: 'stateStr',
            }
        ]
        return (
            <div>
              <Table columns={columns} dataSource={this.store.tableData.resultList} rowKey="processId" size="small" pagination={{
                  current: this.store.page.pageNo,
                  pageSize: this.store.tableData.pageSize,
                  total: this.store.tableData.totalCount,
                  onChange: page => {
                      this.store.page.pageNo = page
                      this.store.getList();
                  }
              }} />
            </div>
        )
    }

    render() {
        return (
            <div className='Home_'>
               {this.getTable()}
               <Loading />
            </div>
        )
    }
}

export default Home
