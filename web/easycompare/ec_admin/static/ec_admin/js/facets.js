const productTypeSelect = document.getElementById('product-type');
const productCardsDiv = document.getElementById('found-products');
const filterGroupsUl = document.getElementById('filter-groups');
const submitFiltersBtn = document.getElementById('submit-filters');

document.addEventListener('DOMContentLoaded', createProductCards);
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