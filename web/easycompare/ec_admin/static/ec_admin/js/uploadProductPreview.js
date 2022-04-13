import { getCookieByName } from './globals.js';


const productPreviewInput = document.getElementById('preview');
const previewImageDiv = document.getElementById('preview-image-container');

window.onload = function () {
    productPreviewInput.value = '';
}

productPreviewInput.addEventListener('change', uploadFile);

function uploadFile(e) {
    if (previewImageDiv.innerHTML) {
        // If user already uploaded and image and want to change it
        deleteUploadedImage();
    }

    let preview = productPreviewInput.files[0];
    let previewFormData = new FormData();
    previewFormData.append('preview', preview);

    let xhr = new XMLHttpRequest();
    let url = `${location.protocol}//${location.host}/api/images/`;

    xhr.open('POST', url, true);

    xhr.setRequestHeader('X-CSRFToken', getCookieByName('csrftoken'));

    xhr.onreadystatechange = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            let responseJson = JSON.parse(xhr.response);
            alert('Image URL: ' + responseJson.image_url, 'Image NAME: ' + responseJson.image_name);
            let image = document.createElement('img');
            image.src = responseJson.image_url;
            image.width = 300;
            image.height = 300;
            image.dataset.imageName = responseJson.image_name;
            previewImageDiv.appendChild(image);
        }
    };

    xhr.send(previewFormData);
}

function deleteUploadedImage() {
    let previewName = previewImageDiv.children[0].dataset.imageName;
    let xhr = new XMLHttpRequest();
    let url = `${location.protocol}//${location.host}/api/images/`;

    xhr.open('DELETE', url, true);

    xhr.setRequestHeader('X-CSRFToken', getCookieByName('csrftoken'));

    xhr.onreadystatechange = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            responseJson = JSON.parse(xhr.response);
            alert('Deleted Image Name: ' + responseJson.image_name);
        }
    };

    xhr.send(previewName);
    previewImageDiv.innerHTML = '';
}