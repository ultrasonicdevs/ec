class Section extends Block {
  constructor (options) { // id, name, parent
    super(options); // id, name
    this.parentContainer = options.parent;
    this.urlToSection = `${this.urlToSections}${this.id}/`;

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

    deleteSectionBtn.appendChild(deleteSectionBtnRelative);
    sectionContainer.appendChild(sectionName);
    sectionContainer.appendChild(productMenu);
    sectionContainer.appendChild(deleteSectionBtn);

    this.appendChildToParent (sectionContainer);
  }

  appendChildToParent (child) {
    this.parentContainer.appendChild(child);
  }

  async removeChildFromParent (child) {
    this.parentContainer.removeChild(child);
    await this.sendRequest(this.urlToSection, 'DELETE', null, null, true);
  }

}
