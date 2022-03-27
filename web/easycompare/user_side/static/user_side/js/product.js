class productCard extends Block{
    async displayCards() {
        const typeID = document.URL.replace(`${location.protocol}//${location.host}/`, ''),
            typeInfo = await new Block().getJSON(`${location.protocol}//${location.host}/api/product-types/${typeID}`, "GET", null),
            productsJSON = await new Block().getJSON(`${location.protocol}//${location.host}/api/product-types/${typeID}products/`, "GET", null),
            productsContainer = document.querySelector('#products');
        document.title = `${typeInfo.name} | Easy Compare`;

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
        });
    }
}


window.addEventListener('load', new productCard().displayCards)