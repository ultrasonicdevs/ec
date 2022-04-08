class Popup {
  constructor () {
    this.parent = document.querySelector('.popup__background');
    this.createPopup ();
  }

  createPopup () {
    const popupContainer = document.createElement('div'),
          popupContainerInner = document.createElement('div'),
          popupForm = document.createElement('form'),
          closePopupButton = document.createElement('button'),
          productTypeNameInput = document.createElement('input'),

          popupEditButtonsContainer = document.createElement('div'),
          saveProductTypeBtn = document.createElement('button'),
          addFilterBtn = document.createElement('button');

    popupContainer.className = 'popup__container';
    popupContainerInner.className = 'popup__container_inner';
    popupForm.id = 'productForm';
    popupForm.onsubmit = (e) => e.preventDefault();

    // Переделать крестик
    closePopupButton.className = 'close-btn close-popup-btn';
    closePopupButton.type = 'button';
    closePopupButton.textContent = '123';

    productTypeNameInput.className = 'product-type-name';
    productTypeNameInput.placeholder = 'Новый тип товара';

    popupEditButtonsContainer.className = 'popup-edit-buttons__container';
    saveProductTypeBtn.className = 'save-btn';
    saveProductTypeBtn.type = 'button';
    saveProductTypeBtn.disabled = true;
    saveProductTypeBtn.textContent = 'Сохранить';
    addFilterBtn.className = 'add-filter-btn';
    addFilterBtn.type = 'button';
    addFilterBtn.textContent = 'Добавить фильтр';

    popupEditButtonsContainer.appendChild(saveProductTypeBtn);
    popupEditButtonsContainer.appendChild(addFilterBtn);

    popupForm.appendChild(closePopupButton);
    popupForm.appendChild(productTypeNameInput);
    popupForm.appendChild(popupEditButtonsContainer);
    popupContainerInner.appendChild(popupForm);
    popupContainer.appendChild(popupContainerInner);

    this.parent.appendChild(popupContainer);
  }

  openPopup () {
    document.querySelector('.popup__background').classList.add('open');
    document.querySelector('.product-type-name').addEventListener('input', (e) => {
      console.log(e.target);
      document.querySelector('.save-btn').disabled = !this.checkInputValueLength(e.target);
    });
    // document.querySelector('.add-filter-btn').addEventListener('click', openFilterField);
    document.querySelector('.close-popup-btn').addEventListener('click', () => this.closePopup());
  }

  // openFilterField

  closePopup () {
    document.querySelector('.popup__background').classList.remove('open');
    // document.querySelector('.type-name').removeEventListener('input', (e) => document.querySelector('.save-btn').disabled = !checkInputValueLength(e.target));
    // document.querySelector('.add-filter-btn').removeEventListener('click', openFilterField);
    document.querySelector('.close-popup-btn').removeEventListener('click', this.closePopup);
    this.parent.innerHTML = '';
  }

  checkInputValueLength (targetInput) {
    return targetInput.value.length === 0 ? false : true;
  }
  
}

document.querySelector('.add-new-type-btn').addEventListener('click', () => {
  const popup = new Popup ();
  popup.openPopup();
})