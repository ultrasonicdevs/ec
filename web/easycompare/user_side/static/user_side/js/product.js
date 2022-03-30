class Filter extends Block {
    constructor(filtersInfo) {
        super();
        this.filtersInfo = filtersInfo;
    }
    displayCards(productsJSON) {
        const productsContainer = document.querySelector('#products');
        productsContainer.innerHTML = '';
        productsJSON.products.forEach(product => {
            const link = document.createElement('a'),
                cardContainer = document.createElement('div'),
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
            // manufacturer.appendChild(document.createTextNode(product.manufacturer));
            name.className = 'product-name';
            name.appendChild(document.createTextNode(product.name));
            price.className = 'price';
            // price.appendChild(document.createTextNode(product.price));
            cardContainer.appendChild(image);
            cardContainer.appendChild(description);
            description.appendChild(manufacturer);
            description.appendChild(name);
            description.appendChild(price);
            link.appendChild(cardContainer)
            productsContainer.appendChild(link);

            product.attributes.forEach(attribute => {
                if (attribute.verbose_name === 'price') {
                    price.appendChild(document.createTextNode(attribute.value));
                }
                if (attribute.verbose_name === 'manufacturer') {
                    manufacturer.appendChild(document.createTextNode(attribute.value));
                }
            });
        });
    }


    checkPrice(inputs, productJSON) {
        let productsArray = [];
        productJSON.products.forEach(product =>{
            product.attributes.forEach(attribute => {
                if (attribute.verbose_name === 'price') {
                    if (Number(attribute.value) >= inputs[0] && Number(attribute.value) <= inputs[1]){
                        productsArray.push(product);
                    }
                }
            });
        });
        new Filter().displayCards({'products': productsArray});
    }


    rangeSliderInit(input, productsJSON) {
        let startValue = Math.min.apply(null, input),
            endValue = Math.max.apply(null, input);

        const range = document.getElementById('slider-round'),
            inputMin = document.getElementById('min'),
            inputMax = document.getElementById('max');
        const inputs = [inputMin, inputMax];
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

    async getProducts() {
        const typeID = document.URL.replace(`${location.protocol}//${location.host}/`, ''),
            typeInfo = await new Filter().getJSON(`${location.protocol}//${location.host}/api/product-types/${typeID}`, "GET", null),
            productsJSON = await new Filter().getJSON(`${location.protocol}//${location.host}/api/product-types/${typeID}products/`, "GET", null);

        const container = document.querySelector('#characteristics');

        document.title = `${typeInfo.name} | Easy Compare`;
        console.log(productsJSON);
        console.log(typeInfo);


        let attributes = [];
        typeInfo.attributes.forEach(attribute => {
            let attributeElem = {}
            let values = [];
            productsJSON.products.forEach(product => {
                for (let attributeIndex in product.attributes) {
                    if (attribute.verbose_name === product.attributes[attributeIndex].verbose_name) {
                        values.push(product.attributes[attributeIndex].value);
                    }
                    attributeElem = {
                        'filter_group_name': attribute.verbose_name,
                        'attributes': [...new Set(values)]
                    };
                }
            });
            attributes.push(attributeElem);
        });

        this.filtersInfo = {
            'response': attributes
        };
        console.log(this.filtersInfo);


        // generate product attributes
        typeInfo.attributes.forEach(attribute => {
            const attr = document.createElement('div'),
                title = document.createElement('h4'),
                values = document.createElement('ul');

            attr.className = 'characteristic';
            attr.appendChild(title);
            attr.appendChild(values)
            title.style.padding = '.5rem 0 0 0';
            container.appendChild(attr);
            title.appendChild(document.createTextNode(attribute.verbose_name));

            if (attribute.verbose_name !== 'price') {
                title.addEventListener('click', function (event) {
                    
                    filtersInfo.response.forEach(attribute => {
                    if (event.target.innerText === attribute.filter_group_name) {
                        for (let value of attribute.attributes){
                            const li = document.createElement('li');
                            li.appendChild(document.createTextNode(value));
                            values.appendChild(li);
               }

               console.log(attribute.filter_group_name, attribute.attributes);
           }
        });
                });
            // TODO: generate products attributes values & counts
            }
            else {
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
            }
        });

        // get prises for price filter
        let priceList = [];

        productsJSON.products.forEach(product => {
            // priceList.push(product.price);
            product.attributes.forEach(attribute => {
                if (attribute.verbose_name === 'price') {
                    priceList.push(Number(attribute.value));
                }
            });
        });
        new Filter().rangeSliderInit(priceList, productsJSON);
    }
}

window.addEventListener('load', new Filter().getProducts);
