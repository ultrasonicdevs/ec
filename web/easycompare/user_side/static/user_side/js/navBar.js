class navBar extends Block {
    async productTypesDisplay(event) {
        ulProductTypes.innerHTML = '';
        ulProductTypes.style.display = 'none';
        ulProductTypes.style.opacity = '0';
        let typeID = event.target.id;

        sectionsListHTML.style.flexWrap = 'nowrap';
        sectionsListHTML.style.height = '100%';
        sectionsListHTML.style.flexBasis = '30%';

        [...document.getElementsByClassName('section')].forEach(section => {
            if (section.className === 'section act') {
                section.className = 'section grey';
            } else if (section.className === 'section') {
                section.className += ' grey';
            }
        });

        const sectionAct = document.getElementById(typeID);
        sectionAct.className = 'section act';
        const productTypesList = await new navBar().getJSON(`${location.protocol}//${location.host}/api/sections/${typeID}/product-types/`, "GET", null);

        for (let productType of productTypesList.response) {
            let liProductType = document.createElement('li');
            liProductType.id = productType._id;
            let link = document.createElement('a');
            link.href = `${location.protocol}//${location.host}/${liProductType.id}/`;
            link.appendChild(document.createTextNode(productType.name));
            liProductType.appendChild(link);
            ulProductTypes.appendChild(liProductType);
        }
        ulProductTypes.style.display = 'block';
        setTimeout(() => {

            ulProductTypes.style.opacity = '1';
        }, 100);
    }


    async sectionsDisplay() {
        if (document.getElementById('form-btn').checked === true) {
            const sectionList = await new navBar().getJSON(`${location.protocol}//${location.host}/api/sections/`, "GET", null);
            for (let section of sectionList.response) {
                let liSection = document.createElement('li');
                liSection.className = 'section';
                liSection.id = section._id;
                liSection.appendChild(document.createTextNode(section.name));
                sectionsListHTML.appendChild(liSection);
            }
            setTimeout(() => {
                searchPanel.style.display = 'block';
                searchPanel.style.opacity = '1';
            });

            [...document.getElementsByClassName('section')].forEach(section => {
                section.addEventListener('click', new navBar().productTypesDisplay);
            });
            sectionsListHTML.style.flexWrap = 'wrap';
            sectionsListHTML.style.height = '24rem';
            sectionsListHTML.style.flexBasis = '70%';
        } else {
            searchPanel.style.opacity = '0';
            setTimeout(() => {
                searchPanel.style.display = 'none';
            });
            sectionsListHTML.innerHTML = '';
            ulProductTypes.innerHTML = '';
        }
    }
}


const searchBtn = document.querySelector('#form-btn'),
    searchPanel = document.querySelector('.search-panel'),
    sectionsListHTML = document.getElementById('section-list'),
    ulProductTypes = document.getElementById('product-type-list');
searchBtn.addEventListener('click', new navBar().sectionsDisplay);

window.addEventListener('load', function () {
    const checkbox = document.querySelector('#form-btn');
    checkbox.checked = false;
});
