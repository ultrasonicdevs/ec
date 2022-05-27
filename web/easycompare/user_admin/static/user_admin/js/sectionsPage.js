class Page extends Request {
  constructor () {
    super();
    this.generator = new Generator ();
    this.host = location.host;
  }

  async renderPage () {
    const sectionsData = await this.sendRequest(this.urlToSections).then(res => res.response);
    
    // Генерация разделов
    if (sectionsData.length === 0) {
      document.querySelector('.sections').innerHTML = `
        <div>
          <h3>Вы не создали ни одного раздела</h3>
          <a 
            href="${location.protocol}//${location.host}/ec-admin/add-section/"
            target="blank"
            style="color: black"
          >Создать</a>
        </div>
      `
      return;
    }
    this.generator.generateSections(sectionsData);

    this.addEventToEditBtn ();
    this.addEventToActivateDeleteModeBtn ();

    // Добавление событий по клику на раздел (открытие менюшки товаров)
    const sectionsContainers = [...document.querySelectorAll('.section__container')];
    sectionsContainers.forEach(sectionContainer => 
      sectionContainer.addEventListener('click', (e) => this.sectionClickHandler(e))
    );
  }

  sectionClickHandler (e) {
    const currentSectionContainer = e.target.parentNode;
    // Условие нажатия по названию раздела
    if (!e.target.classList.contains('section-name')) return;
    // Очистка всех меню товаров
    [...document.querySelectorAll('.products-menu')]
      .forEach(productsMenu => productsMenu.innerHTML = '');

    // Изменение цвета для всех разделов на неактивный
    [...document.querySelectorAll('.section__container')]
      .forEach(sectionContainer => sectionContainer.style.color = '#CCC');
      
    currentSectionContainer.style.color = '#000';
    
    if (currentSectionContainer.classList.contains('product-menu-opened')) {
      this.closeProductMenu ();
    } else {
      this.openProductMenu (currentSectionContainer);
    }
  }

  openProductMenu (currentSectionContainer) {
    document.querySelector('.sections').classList.add('flex');
    // Удаление метки открытого меню товара со всех контейнеров разделов
    [...document.querySelectorAll('.section__container')]
      .forEach(sectionContainer => sectionContainer.classList.remove('product-menu-opened'));

    currentSectionContainer.classList.add('product-menu-opened');
    this.generator.generateProducts(currentSectionContainer);
  }

  closeProductMenu () {
    // Возврат черного цвета для всех разделов
    [...document.querySelectorAll('.section__container')]
      .forEach(sectionContainer => sectionContainer.style.color = '#000');

    document.querySelector('.sections').classList.remove('flex');
    [...document.querySelectorAll('.product-menu-opened')].forEach(sectionContainer => sectionContainer.classList.remove('product-menu-opened'));
  }

  addEventToEditBtn () {
    const editBtn = document.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
      const sectionsNames = document.querySelectorAll('.section-name').length ? 
        document.querySelectorAll('.section-name') : 
        document.querySelectorAll('.section-name-input');
      const productTypes = document.querySelectorAll('.product-name').length ?
        document.querySelectorAll('.product-name') :
        document.querySelectorAll('.product-name-input');
      sectionsNames.forEach(sectionName => {
        this.changeToInputOrSpan(sectionName, 'section');
      });
      productTypes.forEach(productType => {
        this.changeToInputOrSpan(productType, 'product');
      })
      if (editBtn.classList.contains('edit-mode')) {
        [...document.querySelectorAll('.section-name')]
        .forEach(sectionName => {
          const data = {
            id: sectionName.parentNode.id,
            name: sectionName.textContent,
          };
          this.sendRequest(this.urlToSections + `${data.id}/`, 'PUT', JSON.stringify(data), null, true);
        });
        [...document.querySelectorAll('.product-name')]
        .forEach(productNane => {
          const data = {
            id: productNane.parentNode.id,
            name: productNane.textContent,
          };
          this.sendRequest(this.urlToProductTypes + `${data.id}/`, 'PUT', JSON.stringify(data), null, true);
        });
        editBtn.textContent = 'Редактировать';
        editBtn.classList.remove('edit-mode');
        [...document.querySelectorAll('.delete-section-btn')]
        .forEach(deleteSectionBtn => deleteSectionBtn.classList.remove('remove-mode'));
        document.querySelector('.activate-delete-mode-btn').classList.remove('edit-mode');
        document.querySelector('.add-new-type-btn').classList.remove('edit-mode');
        document.querySelector('#editing-tooltip').classList.remove('edit-mode');
      } else {
        editBtn.textContent = 'Сохранить изменения';
        editBtn.classList.add('edit-mode');
        document.querySelector('.activate-delete-mode-btn').classList.add('edit-mode');
        document.querySelector('.add-new-type-btn').classList.add('edit-mode');
        document.querySelector('#editing-tooltip').classList.add('edit-mode');
      }
    })
  }

  addEventToActivateDeleteModeBtn () {
    const activateDeleteModeBtn = document.querySelector('.activate-delete-mode-btn');
    activateDeleteModeBtn.addEventListener('click', () => {
      if (activateDeleteModeBtn.classList.contains('remove-mode')) {
        activateDeleteModeBtn.classList.remove('remove-mode');
        [...document.querySelectorAll('.delete-section-btn')]
        .forEach(deleteSectionBtn => deleteSectionBtn.classList.remove('remove-mode'));
        [...document.querySelectorAll('.delete-product-type-btn')]
        .forEach(deleteSectionBtn => deleteSectionBtn.classList.remove('remove-mode'));
      } else {
        activateDeleteModeBtn.classList.add('remove-mode');
        [...document.querySelectorAll('.delete-section-btn')]
        .forEach(deleteSectionBtn => deleteSectionBtn.classList.add('remove-mode'));
        [...document.querySelectorAll('.delete-product-type-btn')]
        .forEach(deleteSectionBtn => deleteSectionBtn.classList.add('remove-mode'));
      }
    })
  }

  changeToInputOrSpan (element, type) {
    let newElement = null;
    if (element.tagName === 'SPAN') {
      newElement = document.createElement('input')
      newElement.value = element.textContent;
      newElement.className = element.className + '-input';
    }
    else {
      newElement = document.createElement('span');
      newElement.textContent = element.value;
      newElement.className = `${type}-name`;
    }
    element.parentNode.insertBefore(newElement, element);
    element.parentNode.removeChild(element);
    return newElement;
  }
}

const page = new Page ();
window.onload = page.renderPage();
