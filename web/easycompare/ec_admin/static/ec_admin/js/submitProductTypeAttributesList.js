const addAttributeButton = document.getElementById('add-attribute-btn');
const attributeTypeSelect = document.getElementById('new-attribute-type');
const attributeNameInput = document.getElementById('new-attribute-name');
const attributesUl = document.getElementById('attributes-list');

addAttributeButton.addEventListener('click', addAttributeToUl);
attributesUl.addEventListener('click', deleteAttributeFromUl);

function addAttributeToUl(e) {
    let attributeTypeValue = attributeTypeSelect.options[attributeTypeSelect.selectedIndex].value;
    let attributeTypeText = attributeTypeSelect.options[attributeTypeSelect.selectedIndex].text;
    let attributeName = attributeNameInput.value;

    let isFieldsEmpty = (attributeName === '') || (attributeTypeValue === '');

    if (isFieldsEmpty) {
        alert('Заполните поля!');
        return;
    }

    e.preventDefault();

    const attributeDiv = document.createElement('div');
    attributeDiv.classList.add('d-flex');

    const attributeLi = document.createElement('li');
    attributeLi.innerText = attributeName + ': ' + attributeTypeText;
    attributeLi.classList.add('list-group-item', 'col');
    attributeLi.dataset.attributeName = attributeName;
    attributeLi.dataset.attributeType = attributeTypeValue;

    attributeDiv.appendChild(attributeLi);
    attributeTypeSelect.value = '';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-outline-danger', 'col-1');
    deleteBtn.innerText = 'X';

    attributeDiv.appendChild(deleteBtn);

    attributesUl.appendChild(attributeDiv);
}

function deleteAttributeFromUl(e) {
    const attributesUlItem = e.target;
    let ulItemIsDeleteButton = attributesUlItem.classList[0] === 'btn';

    if (ulItemIsDeleteButton) {
        const attributeLi = attributesUlItem.parentElement;
        attributeLi.remove();
    }
}