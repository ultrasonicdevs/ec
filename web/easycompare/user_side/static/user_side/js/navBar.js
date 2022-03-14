const searchBtn = document.querySelector('#display-form'),
    searchPanel = document.querySelector('.search-panel'),
    sectionsListHTML = document.getElementById('section-list'),
    productTypeListHTML = document.getElementById('product-type-list');
searchBtn.addEventListener('click', searchPanelDisplay);


async function searchPanelDisplay() {

    const checkForm = document.getElementById('form-btn');
    if (document.getElementById('form-btn').checked === false) {
        const sectionList = await getJSON('http://127.0.0.1:8000/ec-admin/add-section/get-parent-sections/', "GET", null);

        for (let section of sectionList.sections) {
            let sectionHTML = document.createElement('li');
            let label = document.createElement('label'),
                input = document.createElement('input'),
                span = document.createElement('span');
            input.type = 'radio';
            input.id = section._id + '-input';
            input.className =
            label.htmlFor = input.id;
            sectionHTML.className = 'section';
            sectionHTML.id = section._id;
            sectionHTML.appendChild(input);
            sectionHTML.appendChild(label);
            label.appendChild(span);
            span.appendChild(document.createTextNode(section.name));
            span.id = section._id + 'span';
            span.className = 'span';
            sectionsListHTML.appendChild(sectionHTML);
        }
        setTimeout(()=> {
            searchPanel.style.display = 'block';
            searchPanel.style.opacity = '1';
        },1);

        const sections = document.getElementsByClassName('section');
        [...sections].forEach(section => {
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
        },1);
        sectionsListHTML.innerHTML = '';
        productTypeListHTML.innerHTML = '';
    }
}


async function displayProductTypes(event) {
    productTypeListHTML.innerHTML = '';
    let inputID = event.target.id,
        liID = inputID.replace(/-input/,'');
    console.log(liID);

    sectionsListHTML.style.flexWrap = 'nowrap';
    sectionsListHTML.style.height = '100%';
    sectionsListHTML.style.flexBasis = '30%';

    const spans = document.getElementsByClassName('span');
    for(let span of spans) {
        span.className = 'span grey';
    }

    const span = document.getElementById(liID + 'span');
    span.className = 'span act';

    const productTypesList = await getJSON(`http://127.0.0.1:8000/api/sections/${liID}/product-types/`, "GET", null);

    for (let productType of productTypesList.product_types) {
        let productTypeHTML = document.createElement('li');
        productTypeHTML.id = productType._id;
        let link = document.createElement('a');
        // link.href = '#'
        link.appendChild(document.createTextNode(productType.name));
        productTypeHTML.appendChild(link);
        productTypeListHTML.appendChild(productTypeHTML);
    }
}


async function getJSON(url, method, body) {
    let response = await fetch(url, {method, body,
        headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },}).then(res => res.json());
    console.log(response);
    return response
}