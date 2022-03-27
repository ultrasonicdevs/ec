class Filter extends Block {
    checkPrice(inputs, productJSON) {
        let productsArray = [];
        productJSON.forEach(product =>{
            product.attributes.forEach(attribute => {
                if (attribute.verbose_name === 'price') {
                    if (Number(attribute.value) > inputs[0] && Number(attribute.value) < inputs[1]){
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
        });
        inputMin.addEventListener('change', function () {
            range.noUiSlider.set([this.value, null]);
            new Filter().checkPrice(productsJSON);
        });
        inputMax.addEventListener('change', function () {
            range.noUiSlider.set([null, this.value]);
            new Filter().checkPrice(productsJSON);
        });
    }


    async getProducts() {
        const typeID = document.URL.replace(`${location.protocol}//${location.host}/`, ''),
            typeInfo = await new Filter().getJSON(`${location.protocol}//${location.host}/api/product-types/${typeID}`, "GET", null),
            productsJSON = await new Filter().getJSON(`${location.protocol}//${location.host}/api/product-types/${typeID}products/`, "GET", null);
        document.title = `${typeInfo.name} | Easy Compare`;
        console.log(productsJSON);
        new Filter().displayCards(productsJSON);
    }


    displayCards(productsJSON) {
        let priceList = [];
        const productsContainer = document.querySelector('#products');
        productsContainer.innerHTML = ''
        productsJSON.products.forEach(product => {
            console.log(product.preview_url)
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
            // manufacturer.appendChild(document.createTextNode(product.manufacturer))
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
                    priceList.push(Number(attribute.value));
                }
                if (attribute.verbose_name === 'manufacturer') {
                    manufacturer.appendChild(document.createTextNode(attribute.value));
                }
            });
        });
        console.log(priceList);
        new Filter().rangeSliderInit(priceList, productsJSON);
    }
}

window.addEventListener('load', new Filter().getProducts);