const searchBtn = document.querySelector('.search-btn');




searchBtn.addEventListener('click', searchPanelDisplay);


async function searchPanelDisplay() {

    let searchForm = `
    <form action="" method="get" class="form">
        <div class="sections">
            <h2 class="search-block-header">Раздел</h2>
            <select name="select-section" id="select-section">
                <option value="" selected hidden>Выберите раздел</option>`;

    let sectionList = await getJSON('http://127.0.0.1:8000/ec-admin/add-section/get-parent-sections/');
    // console.log(sectionList, sectionList.sections, sectionList.name);

    for (let section in sectionList.sections) {
        searchForm += `<option value="">${sectionList.sections[section].name}</option>;`
    }

    searchForm += `
            </select>
        </div>
        <div class="categories">
            <h2 class="search-block-header">Категория</h2>
            <select name="select-category" id="select-category">
                <option value="" selected hidden>Выберите категорию</option>`;

    // TODO load all categories

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
}

async function getJSON(url) {
    let response = await fetch(url);
    response = await response.json();
    console.log(response)

    return response
}