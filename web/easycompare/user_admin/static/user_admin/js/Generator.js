class Generator extends Request {

  constructor () {
    super();
  }

  generateSections (sectionsData) {
    const sectionsContainer = document.querySelector('.sections');
    
    let i = 0;
    while (i < sectionsData.length) {
      const sectionsContainerOfSixElems = document.createElement('ul'),
            howManyElems = 6;

      sectionsContainerOfSixElems.className = `sections__container-of-several-elements`;

      for (let j = 0; j < howManyElems; j++) {
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
    const productsArray = await this.sendRequest (`${this.urlToSections}${section.id}/product-types/`, 'GET').then(res => res.response);

    const productMenu = section.querySelector('.products-menu');

    productsArray.forEach(product => {
      const {id, name} = product;

      new ProductType ({
        id,
        name,
        parent: productMenu,
      });
    })
  }

}