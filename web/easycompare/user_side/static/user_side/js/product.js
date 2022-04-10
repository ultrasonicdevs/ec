class Filter extends Block {
    displayCards(productsJSON) {
        const productsContainer = document.querySelector('#products');
        productsContainer.innerHTML = '';
        productsJSON.forEach(product => {
            const link = document.createElement('a'),
                cardContainer = document.createElement('figure'),
                image = document.createElement('img'),
                description = document.createElement('div'),
                manufacturer = document.createElement('h5'),
                name = document.createElement('h4'),
                price = document.createElement('h5');

            link.href = `${document.URL}${product._id}`;
            cardContainer.className = 'container';
            image.className = 'product-image';
            image.src = product.preview_url;
            description.className = 'description';
            manufacturer.className = 'manufacturer';
            name.className = 'product-name';
            name.appendChild(document.createTextNode(product.name));
            price.className = 'price';
            cardContainer.appendChild(image);
            cardContainer.appendChild(description);
            description.appendChild(manufacturer);
            description.appendChild(name);
            description.appendChild(price);
            link.appendChild(cardContainer)
            productsContainer.appendChild(link);

            product.attributes.forEach(attribute => {
                if (attribute.verbose_name === 'Цена') {
                    price.appendChild(document.createTextNode(attribute.value));
                }
                if (attribute.verbose_name === 'Производитель') {
                    manufacturer.appendChild(document.createTextNode(attribute.value));
                }
            });
        });
    }


    checkPrice(inputs, productJSON) {
        let productsArray = [];
        productJSON.forEach(product =>{
            product.attributes.forEach(attribute => {
                if (attribute.verbose_name === 'Цена') {
                    if (Number(attribute.value) >= inputs[0] && Number(attribute.value) <= inputs[1]){
                        productsArray.push(product);
                    }
                }
            });
        });
        new Filter().displayCards(productsArray);
    }


    rangeSliderInit(input, productsJSON) {
        let startValue = Math.min.apply(null, input),
            endValue = Math.max.apply(null, input);

        const range = document.querySelector('#slider-round'),
            inputMin = document.getElementById('min'),
            inputMax = document.getElementById('max'),

            inputs = [inputMin, inputMax];
        noUiSlider.create(range, {
            start: [startValue, endValue],
            connect: true,
            range: {
                'min': startValue,
                'max': endValue
            },
            step: 1,
        });
        range.noUiSlider.on('update', function (values, handle) {
            inputs[handle].value = parseInt(values[handle]);
            new Filter().checkPrice([Number(inputMin.value), Number(inputMax.value)], productsJSON);
        });
        inputMin.addEventListener('change', function () {
            range.noUiSlider.set([this.value, null]);
        });
        inputMax.addEventListener('change', function () {
            range.noUiSlider.set([null, this.value]);
        });
    }


    async addValue() {
        let selectedValues = [],
            headers = {"Selected-Filters": []};
        [...document.getElementsByClassName('filter-value')].forEach(elem => {
            if (elem.getAttribute("data-selected") === "true") {
                selectedValues.push({
                    value: elem.innerText,
                    filter_group_name: elem.getAttribute("data-filter-group-name")
                });
            }
        });
        selectedValues.forEach(elem => {
            headers["Selected-Filters"].push({filter_group_name: elem.filter_group_name, attributes: []});
        });
        for (let group of headers["Selected-Filters"]) {
            selectedValues.forEach(elem => {
                if (group.filter_group_name === elem.filter_group_name) {
                    group.attributes.push(elem.value);
                }
            });
        }
        const typeID = document.URL.replace(`${location.protocol}//${location.host}/`, ''),
            filtered = await new Filter().getJSON(
                `${location.protocol}//${location.host}/api/product-types/${typeID}get-filtered/`,
                "GET",
                null,
                headers
            )
        console.log(filtered);
        new Filter().displayCards(filtered);
    }


    async getProducts() {
        const typeID = document.URL.replace(`${location.protocol}//${location.host}/`, ''),
            typeInfo = await new Filter().getJSON(`${location.protocol}//${location.host}/api/product-types/${typeID}filters/`, "GET", null),
            productsJSON = await new Filter().getJSON(`${location.protocol}//${location.host}/api/product-types/${typeID}products/`, "GET", null),

            container = document.querySelector('#characteristics');
        document.title = `${typeInfo.product_type_name} | Easy Compare`;

        // generate product attributes
        typeInfo.product_type_filters.forEach(characteristic => {
            const attr = document.createElement('div'),
                title = document.createElement('h4');
            attr.className = 'characteristic';
            attr.appendChild(title);

            title.style.padding = '.5rem 0 0 0';
            container.appendChild(attr);
            title.appendChild(document.createTextNode(characteristic.filter_group_name));
            if (characteristic.filter_group_name === "Цена") {
                attr.style.order = "-1";
                const slider = document.createElement('div'),
                    label = document.createElement('label'),
                    inputMin = document.createElement('input'),
                    h5 = document.createElement('h5'),
                    inputMax = document.createElement('input');

                slider.id = 'slider-round';
                slider.style.marginTop = '2rem';
                label.htmlFor = 'price';
                h5.appendChild(document.createTextNode('-'));
                inputMin.name = 'min-price';
                inputMin.type = 'number';
                inputMin.placeholder = inputMin.name;
                inputMin.id = 'min';

                inputMax.name = 'max-price';
                inputMax.type = 'number';
                inputMax.placeholder = inputMin.name;
                inputMax.id = 'max';

                attr.appendChild(slider);
                attr.appendChild(label);
                label.appendChild(inputMin);
                label.appendChild(h5);
                label.appendChild(inputMax);

                new Filter().rangeSliderInit(characteristic.attributes, productsJSON);
            } else {
                const values = document.createElement('ul');
                attr.appendChild(values);
                values.style.display = 'none';
                for (let valueIndex in characteristic.attributes) {
                    const value = document.createElement('li');
                    value.dataset.filterGroupName = title.innerText;
                    value.dataset.selected = "false";
                    value.className = "filter-value";
                    value.appendChild(document.createTextNode(characteristic.attributes[valueIndex]))
                    values.appendChild(value);
                    value.addEventListener('click', () => {
                        value.dataset.selected === "false" ? value.setAttribute("data-selected", "true") : value.setAttribute("data-selected", "false");
                       new Filter().addValue()
                    });
                }
                title.addEventListener('click', () => {
                        values.style.display === 'none' ? values.style.display = 'block' : values.style.display = 'none';
                });
            }
        });
    }
}


window.addEventListener('load', new Filter().getProducts);
