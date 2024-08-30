export default class DataHandler {
    data;
    constructor() {
        this.loadData();
    }
    async loadData() {
        this.data = await $.getJSON('https://chuhaiphu.github.io/bc62-js-edressing/data/Data.json');
    }

    getListNavbar(data) {
        return data.navPills;
    }
}
