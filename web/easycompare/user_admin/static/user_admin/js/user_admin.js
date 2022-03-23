function render () {
    createSections();
    addEventToProductContainer();
    addEventToEditPageBtn();
}

render()

// ===============================================================

async function createSections () {
    const ip = location.host;
    const sections = (await getJSON(`http://${ip}/api/sections/`, 'GET', null)).sections;

    const navContainer = document.querySelector('.product__container_nav');

    let i = 0;
    while (i < sections.length) {
        const navInnerContainer = document.createElement('ul');
        navInnerContainer.className = 'nav__inner_container';

        for (let j = 0; j < 6; j++) {
            const currentSection = sections[i]

            const navElementContainer = document.createElement('li');
            navElementContainer.className = 'nav__element_container';
            navElementContainer.id = currentSection._id;

            const navElement = document.createElement('p');
            navElement.className = 'nav__element';
            navElement.textContent = currentSection.name;

            const subMenu = document.createElement('ul');
            subMenu.className = 'sub-menu';

            navElementContainer.appendChild(navElement);
            navElement.appendChild(subMenu);

            navInnerContainer.appendChild(navElementContainer);

            i++;
            if (i === sections.length) break;
        }
        navContainer.appendChild(navInnerContainer);
    }
}

async function addProductTypes (target) {
    const ip = location.host;
    const productTypes = (await getJSON(`http://${ip}/api/sections/${target.id}/product-types/`)).product_types;
    const subMenu = target.querySelector('ul');
    productTypes.forEach(productType => {
        const li = document.createElement('li');
        li.id = productType._id;
        li.textContent = productType.name;
        subMenu.appendChild(li);
    });
}

function clearProductTypes (target) {
    const subMenu = target.querySelectorAll('.sub-menu li');
    subMenu.forEach(elem => elem.remove());
}

function clearAllProductTypes (target) {
    const subMenus = document.querySelectorAll('.nav__element_container');
    subMenus.forEach(elem => {
        if (elem.id === target.id) return;
        const subMenu = elem.querySelectorAll('.sub-menu li');
        subMenu.forEach(elem => elem.remove());
    })
}

function openMenu (target) {
    const navElementContainers = document.querySelectorAll('.nav__element_container');
    navElementContainers.forEach(menu => {
        if (menu === target) {
            menu.style.color = '#000';
            menu.classList.add('active');
            menu.querySelector('.sub-menu').classList.add('active');
        } else menu.style.color = '#CCC';
    });
}

function closeMenus (target = null) {
    const menus = document.querySelectorAll('.nav__element_container');
    menus.forEach(menu => {
        if (menu === target) return;
        menu.querySelector('.sub-menu').classList.remove('active');
        menu.classList.remove('active');
        menu.style.color = '#000';
    })
}

async function getJSON(url, method, body) {
    return await fetch(url, {method, body}).then(data => data.json());
}

// ===============================================================

function addEventToProductContainer () {
    const navContainer = document.querySelector('.product__container_nav');
    navContainer.addEventListener('click', event => {
        if (event.target.nodeName !== 'P') return;
        const navElementContainer = event.target.parentNode;
        if (navElementContainer.classList.contains('active')) {
            navContainer.classList.remove('active');
            closeMenus();
            clearProductTypes(navElementContainer);
        } else {
            closeMenus(navElementContainer);
            openMenu(navElementContainer);
            addProductTypes(navElementContainer);
            clearAllProductTypes(navElementContainer);
            navContainer.classList.add('active');
        }
    })
}

function addEventToEditPageBtn () {
    const editBtn = document.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
        const productContainerTitle = document.querySelector('.product__container_title');
        if (!productContainerTitle.classList.contains('edit')) {
            productContainerTitle.classList.add('edit');
            editBtn.textContent = 'Сохранить изменения';
            addEventToAddNewTypeButton ();
        } else {
            productContainerTitle.classList.remove('edit');
            editBtn.textContent = 'Редактировать';
        }
    })
}

function addEventToAddNewTypeButton () {
    const addNewTypeButton = document.querySelector('.add-new-type-btn');
    addNewTypeButton.addEventListener('click', openPopup)
}

function openPopup () {
    document.querySelector('.popup__container').classList.add('open');
    document.querySelector('.close-btn').addEventListener('click', closePopup);
    document.querySelector('.save-btn').addEventListener('click', saveNewType);
}

function closePopup () {
    document.querySelector('.popup__container').classList.remove('open');
}

function saveNewType () {
    const typeName = document.querySelector('#type-name').value;
    // ToDo : Взятие фильтров
}

