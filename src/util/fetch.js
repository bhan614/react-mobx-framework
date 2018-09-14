import {Modal} from 'antd';

export default new class {

    static isMock
    static method
    static type
    static url
    static credentials
    static headers = {}
    static body

    constructor() {
        return this.do.bind(this)
    }

    do(url, {method = "get", data = {}, dataType = "json"}={}, isMock = false) {
        // 整理参数
        this.isMock = isMock
        this.method = (method).toLocaleLowerCase()
        this.dataType = dataType
        this.url = url
        this.data = data
        this.headers = {}
        this.credentials = 'include'
        if (method == "get") {
            this.url = this.processGetUrl(this.url, this.data, this.isMock)
        } else if (method == "post") {
            this.body = this.processPostData(this.data, this.dataType, this.headers)
        }
        return this.request()
    }

    // 处理get请求的url
    processGetUrl(url, data, mock) {
        url = mock == false ? url : "/mock" + url
        url += url.indexOf("?") > 0 ? "&" : "?"
        for (let key in data) {
            let value = encodeURIComponent((data[key] || '').toString())
            url += `${key}=${value}&`
        }
        url = url.substr(0, url.length - 1)
        return url
    }

    // 处理post请求的body
    processPostData(data, dataType, headers) {
        let body
        if (dataType == "form" || dataType == "file") {
            let formData = new window.FormData()
            for (let key in data) {
                const value = data[key]
                if (value) {
                    formData.append(key, (typeof value === 'object' && dataType != "file") ? JSON.stringify(value) : value)
                }
            }
            body = formData
        } else {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }
        return body
    }

    // 处理状态码
    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            console.error(response.statusText)
            let error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    // 发送请求
    request() {
        let options = Object.assign(this.method == "post" ? {body: this.body} : {}, {
            method: this.method,
            headers: this.headers,
            credentials: this.credentials
        })
        return fetch(this.url, options)
            .then(this.checkStatus)
            .then(reps => reps.json())
            .then(resp => {
                if (resp.errno == 0) {
                    return resp;
                } else {
                    Modal.error({
                        title: '操作失败',
                        content: resp.errmsg
                    });
                    let error = new Error(resp.message)
                    error.type = "errorCode"
                    throw error
                }
            })
    }
}()
