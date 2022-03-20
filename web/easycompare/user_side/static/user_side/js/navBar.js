const searchBtn = document.querySelector('#form-btn'),
    searchPanel = document.querySelector('.search-panel'),
    sectionsListHTML = document.getElementById('section-list'),
    ulProductTypes = document.getElementById('product-type-list');
searchBtn.addEventListener('click', searchPanelDisplay);


async function searchPanelDisplay() {
    if (document.getElementById('form-btn').checked === false) {
        const sectionList = await getJSON('http://127.0.0.1:8000/ec-admin/add-section/get-parent-sections/', "GET", null);
        for (let section of sectionList.sections) {
            let liSection = document.createElement('li');
            liSection.className = 'section';
            liSection.id = section._id;
            liSection.appendChild(document.createTextNode(section.name));
            sectionsListHTML.appendChild(liSection);
        }
        setTimeout(()=> {
            searchPanel.style.display = 'block';
            searchPanel.style.opacity = '1';
        });

        [...document.getElementsByClassName('section')].forEach(section => {
            section.addEventListener('click', displayProductTypes);
        });
            sectionsListHTML.style.flexWrap = 'wrap';
            sectionsListHTML.style.height = '24rem';
            sectionsListHTML.style.flexBasis = '70%';

    }
    else {
        searchPanel.style.opacity = '0';
        setTimeout(() => {
            searchPanel.style.display = 'none';
        });
        sectionsListHTML.innerHTML = '';
        ulProductTypes.innerHTML = '';
    }
}


async function displayProductTypes(event) {
    ulProductTypes.innerHTML = '';
    ulProductTypes.style.display = 'none';
    ulProductTypes.style.opacity = '0';
    let liID = event.target.id;

    sectionsListHTML.style.flexWrap = 'nowrap';
    sectionsListHTML.style.height = '100%';
    sectionsListHTML.style.flexBasis = '30%';

    [...document.getElementsByClassName('section')].forEach(section => {
        if (section.className === 'section act') {
            section.className = 'section grey';
        }
        else if (section.className === 'section') {
            section.className += ' grey';
        }
    });

    const sectionAct = document.getElementById(liID);
    sectionAct.className = 'section act';

    const productTypesList = await getJSON(`http://127.0.0.1:8000/api/sections/${liID}/product-types/`, "GET", null);

    for (let productType of productTypesList.product_types) {
        let liProductType = document.createElement('li');
        liProductType.id = productType._id;
        let link = document.createElement('a');
        link.appendChild(document.createTextNode(productType.name));
        liProductType.appendChild(link);
        ulProductTypes.appendChild(liProductType);
    }
    ulProductTypes.style.display = 'block';
    setTimeout(()=>{

        ulProductTypes.style.opacity = '1';
    }, 100);

}


async function getJSON(url, method, body) {
    return await fetch(url, {method, body,
        headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },}).then(res => res.json())
}