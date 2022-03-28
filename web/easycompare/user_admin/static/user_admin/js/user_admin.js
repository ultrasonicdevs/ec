class Section {
    constructor (id, name) {
      this.id = id;
      this.name = name;
      this.sectionContainer = document.createElement('li');
      this.sectionContainer.className = 'section__container';
      this.sectionContainer.id = this.id;
      this.createSection();
    }
  
    createSection () {
      const sectionName = document.createElement('p'),
            sectionSubMenu = document.createElement('ul'),
            deleteSectionBtn = document.createElement('button');
  
      sectionName.className = 'section-name';
      sectionSubMenu.className = 'section-sub-menu';
      deleteSectionBtn.className = 'section-delete-btn';
  
      deleteSectionBtn.addEventListener('click', () => this.deleteSection());
  
      sectionName.textContent = this.name;
  
      sectionName.appendChild(sectionSubMenu);
      sectionName.appendChild(deleteSectionBtn);
      this.sectionContainer.appendChild(sectionName);
    }
  
    async deleteSection () {
        const ip = location.host;
        const sections = (await getJSON(`http://${ip}/api/sections/`, 'GET', null)).sections;
        for (let i = 0; i < sections.length; i++) {
            if (this.id === sections[i]._id) {
                sections.splice(i, 1);
                break;
            };
        }
        // TODO: Отправка нового массива разделов на сервер
        renderSections(sections);
    }
}

async function renderPage () {
    const ip = location.host;
    const sections = (await getJSON(`http://${ip}/api/sections/`, 'GET', null)).sections;
    renderSections(sections);
    addEventToProductContainer();
    addEventToEditPageBtn();
}

function renderSections (sections) {
    document.querySelector('.product__container_nav').innerHTML = '';
    createSections (sections);
}

renderPage ()

// ===============================================================

function createSections (sections) {
    const navContainer = document.querySelector('.product__container_nav');

    let i = 0;
    while (i < sections.length) {
        const navInnerContainer = document.createElement('ul');
        navInnerContainer.className = 'nav__inner_container';
        console.log(navInnerContainer)

        for (let j = 0; j < 6; j++) {
            const currentSection = sections[i]

            const section = new Section (currentSection._id, currentSection.name)

            navInnerContainer.appendChild(section.sectionContainer);

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
    const subMenu = target.querySelectorAll('.section-sub-menu li');
    subMenu.forEach(elem => elem.remove());
}

function clearAllProductTypes (target) {
    const subMenus = document.querySelectorAll('.section__container');
    subMenus.forEach(elem => {
        if (elem.id === target.id) return;
        const subMenu = elem.querySelectorAll('.section-sub-menu li');
        subMenu.forEach(elem => elem.remove());
    })
}

function openMenu (target) {
    const navElementContainers = document.querySelectorAll('.section__container');
    navElementContainers.forEach(menu => {
        if (menu === target) {
            menu.style.color = '#000';
            menu.classList.add('active');
            menu.querySelector('.section-sub-menu').classList.add('active');
        } else menu.style.color = '#CCC';
    });
}

function closeMenus (target = null) {
    const menus = document.querySelectorAll('.section__container');
    menus.forEach(menu => {
        if (menu === target) return;
        menu.querySelector('.section-sub-menu').classList.remove('active');
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
        console.log(event.target)
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
            document.querySelector('.sections-delete-btn').style.display = 'block';
            document.querySelector('.sections-delete-btn').addEventListener('click', activateRemoveMode);
        } else {
            productContainerTitle.classList.remove('edit');
            document.querySelector('.sections-delete-btn').style.display = 'none';
            editBtn.textContent = 'Редактировать';
            activateRemoveMode(false);
            document.querySelector('.sections-delete-btn').removeEventListener('click', () => activateRemoveMode());
        }
    })
}

function activateRemoveMode (activate = true) {
    const deleteSectionsBtns = [...document.querySelectorAll('.section-delete-btn')];
    if (activate) {
        deleteSectionsBtns.forEach(deleteSectionBtn => deleteSectionBtn.style.display = 'block');
    } else {
        deleteSectionsBtns.forEach(deleteSectionBtn => deleteSectionBtn.style.display = 'none');
    }
}
