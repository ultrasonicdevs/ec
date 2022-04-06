class Generator {

  constructor () {
    this.host = location.host;
  }

  generateSections (sectionsData) {
    const sectionsContainer = document.querySelector('.sections');
    
    let i = 0;
    while (i < sectionsData.length) {
      const sectionsContainerOfSixElems = document.createElement('ul'),
            howManyElems = 6;

      sectionsContainerOfSixElems.className = `sections__container-of-several-elements`;

      for (let j = 0; j < howManyElems; j++) {
        const {_id, name} = sectionsData[i];

        new Section ({
          _id,
          name,
          parent: sectionsContainerOfSixElems,
        });

        i++
        if (i === sectionsData.length) break;
      }

      sectionsContainer.appendChild(sectionsContainerOfSixElems);
    }
  }

  async generateProducts (section) {
    const productsArray = await this.getJSON(`http://${this.host}/api/sections/${section.id}/product-types/`).then(res => res.product_types);

    const productMenu = section.querySelector('.products-menu');

    productsArray.forEach(product => {
      const {_id, name} = product;

      new Product ({
        _id,
        name,
        parent: productMenu,
      });
    })
  }

  async getJSON (url, method, body = null) {
    return await fetch(url, {method, body}).then(response => response.json());
  }

}