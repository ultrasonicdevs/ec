class Filter {
  constructor ({parentContainer}) {
    this.parentContainer = parentContainer;
    const filterContainersInner = document.querySelectorAll('.filter__container_inner');
    console.log(filterContainersInner)
    filterContainersInner.length !== 0 ? 
      this.id = Number(filterContainersInner[filterContainersInner.length - 1].id) + 1:
      this.id = 1;
    this.createFilter ();
  }

  createFilter () {
    const filterContainerElement = document.createElement('div'),
          filterCloseBtn = document.createElement('button'),
          filterCloseBtnRelative = document.createElement('div'),
          filterName = document.createElement ('input'),
          filterSettingsContainer = document.createElement('div'),
          filterSettingsTitle = document.createElement('h2'),
          filterTypeContainer = document.createElement('div'),
          filterTypeContainerName = document.createElement('h3'),
          
          filterValueTypeNumber = document.createElement('div'),
          radioInputNumber = document.createElement('input'),
          radioLabelNumber = document.createElement('label'),
          filterValueTypeString = document.createElement('div'),
          radioInputString = document.createElement('input'),
          radioLabelString = document.createElement('label');

    filterCloseBtn.className = 'filter-close-btn';
    filterCloseBtn.type = 'button'
    filterCloseBtnRelative.className = 'filter-close-btn-relative';

    filterName.className = 'filter-name';
    filterName.placeholder = 'Название фильтра';
    
    filterContainerElement.className = 'filter__container_inner';
    filterContainerElement.id = this.id;
    filterSettingsTitle.className = 'filter-settings-title';
    filterSettingsTitle.textContent = 'Настройка фильтра';
    filterTypeContainer.className = 'filter-type__container';
    filterTypeContainerName.textContent = 'Тип значения';

    filterSettingsContainer.className = 'filter-settings__container';

    filterValueTypeNumber.className = 'filter-value-type';
    radioInputNumber.className = 'radio-input';
    radioInputNumber.type = 'radio';
    radioInputNumber.id = 'number';
    radioInputNumber.name = `type-value-${this.id}`;
    radioLabelNumber.className = 'radio-label';
    radioLabelNumber.setAttribute('for', 'number');
    radioLabelNumber.textContent = 'Число';
    radioInputNumber.checked = true;

    filterValueTypeString.className = 'filter-value-type';
    radioInputString.className = 'radio-input';
    radioInputString.type = 'radio';
    radioInputString.id = 'string';
    radioInputString.name = `type-value-${this.id}`;
    radioLabelString.className = 'radio-label';
    radioLabelString.setAttribute('for', 'string');
    radioLabelString.textContent = 'Строка';

    filterCloseBtn.addEventListener('click', () => this.removeChildFromParent(filterContainerElement))


    filterValueTypeNumber.appendChild(radioInputNumber);
    filterValueTypeNumber.appendChild(radioLabelNumber);
    
    filterValueTypeString.appendChild(radioInputString);
    filterValueTypeString.appendChild(radioLabelString);

    filterTypeContainer.appendChild(filterTypeContainerName);
    filterTypeContainer.appendChild(filterValueTypeNumber);
    filterTypeContainer.appendChild(filterValueTypeString);

    filterSettingsContainer.appendChild(filterSettingsTitle);
    filterSettingsContainer.appendChild(filterTypeContainer);
    filterCloseBtn.appendChild(filterCloseBtnRelative);
    filterContainerElement.appendChild(filterCloseBtn);
    filterContainerElement.appendChild(filterName);
    filterContainerElement.appendChild(filterSettingsContainer);

    this.appendChildToParent(filterContainerElement);
  }

  appendChildToParent (child) {
    this.parentContainer.appendChild(child);
  }

  removeChildFromParent (child) {
    this.parentContainer.removeChild(child);
  }

}