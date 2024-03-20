export default class DataHandler {
    data;
    constructor() {
        this.loadData();
    }
    async loadData() {
        this.data = await $.getJSON('../data/Data.json');
    }

    getListNavbar(data) {
        return data.navPills;
    }
}
