 import CommonStore from './common'
 import HomeStore from './home'


class Store {
    constructor() {
        this.commonStore = new CommonStore()
        this.homeStore = new HomeStore()
    }

}
export default new Store()
