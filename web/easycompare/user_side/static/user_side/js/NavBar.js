class NavBar extends Request {
    constructor() {
        super();
        this.sections = [];
        this.productTypes = [];

        this.renderSections = this.renderSections.bind(this);
        this.renderProductTypes = this.renderProductTypes.bind(this);
    }


    renderProductTypes(event) {
        let sectionID = event.target.id;

        ulProductTypes.innerHTML = '';
        ulProductTypes.style.display = 'none';
        ulProductTypes.style.opacity = '0';
        ulSectionsList.style.flexWrap = 'nowrap';
        ulSectionsList.style.height = '100%';
        ulSectionsList.style.flexBasis = '30%';
        [...document.getElementsByClassName('section')].forEach(section => {
            if (section.className === 'section act') {
                section.className = 'section grey';
            } else if (section.className === 'section') {
                section.className += ' grey';
            }
        });
        const sectionAct = document.getElementById(sectionID);
        sectionAct.className = 'section act';
        const productTypesList = this.productTypes.filter(productType => productType.section === sectionID);
        productTypesList.forEach(productType => {
            const liProductType = document.createElement('li'),
                link = document.createElement('a');
            liProductType.id = productType.id;
            link.href = `${location.protocol}//${location.host}/${liProductType.id}/`;
            link.appendChild(document.createTextNode(productType.name));
            liProductType.appendChild(link);
            ulProductTypes.appendChild(liProductType);
        });
        ulProductTypes.style.display = 'block';
        setTimeout(() => {
            ulProductTypes.style.opacity = '1';
        });
    }


    async renderSections() {
        for (let section of this.sections) {
            let liSection = document.createElement('li');
            liSection.className = 'section';
            liSection.id = section.id;
            liSection.appendChild(document.createTextNode(section.name));
            ulSectionsList.appendChild(liSection);
        }
        [...document.getElementsByClassName('section')].forEach(section => {

            section.addEventListener('click', this.renderProductTypes);
        });
        if (document.getElementById('form-btn').getAttribute('data-active') === "false") {
            document.getElementById('form-btn').setAttribute('data-active', "true");
            setTimeout(() => {
                modalWindow.style.display = 'block';
                modalWindow.style.opacity = '1';
            });
            ulSectionsList.style.flexWrap = 'wrap';
            ulSectionsList.style.height = '24rem';
            ulSectionsList.style.flexBasis = '70%';
        } else {
            document.getElementById('form-btn').setAttribute('data-active', "false");
            modalWindow.style.opacity = '0';
            setTimeout(() => {
                modalWindow.style.display = 'none';
            });
            ulSectionsList.innerHTML = '';
            ulProductTypes.innerHTML = '';
        }
    }


    async getNavBarData() {
        this.sections = await this.getJSON(`${location.protocol}//${location.host}/api/sections/`, "GET", null);
        this.productTypes = await this.getJSON(`${location.protocol}//${location.host}/api/product-types/`, "GET", null);
        burgerBtn.addEventListener('click', this.renderSections);
    }
}


const burgerBtn = document.querySelector('#form-btn'),
    modalWindow = document.querySelector('.search-panel'),
    ulSectionsList = document.getElementById('section-list'),
    ulProductTypes = document.getElementById('product-type-list');



window.addEventListener('load', async function () {
    await new NavBar().getNavBarData();
    const checkbox = document.querySelector('#form-btn');
    checkbox.checked = false;
});
