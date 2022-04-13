import { getCookieByName } from './globals.js';


const typeNameInput = document.getElementById('type-name');
const typeSectionSelect = document.getElementById('type-section');
const submitTypeBtn = document.getElementById('submit-type');
const attributesUl = document.getElementById('attributes-list');

submitTypeBtn.addEventListener('click', sendTypeJsonToServer);
document.addEventListener('DOMContentLoaded', renderTypeSectionsSelect);

function sendTypeJsonToServer(e) {
    let xhr = new XMLHttpRequest();
    let url = `${location.protocol}//${location.host}/api/product-types/`;

    console.log('Sending new product type json to: ', url);

    xhr.open('POST', url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', getCookieByName('csrftoken'));

    xhr.onload = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            alert(xhr.response);
        }
    };

    xhr.send(JSON.stringify(getProductTypeJson()));
}

function getProductTypeJson() {
    let attributesHtmlCollection = attributesUl.getElementsByTagName('li');
    let attributesLiArr = Array.from(attributesHtmlCollection);
    let typeSectionName = typeSectionSelect.options[typeSectionSelect.selectedIndex].value;
    let typeName = typeNameInput.value;
    let productTypeJson = {
        'name': typeName,
        'section': typeSectionName,
        'attributes': [],
    };

    attributesLiArr.forEach(attributeLi => {
        let attributeName = attributeLi.dataset.attributeName;
        let attributeType = attributeLi.dataset.attributeType;
        let singleAttributeJson = {
            'type': attributeType,
            'verbose_name': attributeName,
        }
        productTypeJson.attributes.push(singleAttributeJson);
    });

    console.log('Product type JSON: ', productTypeJson);

    return productTypeJson;
}

function renderTypeSectionsSelect(){
    let xhr = new XMLHttpRequest();
    let url =`${location.protocol}//${location.host}/api/sections/`;

    xhr.open('GET', url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', getCookieByName('csrftoken'));
    
    xhr.onload = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            let responseJson = JSON.parse(xhr.response);
            console.log('Type sections JSON for typeSectionsSelect: ', responseJson);

            responseJson.response.forEach(section => {
                const typeSectionOption = document.createElement('option');
                typeSectionOption.innerText = section.name;
                typeSectionOption.value = section.id;
                typeSectionSelect.appendChild(typeSectionOption);
            });
        }
    };

    xhr.send();
}
