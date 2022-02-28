const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', searchPanelDisplay);

async function searchPanelDisplay() {
    let searchForm = `
    <form action="" method="get" class="form">
        <div class="sections">
            <h2 class="search-block-header">Раздел</h2>
            <select name="select-section" id="select-section">
                <option value="" selected hidden>Выберите раздел</option>`;

    let sectionList = await getJSON('http://127.0.0.1:8000/ec-admin/add-section/get-parent-sections/',"GET", null);
    // console.log(sectionList, sectionList.sections, sectionList.name);

    for (let section in sectionList.sections) {
        searchForm += `<option value="" id="${sectionList.sections[section]._id}">${sectionList.sections[section].name}</option>;`
    }

    searchForm += `
            </select>
        </div>
        <div class="categories">
            <h2 class="search-block-header">Категория</h2>
            <select name="select-category" id="select-category" disabled="disabled">
                <option value="" selected hidden>Выберите категорию</option>`;

    searchForm += `
                </select>
            </div>
            <button class="submit" type="submit">Применить</button>
        </form>`;

    const searchPanel = document.querySelector('.search-panel'),
        content = document.querySelector('.content'),
        searchBtnImg = document.querySelector('#search-img'),
        delForm = document.querySelector('.form');

    if (searchPanel.style.display === 'none') {

        searchPanel.innerHTML = searchForm;
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
        delForm.remove()
    }

    const selectSection = document.querySelector('#select-section'),
        selectProductType = document.querySelector('#select-category');

    selectSection.addEventListener('change', selectProductTypeDisplay);


    async function selectProductTypeDisplay() {
        const index = selectSection.options.selectedIndex,
            value = selectSection.options[index].text,
            id = selectSection.options[index].id;
        console.log(value);
        selectProductType.disabled = false;

        const selected = JSON.stringify({"selected section": value});
        const productTypes = await getJSON(`http://127.0.0.1:8000/api/sections/${id}/product-types/`, "GET", null);
        selectProductType.remove(selectProductType.children);
        selectProductType.innerHTML = '<option value="" selected hidden>Выберите категорию</option>';
        for (let productType in productTypes.product_types) {
            let productTypeOption = `<option value="" id="${productTypes.product_types[productType]._id}">${productTypes.product_types[productType].name}</option>;`;
            selectProductType.innerHTML += productTypeOption;
        }
    }
}

async function getJSON(url, method, body) {
    let response = await fetch(url, {method, body});
    response = await response.json();
    console.log(response)

    return response
}