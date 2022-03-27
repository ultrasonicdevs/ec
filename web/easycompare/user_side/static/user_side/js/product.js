class productCard {

    async displayCards() {
        const typeID = document.URL.replace(`${location.protocol}//${location.host}/`, '');
        console.log(typeID);

        const productsJSON = await new Block().getJSON(`${location.protocol}//${location.host}/api/product-types/${typeID}products/`, "GET", null);
        console.log(productsJSON);
        const productsContainer = document.querySelector('#products');
        for(let product of productsJSON.products) {
            const cardContainer = document.createElement('div'),
                image = document.createElement('img'),
                description = document.createElement('div'),
                manufacturer = document.createElement('h5'),
                name = document.createElement('h4'),
                price = document.createElement('h5');

            cardContainer.className = 'container';
            image.className = 'product-image';
            // img.href = '#';
            description.className = 'description';
            manufacturer.className = 'manufacturer';
            // manufacturer.appendChild(document.createTextNode(product.))
            name.className = 'product-name';
            name.appendChild(document.createTextNode(product.name));
            price.className = 'price';
            // price.appendChild(document.createTextNode(product.price));
            cardContainer.appendChild(image);
            cardContainer.appendChild(description);
            description.appendChild(manufacturer);
            description.appendChild(name);
            description.appendChild(price);
            productsContainer.appendChild(cardContainer);
        }
    }
}


window.addEventListener('load', new productCard().displayCards)