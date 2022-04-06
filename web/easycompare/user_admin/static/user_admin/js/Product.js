class Product extends Block {
  constructor (options) { // id, name, parent
    super (options) // id, name

    this.parentContainer = options.parent;
    
    this.createProduct ();
  }

  createProduct () {
    const productContainer = document.createElement('li'),
          productName = document.createElement('span');

    productContainer.id = this.id;
    productName.textContent = this.name;

    productContainer.className = 'product__container';
    productName.className = 'product-name';

    productContainer.appendChild(productName);

    this.appendChildToParent (productContainer)
  }

  appendChildToParent (children) {
    this.parentContainer.appendChild(children);
  }
}