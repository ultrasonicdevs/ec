const productPreviewInput = document.getElementById('preview');

productPreviewInput.addEventListener('change', uploadFile)

function uploadFile(e) {
    let preview = productPreviewInput.files[0];
    let previewFormData = new FormData();
    previewFormData.append('preview', preview);
    const csrftoken = getCookieByName('csrftoken');

    let xhr = new XMLHttpRequest();
    let url = 'http://localhost:8000/api/images/';

    xhr.open('POST', url, true);

    xhr.setRequestHeader('X-CSRFToken', csrftoken);

    xhr.onreadystatechange = function () {
        const DONE = 4;
        const SUCCESS = 200;
        let requestCompleted = (xhr.readyState === DONE) && (xhr.status === SUCCESS);
        if (requestCompleted) {
            responseJson = JSON.parse(xhr.response);
            alert(responseJson.image_url);
            image = document.createElement('img');
            image.src = responseJson.image_url;
            document.getElementById('preview-image-container').appendChild(image);
        }
    };

    xhr.send(previewFormData);
}