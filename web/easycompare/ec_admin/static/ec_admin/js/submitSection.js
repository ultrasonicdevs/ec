import { getCookieByName } from './globals.js';


const sectionNameInput = document.getElementById('parent-section-name');
const parentSectionSelect = document.getElementById('parent-section');
const submitSectionBtn = document.getElementById('submit-section');

submitSectionBtn.addEventListener('click', sendSectionJsonToServer);
document.addEventListener('DOMContentLoaded', renderParentSectionsSelect);

function sendSectionJsonToServer() {
    let xhr = new XMLHttpRequest();
    let url = `${location.protocol}//${location.host}/api/sections/`;

    console.log('Sending new section to: ', url);

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

    xhr.send(JSON.stringify(getSectionJson()));
}

function getSectionJson(){
    let sectionName = sectionNameInput.value;
    let parentSection = parentSectionSelect.value;

    let isFieldsEmpty = (sectionName === '');
   
    if (isFieldsEmpty) {
        alert('Заполните поля!');
        return;
    }

    let sectionJson = {
        'name': sectionName,
        'parent_section': parentSection,
    };

    return sectionJson;
}

function renderParentSectionsSelect(){
    let xhr = new XMLHttpRequest();
    let url = `${location.protocol}/api/sections/`;

    xhr.open('GET', url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            let responseJson = JSON.parse(xhr.responseText);
            responseJson.response.forEach(section => {
                const parentSectionOption = document.createElement('option');
                parentSectionOption.innerText = section.name;
                parentSectionOption.value = section.id;
                parentSectionSelect.appendChild(parentSectionOption);
            });
        }
    };

    xhr.send();
}
