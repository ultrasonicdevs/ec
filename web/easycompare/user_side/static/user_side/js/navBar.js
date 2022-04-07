class NavBar extends Block {
    async renderProductTypes(event) {
        let typeID = event.target.id;

        ulProductTypes.innerHTML = '';
        ulProductTypes.style.display = 'none';
        ulProductTypes.style.opacity = '0';
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
        const productTypesList = await new NavBar().getJSON(`${location.protocol}//${location.host}/api/sections/${typeID}/product-types/`, "GET", null),
            sectionAct = document.getElementById(typeID);
        sectionAct.className = 'section act';
        for (let productType of productTypesList) {
            const liProductType = document.createElement('li'),
                link = document.createElement('a');
            liProductType.id = productType.id;
            link.href = `${location.protocol}//${location.host}/${liProductType.id}/`;
            link.appendChild(document.createTextNode(productType.name));
            liProductType.appendChild(link);
            ulProductTypes.appendChild(liProductType);
        }
        ulProductTypes.style.display = 'block';
        setTimeout(() => {
            ulProductTypes.style.opacity = '1';
        });
    }


    async generateSections() {
        const sectionList = await new NavBar().getJSON(`${location.protocol}//${location.host}/api/sections/`, "GET", null);
        for (let section of sectionList) {
            let liSection = document.createElement('li');
            liSection.className = 'section';
            liSection.id = section.id;
            liSection.appendChild(document.createTextNode(section.name));
            sectionsListHTML.appendChild(liSection);
        }
        [...document.getElementsByClassName('section')].forEach(section => {
                section.addEventListener('click', new NavBar().renderProductTypes);
        });
    }


    renderSections() {
        if (document.getElementById('form-btn').checked === true) {
            new NavBar().generateSections();
            // console.log(new NavBar().generateSections());
            setTimeout(() => {
                searchPanel.style.display = 'block';
                searchPanel.style.opacity = '1';
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
searchBtn.addEventListener('click', new NavBar().renderSections);


window.addEventListener('load', function () {
    const checkbox = document.querySelector('#form-btn');
    checkbox.checked = false;
});
