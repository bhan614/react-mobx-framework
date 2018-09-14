import React from 'react'
import moment from 'moment'
import { Table, Icon } from 'antd';
import fetch from '../util/fetch';
//import * as api from '../../conf/sourceConfig'
import { message } from 'antd';
import { observable, action, computed, runInAction } from "mobx"
import { Observer } from 'mobx-react';

class HomeStore {

    //Form
    @observable processId = ""             //流程id
    @observable storeName = ""             //名称
    @observable taskType = ""              //任务类型
    @observable taskStatus = ""            //任务状态
    @observable dataSource = ""

    //Table
    @observable columns = []
    @observable tableData = []
    @observable page = {
        pageNo: 1,
        flowType: 33000,
        flowAction: 12,
        takeStatusList: '',
        businessType: 'ADDRESS_APPLY'
    }


    //表单数据format
    @computed get formObj() {
        let obj = {
            flowType: this.page.flowType,
            flowAction: this.page.flowAction,
            pageNo: this.page.pageNo,
            processId: this.processId,
            'queryParam[STORE_NAME]': this.storeName,//名称
            statusList: this.taskStatus,
            dataSize: this.dataSize,
            handleUserIds: this.handleUserIds,
            dataSource: this.dataSource,

        }

        return obj;
    }

   async getList() {
        const value = await fetch('/processFlow/pageQuery?', {
                data: { ...this.formObj, 'queryParam[BUSINESS_TYPE]': this.page.businessType }
            })
        this.tableData = value.data
    }

}

export default HomeStore
