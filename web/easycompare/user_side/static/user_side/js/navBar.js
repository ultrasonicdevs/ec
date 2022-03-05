const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', searchPanelDisplay);

async function searchPanelDisplay() {
    const searchPanel = document.querySelector('.search-panel'),
        content = document.querySelector('.content'),
        searchBtnImg = document.querySelector('#search-img'),

        form = document.createElement('form'),
        sectionsDiv = document.createElement('div'),
        productTypesDiv = document.createElement('div'),
        selectTitleS = document.createElement('h2'),
        selectTitleP = document.createElement('h2'),
        selectSection = document.createElement('select'),
        selectProductType = document.createElement('select'),
        optionS = document.createElement('option'),
        optionP = document.createElement('option'),
        submit = document.createElement('button');

    form.className ='form';
    sectionsDiv.className = 'sections';
    productTypesDiv.className = 'categories';
    selectTitleS.className = 'search-block-header';
    selectTitleS.appendChild(document.createTextNode('Выберите раздел'));
    selectTitleP.className = 'search-block-header';
    selectTitleP.appendChild(document.createTextNode('Выберите категорию'));
    selectSection.id = 'select-section';
    selectProductType.id = 'select-category';
    selectProductType.disabled = true;
    submit.className = 'submit';
    optionS.appendChild(document.createTextNode('Выберите раздел'));
    optionS.hidden = true;
    optionS.selected = true;
    optionP.appendChild(document.createTextNode('Выберите категорию'));
    optionP.hidden = true;
    optionP.selected = true;
    submit.appendChild(document.createTextNode('Подтвердить'));

    form.appendChild(sectionsDiv);
    form.appendChild(productTypesDiv);
    sectionsDiv.appendChild(selectTitleS);
    sectionsDiv.appendChild(selectSection);
    selectSection.appendChild(optionS);
    productTypesDiv.appendChild(selectTitleP);
    productTypesDiv.appendChild(selectProductType);
    selectProductType.appendChild(optionP);
    form.appendChild(submit);

    if (searchPanel.style.display === 'none') {
        searchPanel.appendChild(form);
        searchPanel.style.opacity = '0';
        setTimeout(() => {
            content.style.filter = 'blur(1rem)';
            searchPanel.style.display = 'flex';
            searchPanel.style.opacity = '1';
            searchBtnImg.src = 'static/user_side/img/cancel_menuBtn.svg';
        });
    }
    else {
        searchPanel.style.opacity = '0';
        setTimeout(() => {
            searchPanel.style.display = 'none';
            content.style.filter = 'none';
            searchBtnImg.src = 'static/user_side/img/search_menuBtn.svg';
        });
        const delForm = document.querySelector('form');
        delForm.remove()
    }

    const sectionListJSON = await getJSON('http://127.0.0.1:8000/ec-admin/add-section/get-parent-sections/', "GET", null),
        sectionList = sectionListJSON.sections;
    for (let section of sectionList) {
        const option = document.createElement('option');
        option.id = section._id;
        option.appendChild(document.createTextNode(section.name))
        selectSection.appendChild(option);
    }

    selectSection.addEventListener('change', selectProductTypeDisplay);

    async function selectProductTypeDisplay() {
        const index = selectSection.options.selectedIndex,
            id = selectSection.options[index].id,
            productTypesJSON = await getJSON(`http://127.0.0.1:8000/api/sections/${id}/product-types/`, "GET", null),
            productTypes = productTypesJSON.product_types;

        selectProductType.disabled = false;
        selectProductType.innerHTML = '';

        selectProductType.appendChild(optionP);
        optionP.hidden = true;
        optionP.selected = true;
        for (let productType of productTypes) {
            const option = document.createElement('option');
            option.id = productType._id;
            option.appendChild(document.createTextNode(productType.name))
            selectProductType.appendChild(option);
        }
    }
}

async function getJSON(url, method, body) {
    let response = await fetch(url, {method, body});
    response = await response.json();
    console.log(response);

    return response
}