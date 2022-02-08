const typeNameInput = document.getElementById('type-name');
const typeSectionSelect = document.getElementById('type-section');
const submitTypeBtn = document.getElementById('submit-type');

var typeName = typeNameInput.text;
var typeSection = typeSectionSelect.value;

submitTypeBtn.addEventListener('click', sendCategoryJsonToServer);

function sendCategoryJsonToServer(e) {
    e.preventDefault();

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

    let categoryJson = JSON.stringify(createProductTypeJson());
    xhr.send(categoryJson);
};

function createProductTypeJson() {
    let attributesHtmlCollection = attributesUl.getElementsByTagName('li');
    let attributesLiArr = Array.from(attributesHtmlCollection);
    let typeSectionName = typeSectionSelect.options[typeSectionSelect.selectedIndex].value;
    let typeName = typeNameInput.value;
    let productTypeJson = {
        'name': typeName,
        'type': typeSectionName,
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

    return(productTypeJson);
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