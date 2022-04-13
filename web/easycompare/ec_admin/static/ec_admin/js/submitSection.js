import { getCookieByName } from './globals.js';


const sectionNameInput = document.getElementById('parent-section-name');
const productTypeSelect = document.getElementById('parent-section');
const submitSectionBtn = document.getElementById('submit-section');

submitSectionBtn.addEventListener('click', sendSectionJsonToServer);
document.addEventListener('DOMContentLoaded', createParentSectionsSelect);

function sendSectionJsonToServer(e) {
    const csrftoken = getCookieByName('csrftoken');

    let xhr = new XMLHttpRequest();
    let url = `${location.protocol}/api/sections/`;

    xhr.open('POST', url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);

    xhr.onreadystatechange = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            responseJson = JSON.parse(xhr.response);
            alert(responseJson.response);
        }
    };

    xhr.send(JSON.stringify(getSectionJson()));
}

function getSectionJson(){
    let sectionName = sectionNameInput.value;
    let parentSectionName = productTypeSelect.value;

    let isFieldsEmpty = (sectionName === '') || (parentSectionName === '');
   
    if (isFieldsEmpty) {
        alert('Заполните поля!');
        return;
    }

    let sectionJson = {
        'name': sectionName,
        'parent_section': parentSectionName,
    };

    return sectionJson;
}

function createParentSectionsSelect(){
    const csrftoken = getCookieByName('csrftoken');

    let xhr = new XMLHttpRequest();
    let url = `${location.protocol}/api/sections/`;

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
                const parentSectionOption = document.createElement('option');
                parentSectionOption.innerText = section.name;
                parentSectionOption.value = section.id;
                productTypeSelect.appendChild(parentSectionOption);
            });
        }
    };

    xhr.send();
}
