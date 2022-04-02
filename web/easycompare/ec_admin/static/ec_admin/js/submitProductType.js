const typeNameInput = document.getElementById('type-name');
const typeSectionSelect = document.getElementById('type-section');
const submitTypeBtn = document.getElementById('submit-type');

var typeName = typeNameInput.text;
var typeSection = typeSectionSelect.value;

submitTypeBtn.addEventListener('click', sendCategoryJsonToServer);
document.addEventListener('DOMContentLoaded', createTypeSectionsSelect);

function sendCategoryJsonToServer(e) {
    const csrftoken = getCookieByName('csrftoken');

    let xhr = new XMLHttpRequest();
    let url = 'processing/';

    xhr.open('POST', url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);

    xhr.onreadystatechange = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            responseJson = JSON.parse(xhr.response);
            alert(responseJson.message);
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

    return productTypeJson;
}

function createTypeSectionsSelect(){
    const csrftoken = getCookieByName('csrftoken');

    let xhr = new XMLHttpRequest();
    let url =`${location.protocol}/api/sections/`;

    xhr.open('GET', url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    
    xhr.onload = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            responseJson = JSON.parse(xhr.response);
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

function getCookieByName(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}