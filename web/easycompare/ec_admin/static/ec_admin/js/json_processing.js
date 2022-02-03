const categoryNameInput = document.getElementById("category_name");
const parentSectionInput = document.getElementById("section");
const submitTypeBtn = document.getElementById("submit-type");

submitTypeBtn.addEventListener("click", sendAttributesJsonToServer);

function sendAttributesJsonToServer(e) {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');
    console.log(csrftoken);
    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "add-product-type-processing/";

    // open a connection
    xhr.open("POST", url, true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", csrftoken);

    // Create a state change callback
    xhr.onreadystatechange = function () {
        const DONE = 4;
        const SUCCESS = 200;
        if (xhr.readyState === DONE && xhr.status === SUCCESS) {
            alert("Добавлено в БД.");
        }
    };

    // Converting JSON data to string
    var data = JSON.stringify(createCategoryJson());
    console.log(data);
    // Sending data with the request
    xhr.send(data);
};

function createCategoryJson() {
    let attributesHtmlCollection = attributesList.getElementsByTagName("li");
    let attributesArr = Array.from(attributesHtmlCollection);
    let parentSectionName = parentSectionInput.options[parentSectionInput.selectedIndex].value;
    let categoryNameStr = categoryNameInput.value;
    let attributesJson = {
        "name": categoryNameStr,
        "category": parentSectionName,
        "fields": [],
    };
    console.log(attributesArr);
    attributesArr.forEach(element => {
        let attributeName = element.dataset.attributeName;
        let attributeType = element.dataset.attributeType;
        let singleAttributeJson = {
            "type": attributeType,
            "verbose_name": attributeName,
        }
        attributesJson.fields.push(singleAttributeJson);
    });
    console.log(attributesJson);
    return(attributesJson);
};

function getCookie(name) {
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