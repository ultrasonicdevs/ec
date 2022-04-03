document.querySelector('.add-new-type-btn').addEventListener('click', openPopup);
function openPopup () {
  document.querySelector('.popup__background').classList.add('open');
  document.querySelector('.type-name').addEventListener('input', (e) => document.querySelector('.save-btn').disabled = !checkInputValueLength(e.target));
  document.querySelector('.add-filter-btn').addEventListener('click', openFilterField);
  document.querySelector('.close-popup-btn').addEventListener('click', closePopup);
  
  function checkInputValueLength (currentInput) {
    return currentInput.value.length === 0 ? false : true;
  }

  function openFilterField (e) {
    e.preventDefault();
    document.querySelector('.filter__container').classList.add('open');
    closeFilterContainer ();
  }

  function closeFilterContainer () {
    document.querySelector('.close-filter-btn').addEventListener('click', e => {
      e.preventDefault();
      e.target.closest('.filter__container').classList.remove('open');
    });
  }

  function closePopup (e) {
    e.preventDefault();
    document.querySelector('.popup__background').classList.remove('open');
    document.querySelector('.type-name').removeEventListener('input', (e) => document.querySelector('.save-btn').disabled = !checkInputValueLength(e.target));
    document.querySelector('.add-filter-btn').removeEventListener('click', openFilterField);
    document.querySelector('.close-popup-btn').removeEventListener('click', closePopup);
    clearFields();
  }
  
  function clearFields () {
    document.querySelector('.type-name').value = '';
    document.querySelector('.filter-name').value = '';
    document.querySelector('.filter-value').value = '';
    saveProduct ();
  }
  // Сохранение товара
  function saveProduct () {
    const productForm = document.forms.productForm;
  }
}
