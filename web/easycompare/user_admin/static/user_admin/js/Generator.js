class Generator {

  generateSections (sectionsData) {
    const sectionsContainer = document.querySelector('.sections');
    console.log(sectionsData);
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
    console.log(section);
    const productsArray = [
      {id: 1, name: 'product_1'},
      {id: 2, name: 'product_2'},
    ];

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

}