class Section extends Request {
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
          deleteSectionBtnRelative = document.createElement('div');

    sectionContainer.id = this.id;
    sectionName.textContent = this.name;

    sectionContainer.className = 'section__container';
    sectionName.className = 'section-name';
    productMenu.className = 'products-menu';
    deleteSectionBtn.className = 'delete-section-btn cross-btn';
    deleteSectionBtnRelative.className = 'delete-section-btn-relative cross-btn-relative';

    deleteSectionBtn.addEventListener('click', () => this.removeChildFromParent(sectionContainer));

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
    const deleteResponse = await this.sendRequest(this.urlToSection, 'DELETE', null, null, true);
    this.parentContainer.removeChild(child);
    if (deleteResponse.status === 'ok') alert('Раздел удален');
  }
}

// const sect = new Section ({id: 'абобус', name: '1233', parent: document.querySelector('.sections')});