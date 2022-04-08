class Popup {
  constructor () {
    this.parentContainer = document.body;

    this.createPopup ();
  }

  createPopup () {
    const popupBackground = document.createElement('section'),
          popupContainer = document.createElement('div'),

          popupCloseBtn = document.createElement('button'),
          popupCloseBtnRelative = document.createElement('div'),
          
          productDataForm = document.createElement('form'),
          productTypeName = document.createElement('input'),
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
    saveProductBtn.textContent = 'Сохранить';
    addFilterBtn.textContent = 'Добавить фильтр';

    popupCloseBtn.addEventListener('click', () => this.hidePopup(popupBackground))
    productTypeName.addEventListener('input', (e) => {
      document.querySelector('.save-product-btn').disabled = !this.checkInputLength(e.target);
    });
    addFilterBtn.addEventListener('click', () => {
      new Filter ({parentContainer: filterContainer});
    })


    popupCloseBtn.appendChild(popupCloseBtnRelative);
    productDataForm.appendChild(productTypeName);
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

}

document.querySelector('.add-new-type-btn').addEventListener('click', () => {
  new Popup ();
})