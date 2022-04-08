class Section extends Block {
  constructor (options) { // id, name, parent
    super(options); // id, name
    this.parentContainer = options.parent;
    this.urlToSection = `${location.protocol}//${location.host}/api/sections/${this.id}/`;

    this.createSection ();
  }

  createSection () {
    const sectionContainer = document.createElement('li'),
          sectionName = document.createElement('span'),
          productMenu = document.createElement('ul'),
          deleteSectionBtn = document.createElement('button'),
          deleteSectionBtnRelative = document.createElement('div'),
          deleteSectionBtn45 = document.createElement('span'),
          deleteSectionBtn135 = document.createElement('span');

    sectionContainer.id = this.id;
    sectionName.textContent = this.name;

    sectionContainer.className = 'section__container';
    sectionName.className = 'section-name';
    productMenu.className = 'products-menu';
    deleteSectionBtn.className = 'delete-section-btn';
    deleteSectionBtnRelative.className = 'delete-section-btn-relative';
    deleteSectionBtn45.className = 'delete-section-btn-45';
    deleteSectionBtn135.className = 'delete-section-btn-135';

    deleteSectionBtn.addEventListener('click', () => this.removeChildFromParent(sectionContainer));

    deleteSectionBtnRelative.appendChild(deleteSectionBtn45);
    deleteSectionBtnRelative.appendChild(deleteSectionBtn135);
    deleteSectionBtn.appendChild(deleteSectionBtnRelative)
    sectionContainer.appendChild(sectionName);
    sectionContainer.appendChild(productMenu);
    sectionContainer.appendChild(deleteSectionBtn);

    this.appendChildToParent (sectionContainer);
  }

  appendChildToParent (child) {
    this.parentContainer.appendChild(child);
  }

  async removeChildFromParent (child) {
    const deleteResponse = await this.sendRequest(this.urlToSection, 'DELETE', null, true);
    this.parentContainer.removeChild(child);
    if (deleteResponse.status === 'ok') alert('Раздел удален');
  }
}

// const sect = new Section ({id: 'абобус', name: '1233', parent: document.querySelector('.sections')});