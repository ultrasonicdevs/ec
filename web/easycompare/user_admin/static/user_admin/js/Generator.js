class Generator {

  constructor () {
    this.urlToSections = `${location.protocol}//${location.host}/api/sections/`;
  }

  generateSections (sectionsData) {
    const sectionsContainer = document.querySelector('.sections');
    
    let i = 0;
    while (i < sectionsData.length) {
      const sectionsContainerOfSixElems = document.createElement('ul'),
            howManyElems = 6;

      sectionsContainerOfSixElems.className = `sections__container-of-several-elements`;

      for (let j = 0; j < howManyElems; j++) {
        console.log(sectionsData[i])
        const {id, name} = sectionsData[i];

        new Section ({
          id,
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
    const productsArray = await this.getJSON(`${this.urlToSections}${section.id}/product-types/`).then(res => res.response);

    const productMenu = section.querySelector('.products-menu');

    productsArray.forEach(product => {
      const {id, name} = product;

      new Product ({
        id,
        name,
        parent: productMenu,
      });
    })
  }

  async getJSON (url, method, body = null) {
    return await fetch(url, {method, body}).then(response => response.json());
  }

}