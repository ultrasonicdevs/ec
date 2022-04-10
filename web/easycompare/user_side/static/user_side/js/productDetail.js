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
            attributes = document.createElement('ul');

        const bue = document.createElement('button');
        const compare = document.createElement('button');

        console.log(product)
        title.appendChild(document.createTextNode(product.name));
        image.src = product.preview_url;
        imgAttr.className = 'container';
        container.appendChild(title);
        container.appendChild(imgAttr);
        imgAttr.appendChild(imageContainer);
        imgAttr.appendChild(attrs);
        attrs.appendChild(btns);
        attrs.appendChild(attributes);
        imgAttr.appendChild(bue);
        imgAttr.appendChild(compare);
        imageContainer.appendChild(image);
        btns.appendChild(bue);
        btns.appendChild(compare);
        btns.className = 'btns';
        bue.appendChild(document.createTextNode("Добавить в корзину"));
        bue.className = 'bue';
        compare.appendChild(document.createTextNode("Добавить в список сравнения"));
        compare.className = 'compare'

        product.attributes.forEach( attribute => {
            const li = document.createElement('li'),
                attr = document.createElement('h4'),
                value = document.createElement('h4');
            li.appendChild(attr);
            li.appendChild(value);
            attr.appendChild(document.createTextNode(attribute.verbose_name));
            value.appendChild(document.createTextNode(attribute.value));
            attributes.appendChild(li);
        })
    }
}

window.addEventListener('load', new Details().renderView)