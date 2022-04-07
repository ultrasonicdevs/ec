const productTypeSelect = document.getElementById('product-type');
const productCardsDiv = document.getElementById('found-products');
const filterGroupsUl = document.getElementById('filter-groups');
const submitFiltersBtn = document.getElementById('submit-filters');

document.addEventListener('DOMContentLoaded', createProductCards);
productTypeSelect.addEventListener('change', createFilterPanel);
submitFiltersBtn.addEventListener('click', showFaceted);

function showFaceted(e){
    const csrftoken = getCookieByName('csrftoken');

    let xhr = new XMLHttpRequest();
    let url = `${location.protocol}/api/product-types/${productTypeSelect.value}/get-filtered/`;

    xhr.open('GET', url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    xhr.setRequestHeader('Product-Type', productTypeSelect.value)
    xhr.setRequestHeader('Selected-Filters', encodeURIComponent(JSON.stringify(getSelectedFilters())))
    
    xhr.onload = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            productCardsDiv.innerHTML = '';
            console.log(JSON.parse(xhr.response));
            console.log('byla otvetka')
            JSON.parse(xhr.response).response.forEach(product => {
                const productCard = document.createElement('div');
                const productPreview = document.createElement('img');
                const productName = document.createElement('h1');
    
                productPreview.src = product.preview_url;
                productPreview.width = 250;
                productPreview.height = 250;
                productName.innerHTML = product.name;

                productCard.appendChild(productPreview);
                productCard.appendChild(productName);

                productCardsDiv.appendChild(productCard);
            })
        }
    };
    xhr.send();
}

function getSelectedFilters(){
    var checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]:checked'));
    let filterGroupNames = [...new Set(checkboxes.map(checkbox => checkbox.dataset.groupName))];
    console.log(filterGroupNames);
    let selectedFilters = []
    filterGroupNames.forEach((filterGroupName, fgnIndex) => {
        selectedFilters.push({
            'filter_group_name': filterGroupName,
            'attributes': [],
        })
        
        checkboxes.forEach(checkbox => {
            if (filterGroupName == checkbox.dataset.groupName) {
                selectedFilters[fgnIndex].attributes.push(checkbox.value);
            }
        })
    })
    console.log(selectedFilters);
    return selectedFilters
}

function createFilterPanel(e){
    const csrftoken = getCookieByName('csrftoken');

    let xhr = new XMLHttpRequest();
    let url = `${location.protocol}/api/product-types/${productTypeSelect.value}/filters/`;

    xhr.open('GET', url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    
    xhr.onload = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            filterGroupsUl.innerHTML = '';
            responseJson = JSON.parse(xhr.response);
            responseJson.response.forEach(filterGroup => {
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

function createProductCards(e){
    const csrftoken = getCookieByName('csrftoken');

    let xhr = new XMLHttpRequest();
    let url = `${location.protocol}/api/products/`;


    xhr.open('GET', url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    
    xhr.onload = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            console.log(JSON.parse(xhr.response));
            JSON.parse(xhr.response).response.forEach(product => {
                const productCard = document.createElement('div');
                const productPreview = document.createElement('img');
                const productName = document.createElement('h1');
    
                productPreview.src = product.preview_url;
                productPreview.width = 250;
                productPreview.height = 250;
                productName.innerHTML = product.name;

                productCard.appendChild(productPreview);
                productCard.appendChild(productName);

                productCardsDiv.appendChild(productCard);
                }

            )
        }
    };
    xhr.send();
}

function getCookieByName(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}