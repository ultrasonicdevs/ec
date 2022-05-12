const productTypeSelect = document.getElementById('product-type');
const productCardsDiv = document.getElementById('found-products');
const filterGroupsUl = document.getElementById('filter-groups');
const submitFiltersBtn = document.getElementById('submit-filters');

document.addEventListener('DOMContentLoaded', renderAllProductCards);
productTypeSelect.addEventListener('change', renderFilterPanel);
submitFiltersBtn.addEventListener('click', renderFilteredProductCards);

function renderFilteredProductCards(e){
    let xhr = new XMLHttpRequest();
    let url = `${location.protocol}/api/product-types/${productTypeSelect.value}/get-filtered/`;

    console.log('Getting filtered products from: ', url);

    xhr.open('GET', url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Selected-Filters', encodeURIComponent(JSON.stringify(getSelectedFilters())));
    
    xhr.onload = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            productCardsDiv.innerHTML = '';
            let responseJson = JSON.parse(xhr.response);
            console.log('Filtered products json: ', responseJson);
            responseJson.response.forEach(product => {
                renderProductCard(product);
            })
        }
    };
    xhr.send();
}

function getSelectedFilters(){
    let selectedCheckboxes = Array.from(document.querySelectorAll('input[type=checkbox]:checked'));
    let filterGroupNames = [...new Set(selectedCheckboxes.map(checkbox => checkbox.dataset.groupName))];
    let selectedFilters = [];

    filterGroupNames.forEach((filterGroupName, fgnIndex) => {
        selectedFilters.push({
            'filter_group_name': filterGroupName,
            'attributes': [],
        })
        
        selectedCheckboxes.forEach(checkbox => {
            if (filterGroupName == checkbox.dataset.groupName) {
                selectedFilters[fgnIndex].attributes.push(checkbox.value);
            }
        })
    })
    console.log('Selected filters json: ', selectedFilters);
    return selectedFilters
}

function renderFilterPanel(e){
    let xhr = new XMLHttpRequest();
    let url = `${location.protocol}/api/product-types/${productTypeSelect.value}/filters/`;

    xhr.open('GET', url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            filterGroupsUl.innerHTML = '';
            let responseJson = JSON.parse(xhr.response);
            console.log('Filters for filter panel: ', responseJson);
            responseJson.response.product_type_filters.forEach(filterGroup => {
                const filterGroupFieldset = document.createElement('fieldset');
                const filterGroupFiltersDiv = document.createElement('div');
                const filterGroupName = document.createElement('legend');
                filterGroupName.innerHTML = filterGroup.filter_group_name;
                filterGroupsUl.appendChild(filterGroupFieldset);
                filterGroupFieldset.appendChild(filterGroupName);
                filterGroupFieldset.appendChild(filterGroupFiltersDiv);
                filterGroup.attributes.forEach(attribute => {
                    const filterLabel = document.createElement('label');
                    const filter = document.createElement('input');
                    filter.type = 'checkbox';
                    filter.name = filterGroupName.innerHTML;
                    filter.value = attribute;
                    filter.dataset.groupName = filterGroupName.innerHTML;
                    filterLabel.innerHTML = attribute;
                    filterGroupFiltersDiv.appendChild(filterLabel);
                    filterLabel.appendChild(filter);
                })
            })
        }
    };
    xhr.send();
}

function renderAllProductCards(e){
    let xhr = new XMLHttpRequest();
    let url = `${location.protocol}/api/products/`;

    xhr.open('GET', url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            let responseJson = JSON.parse(xhr.response);
            console.log('All products JSON: ', responseJson);
            responseJson.response.forEach(product => {
                renderProductCard(product);
            })
        }
    };
    xhr.send();
}

function renderProductCard(productJson) {
    const productCard = document.createElement('div');
    const productPreview = document.createElement('img');
    const productName = document.createElement('a');

    productPreview.src = productJson.preview_url;
    productPreview.width = 250;
    productPreview.height = 250;
    productName.innerHTML = productJson.name;
    let href = `${location.protocol}//${location.host}/${productTypeSelect.value}/${productJson.id}/`
    productName.href = href;

    productCard.appendChild(productPreview);
    productCard.appendChild(productName);

    productCardsDiv.appendChild(productCard);
}