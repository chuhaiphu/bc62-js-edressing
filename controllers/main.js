
import DataHandler from "../utils/DataHandler.js";
let dataHandler = new DataHandler();

$(document).ready(async function () {

    await dataHandler.loadData();
    let listNavPills = dataHandler.getListNavbar(dataHandler.data);

    let navPills = $('.nav.nav-pills');  // select the ul element
    listNavPills.forEach(function (navPill) {
        navPills.append(`
        <li class="nav-item">
            <a class="nav-link btn-default" data-toggle="pill" href="#${navPill.tabName}">
                ${navPill.showName}
            </a>
        </li>
    `);
    });

    let tabContents = $('.tab-content');
    listNavPills.forEach(function (navPill) {
        tabContents.append(`
        <div id="${navPill.tabName}" class="tab-pane container fade">
        <div class="row"></div>
        </div>
        `)

        let currentTabPaneRow = $(`#${navPill.tabName} .row`); // Get the .row in current tab pane
        let listCurrentTabPaneItems = dataHandler.data.tabPanes.filter(paneItem => paneItem.type === navPill.type); // Get array of objects from tabPanes matching the current type

        listCurrentTabPaneItems.forEach(paneItem => {
            currentTabPaneRow.append(`
            <!-- Generate your HTML structure here using paneItem fields -->
            <div class='col-md-3'>
                <div class="card text-center">
                  <img src="${paneItem.imgSrc_jpg}">
                  <h4><b>${paneItem.name}</b></h4>
                  <button data-id="${paneItem.id}" data-type="${paneItem.type}"
                          data-name="${paneItem.name}" class="changStyle">Thử đồ
                  </button>
                </div>
            </div>
        `);
        });
    })
})

$(document).on('click', '.changStyle', function(e) {
    e.preventDefault();  // Prevents the default action of the button

    // Extract data-* attributes from the clicked button
    let id = $(this).data('id');
    let type = $(this).data('type');
    let name = $(this).data('name');

    // Find corresponding item in the dataHandler.data.tabPanes based on the id
    let matchedItem = dataHandler.data.tabPanes.find(item => item.id === id);
    if (matchedItem) {
        switch(type) {
            case 'topclothes':
                updateAoQuan('ao', matchedItem);
                break;
            case 'botclothes':
                updateAoQuan('quan', matchedItem);
                break;
            case 'shoes':
                updateGiayDepKieuTocTuiXachDayChuyen('giaydep', matchedItem);
                break;
            case 'handbags':
                updateGiayDepKieuTocTuiXachDayChuyen('tuixach', matchedItem);
                break;
            case 'necklaces':
                updateGiayDepKieuTocTuiXachDayChuyen('daychuyen', matchedItem);
                break;
            case 'hairstyle':
                updateGiayDepKieuTocTuiXachDayChuyen('kieutoc', matchedItem);
                break;
            case 'background':
                updateGiayDepKieuTocTuiXachDayChuyen('background', matchedItem);
                break;
            default:
                break;
        }
    }
});

function updateAoQuan(elementId, matchedItem) {
    $('#' + elementId).css({
        'height': '500px',
        'width' : '500px',
        'background': 'url(' + matchedItem.imgSrc_png + ') no-repeat',
        'position': 'absolute',
        'top': '-9%',
        'left': '-5%',
        'zIndex': '3',
        'transform': 'scale(0.5)'
    });
}


function updateGiayDepKieuTocTuiXachDayChuyen(elementId, matchedItem) {
    $('#' + elementId).css({
        'background': 'url(' + matchedItem.imgSrc_png + ') no-repeat',
    });
}