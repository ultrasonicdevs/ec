import { getCookieByName } from './globals.js';


const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productManufacturerInput = document.getElementById('product-manufacturer');
const productTypeSelect = document.getElementById('product-type');
const productAttributesUl = document.getElementById('product-attributes');
const submitProductButton = document.getElementById('submit-product');

productTypeSelect.addEventListener('change', renderProductAttributesUl);
submitProductButton.addEventListener('click', sendProductJsonToServer);

function renderProductAttributesUl(e) {
    const productTypeSelectItem = e.target;
    const productTypeId = productTypeSelectItem.value;

    let xhr = new XMLHttpRequest();
    let url = `${location.protocol}//${location.host}/api/product-types/${productTypeId}/`;

    xhr.open('GET', url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            document.getElementById('product-attributes').innerHTML = '';
            let responseJson = JSON.parse(xhr.response);
            console.log('Attributes for attributesUl: ', responseJson.response);
            responseJson.response.attributes.forEach(attribute => {
                const attributeDiv = document.createElement('div');
                attributeDiv.classList = ['form-group', 'row'];

                const attributeInputLabel = document.createElement('label');
                attributeInputLabel.classList = ['col-sm-2', 'col-form-label'];
                attributeInputLabel.innerText = attribute.verbose_name;
                
                attributeDiv.appendChild(attributeInputLabel);

                const attributeInputContainerDiv = document.createElement('div');
                attributeInputContainerDiv.classList = ['col-sm-10', 'mb-2'];

                const attributeInput = document.createElement('input');
                attributeInput.placeholder = attribute.type;
                attributeInput.type = 'text';
                attributeInput.classList = ['form-control']
                attributeInput.dataset.attributeVerboseName = attribute.verbose_name;

                attributeInputContainerDiv.appendChild(attributeInput);

                attributeDiv.appendChild(attributeInputContainerDiv);

                productAttributesUl.appendChild(attributeDiv);
            });
        }
    };
    xhr.send();
}

function sendProductJsonToServer(e) {
    e.preventDefault()

    let xhr = new XMLHttpRequest();
    let url = `${location.protocol}//${location.host}/api/products/`;

    console.log('Sending new product to: ', url);

    xhr.open('POST', url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', getCookieByName('csrftoken'));

    xhr.onreadystatechange = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            alert(xhr.response);
        }
    };

    xhr.send(JSON.stringify(getProductJson()));
}

function getProductJson() {
    const attributeInputsHtmlCollection = productAttributesUl.getElementsByTagName('input');
    const previewImageUrl = document.getElementsByTagName('img')[0].getAttribute('src');
    let attributeInputsArray = Array.from(attributeInputsHtmlCollection);
    let productType = productTypeSelect.value;
    let productName = productNameInput.value;
    let productManufacturer = productManufacturerInput.value;
    let productPrice = productPriceInput.value;
    let productJson = {
        'name': productName,
        'type': productType,
        'preview_url': previewImageUrl,
        'attributes': [
            {
                'type': 'Текст',
                'verbose_name': 'Цена',
                'value': productPrice,
            },
            {
                'type': 'Текст',
                'verbose_name': 'Производитель',
                'value': productManufacturer,
            },
        ],
    }

    attributeInputsArray.forEach(attributeInput => {
        let attributeType = attributeInput.placeholder;
        let attributeVerboseName = attributeInput.dataset.attributeVerboseName;
        let attributeValue = attributeInput.value;
        let singleAttributeJson = {
            'type': attributeType,
            'verbose_name': attributeVerboseName,
            'value': attributeValue,
        }

        productJson.attributes.push(singleAttributeJson);
    })
    
    console.log('Product Json: ', productJson);

    return productJson;
}