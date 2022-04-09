class Popup extends Request {
  constructor () {
    super ();
    this.parentContainer = document.body;

    this.createPopup ();
  }

  createPopup () {
    const popupBackground = document.createElement('section'),
          popupContainer = document.createElement('div'),

          popupCloseBtn = document.createElement('button'),
          popupCloseBtnRelative = document.createElement('div'),

          productTypeName = document.createElement('input'),
          productDataForm = document.createElement('form'),
          popupEditBtnsContainer = document.createElement('div'),
          saveProductBtn = document.createElement('button'),
          addFilterBtn = document.createElement('button'),
          filterContainer = document.createElement('section');

    popupBackground.className = 'popup__background';
    popupContainer.className = 'popup__container';
    popupCloseBtn.className = 'popup-close-btn cross-btn';
    popupCloseBtnRelative.className = 'popup-close-btn-relative cross-btn-relative';
    productDataForm.className = 'product-form';
    productTypeName.className = 'product-type-name';

    popupEditBtnsContainer.className = 'product-edit-btns__container';
    saveProductBtn.className = 'save-product-btn';
    addFilterBtn.className = 'add-filter-btn';

    filterContainer.className = 'filter__container';

    saveProductBtn.disabled = true;
    addFilterBtn.type = 'button';
    productDataForm.name = 'productForm';
    productTypeName.placeholder = 'Новый тип товара';
    productTypeName.id = 'product-type-name';
    saveProductBtn.textContent = 'Сохранить';
    addFilterBtn.textContent = 'Добавить фильтр';

    popupCloseBtn.addEventListener('click', () => this.hidePopup(popupBackground));
    productTypeName.addEventListener('input', (e) => {
      document.querySelector('.save-product-btn').disabled = !this.checkInputLength(e.target);
    });
    saveProductBtn.addEventListener('click', (e) => this.saveProductType(e));
    addFilterBtn.addEventListener('click', () => {
      new Filter ({parentContainer: filterContainer});
    });


    popupCloseBtn.appendChild(popupCloseBtnRelative);
    popupContainer.appendChild(productTypeName);
    productDataForm.appendChild(filterContainer);
    productDataForm.appendChild(popupEditBtnsContainer);
    
    popupEditBtnsContainer.appendChild(saveProductBtn);
    popupEditBtnsContainer.appendChild(addFilterBtn);

    popupContainer.appendChild(popupCloseBtn);
    popupContainer.appendChild(productDataForm);
    popupBackground.appendChild(popupContainer);

    this.showPopup (popupBackground);
  }

  checkInputLength (targetInput) {
    return targetInput.value.length === 0 ? false : true;
  }

  showPopup (child) {
    this.parentContainer.appendChild(child);
  }

  hidePopup (child) {
    this.parentContainer.removeChild(child);
  }

  async saveProductType (e) {
    e.preventDefault();
    const form = document.forms.productForm;
    const fields = form.querySelectorAll('.filter__container_inner');
    const productTypeInfo = {};
    productTypeInfo['name'] = document.querySelector('#product-type-name').value;
    productTypeInfo['section'] = document.querySelector('#sections-name').textContent;
    productTypeInfo['attributes'] = [];
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const verboseName = field.querySelector('input').value;
      if (verboseName === '') continue;
      const values = {};
      values['verbose_name'] = verboseName;

      const types = field.querySelectorAll('.radio-input');
      if (types[0].checked) values['type'] = 'Число';
      else values['type'] = 'Строка';
      
      productTypeInfo['attributes'].push(values);
    };

    await this.sendRequest (`${location.protocol}//${location.host}/api/product-types/`, 'POST', JSON.stringify(productTypeInfo), true);

    this.clearFields();
  }

  clearFields () {
    document.querySelector('#product-type-name').value = '';
    document.querySelector('.filter__container').innerHTML = '';
    document.querySelector('.save-product-btn').disabled = true;
  }

}

document.querySelector('.add-new-type-btn').addEventListener('click', () => {
  new Popup ();
})