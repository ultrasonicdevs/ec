const sectionNameInput = document.getElementById('parent-section-name');
const productTypeSelect = document.getElementById('parent-section');
const submitSectionBtn = document.getElementById('submit-section');

submitSectionBtn.addEventListener('click', sendSectionJsonToServer);
document.addEventListener('DOMContentLoaded', createParentSectionsSelect);

function sendSectionJsonToServer(e) {
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
    let url = 'get-parent-sections/';

    xhr.open('GET', url, true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    
    xhr.onload = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            responseJson = JSON.parse(xhr.response);
            responseJson.sections.forEach(section => {
                const parentSectionOption = document.createElement('option');
                parentSectionOption.innerText = section.name;
                parentSectionOption.value = section._id;
                productTypeSelect.appendChild(parentSectionOption);
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