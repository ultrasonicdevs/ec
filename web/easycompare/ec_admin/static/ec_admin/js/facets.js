const productTypeSelect = document.getElementById('product-type');
const productCardsDiv = document.getElementById('found-products');
const filterGroupsUl = document.getElementById('filter-groups');
const submitFiltersBtn = document.getElementById('submit-filters');

productTypeSelect.addEventListener('click', createFilterPanel);
submitFiltersBtn.addEventListener('click', createProductCards);

function createFilterPanel(e){
    const csrftoken = getCookieByName('csrftoken');

    let xhr = new XMLHttpRequest();
    let url = 'get-filters';

    xhr.open('GET', url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    xhr.setRequestHeader('Product-Type-Id', productTypeSelectItem.value)
    
    xhr.onload = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            
            });
        }
    };
    xhr.send();
}

function createProductCards(e){

}