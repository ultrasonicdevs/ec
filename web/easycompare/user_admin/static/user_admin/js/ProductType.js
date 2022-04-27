class ProductType extends Block {
  constructor (options) { // id, name, parent
    super (options) // id, name

    this.parentContainer = options.parent;
    this.urlToProductType = `${this.urlToProductTypes}${this.id}/`;
    this.urlToDetailView = `${location.protocol}//${location.host}/${this.id}`;
    
    this.createProduct ();
  }

  createProduct () {
    const productContainer = document.createElement('li'),
          productName = document.createElement('span'),
          deleteProductTypeBtn = document.createElement('button'),
          deleteProductTypeBtnRelative = document.createElement('div');

    productContainer.id = this.id;
    productName.textContent = this.name;
    deleteProductTypeBtn.className = 'delete-product-type-btn cross-btn';
    deleteProductTypeBtnRelative.className = 'delete-product-type-btn-relative cross-btn-relative';

    deleteProductTypeBtn.addEventListener('click', () => this.removeChildFromParent(productContainer));

    productContainer.className = 'product__container';
    productName.className = 'product-name';

    productName.addEventListener('click',() => {
      window.open(this.urlToDetailView);
    });

    deleteProductTypeBtn.appendChild(deleteProductTypeBtnRelative);
    productContainer.appendChild(deleteProductTypeBtn);
    productContainer.appendChild(productName);

    this.appendChildToParent (productContainer)
  }

  appendChildToParent (children) {
    this.parentContainer.appendChild(children);
  }

  async removeChildFromParent (child) {
    const deleteResponse = await this.sendRequest(this.urlToProductType, 'DELETE', null, null, true);
    this.parentContainer.removeChild(child);
    if (deleteResponse.status === 'ok') alert('Тип товара удален');
  }
}