document.querySelector('.add-new-type-btn').addEventListener('click', openPopup);
function openPopup () {
  document.querySelector('.popup__background').classList.add('open');
  document.querySelector('.type-name').addEventListener('input', (e) => document.querySelector('.save-btn').disabled = !checkInputValueLength(e.target));
  document.querySelector('.add-filter-btn').addEventListener('click', openFilterField);
  document.querySelector('.close-popup-btn').addEventListener('click', closePopup);
  
  addEventForTextFromExamples ();

  function checkInputValueLength (currentInput) {
    return currentInput.value.length === 0 ? false : true;
  }

  function addEventForTextFromExamples () {
    document.querySelector('.examples-filter-values__container').addEventListener('click', e => {
      if (e.target.tagName === 'SPAN') document.querySelector('.filter-value').value = e.target.textContent;
    });
  }

  function openFilterField () {
    document.querySelector('.filter__container').classList.add('open');
    closeFilterContainer ();
  }

  function closeFilterContainer () {
    document.querySelector('.close-filter-btn').addEventListener('click', e => {
      e.target.closest('.filter__container').classList.remove('open');
    })
  }

  function closePopup () {
    document.querySelector('.popup__background').classList.remove('open');
    clearFields();
  }
  
  function clearFields () {
    document.querySelector('.type-name').value = '';
    document.querySelector('.filter-name').value = '';
    document.querySelector('.filter-value').value = '';
  }

  // function save()
}
