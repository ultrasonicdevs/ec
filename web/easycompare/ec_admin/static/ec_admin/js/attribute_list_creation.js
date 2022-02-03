const addAttributeButton = document.getElementById("add-attribute-btn");
const attributeTypeInput = document.getElementById("attribute_type");
const attributeNameInput = document.getElementById("attribute_name");
const attributesList = document.getElementById("attributes-list");

addAttributeButton.addEventListener("click", addAttribute);
attributesList.addEventListener("click", deleteAttribute);

function addAttribute(e) {
    attributeTypeValue = attributeTypeInput.options[attributeTypeInput.selectedIndex].value;
    attributeTypeText = attributeTypeInput.options[attributeTypeInput.selectedIndex].text;
    attributeName = attributeNameInput.value;
    e.preventDefault();

    if (attributeName == '' || attributeTypeValue == '') {
        alert("Необходимо указать значения!");
        return;
    };

    const attributeDiv= document.createElement("div");
    attributeDiv.classList.add("d-flex");

    const newAttribute = document.createElement("li");
    newAttribute.innerText = attributeName + ": " + attributeTypeText;
    newAttribute.classList.add("list-group-item", "col");
    newAttribute.dataset.attributeName = attributeName;
    newAttribute.dataset.attributeType = attributeTypeValue;

    attributeDiv.appendChild(newAttribute);
    attributeTypeInput.value = "";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-outline-danger", "col-1");
    deleteButton.innerText = "X";

    attributeDiv.appendChild(deleteButton);

    attributesList.appendChild(attributeDiv);
}

function deleteAttribute(e) {
    const item = e.target;

  if (item.classList[0] === "btn") {
    const attribute = item.parentElement;
    attribute.remove();
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
}