const productNameInput = document.getElementById('product-name');
const productTypeSelect = document.getElementById('product-type');
const productAttributesUl = document.getElementById('product-attributes');
const submitProductButton = document.getElementById('submit-product');

productTypeSelect.addEventListener('click', renderProductAttributesUl);
submitProductButton.addEventListener('click', submitProduct);

function renderProductAttributesUl(e) {
    console.log('it is execited')
    const productTypeSelectItem = e.target;
    let selectItemIsOption = productTypeSelectItem.tagName === 'OPTION';
    if (selectItemIsOption) {
        console.log('is options')
        const csrftoken = getCookieByName('csrftoken');

        let xhr = new XMLHttpRequest();
        let url = 'get-type-attributes/';

        xhr.open('GET', url, true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
        xhr.setRequestHeader('Product-Type-Id', productTypeSelectItem.value)
        
        xhr.onload = function () {
            const DONE = 4;
            const SUCCESS = 200;
            let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
            if (requestCompleted) {
                document.getElementById('product-attributes').innerHTML = '';
                responseJson = JSON.parse(xhr.response);
                responseJson.attributes.forEach(attribute => {
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
}

function submitProduct(e) {
    e.preventDefault()
    const attributeInputsHtmlCollection = productAttributesUl.getElementsByTagName('input');
    let attributeInputsArray = Array.from(attributeInputsHtmlCollection);
    let productType = productTypeSelect.value;
    let productName = productNameInput.value;
    let productJson = {
        'name': productName,
        'type': productType,
        'attributes': []
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
    console.log(productJson);
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