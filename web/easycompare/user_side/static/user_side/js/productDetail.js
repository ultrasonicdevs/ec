class Details extends Block {
    async renderView() {
        let productID = document.URL.replace(`${location.protocol}//${location.host}/`, '');
        productID = productID.replace(/\w{24}\//i, '');

        const product = await new Details().getJSON(`${location.protocol}//${location.host}/api/products/${productID}`),
            container = document.querySelector('#product-detail'),
            title = document.createElement('h1'),
            imageContainer = document.createElement('figure'),
            image = document.createElement('img'),
            imgAttr = document.createElement('div'),
            btns = document.createElement('div'),
            attrs = document.createElement('div'),
            characteristics = document.createElement('h4'),
            attributes = document.createElement('ul'),
            priceDiv = document.createElement('div'),
            priceNum = document.createElement('h2'),
            priceText = document.createElement('h4');


        const bue = document.createElement('button');
        const compare = document.createElement('button');

        document.title = `${product.name} | Easy Compare`;

        console.log(product)
        title.appendChild(document.createTextNode(product.name));
        image.src = product.preview_url;
        imgAttr.className = 'container';
        container.appendChild(title);
        container.appendChild(imgAttr);
        imgAttr.appendChild(imageContainer);
        imgAttr.appendChild(attrs);
        attrs.appendChild(priceDiv);
        attrs.appendChild(characteristics);
        characteristics.appendChild(document.createTextNode('Характеристики'));
        attrs.appendChild(attributes);
        attrs.appendChild(btns);
        imgAttr.appendChild(bue);
        imgAttr.appendChild(compare);
        imageContainer.appendChild(image);
        priceDiv.appendChild(priceText);
        priceDiv.appendChild(priceNum);
        priceText.appendChild(document.createTextNode("Цена"));

        characteristics.style.marginBottom = "1rem"

        product.attributes.forEach( attribute => {
            if (attribute.verbose_name !== "Цена") {
                const li = document.createElement('li'),
                    attr = document.createElement('h4'),
                    value = document.createElement('h4');
                li.appendChild(attr);
                li.appendChild(value);
                attr.appendChild(document.createTextNode(attribute.verbose_name));
                value.appendChild(document.createTextNode(attribute.value));
                attributes.appendChild(li);
            } else {
                priceNum.appendChild(document.createTextNode(attribute.value));
                priceNum.style.margin = "1rem 0 2rem 0";
            }
        });
        btns.appendChild(bue);
        btns.appendChild(compare);
        btns.className = 'btns';
        bue.appendChild(document.createTextNode("Добавить в корзину"));
        compare.appendChild(document.createTextNode("Добавить в список сравнения"));
    }
}


window.addEventListener('load', new Details().renderView)