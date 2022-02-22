/*
function sendRequest(method, url, body) {
    const xhr = new XMLHttpRequest()


    xhr.open(method, url, body)
    xhr.send()

}*/

const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {

    const searchPanel = document.querySelector('.search-panel'),
        content = document.querySelector('.content');

    let searchForm = `
        <form action="" method="get" class="form">
            <div class="sections">
                <h2 class="search-block-header">Раздел</h2>
                <select name="select-section" id="select-section">
                    <option value="">Выбкрите раздел</option>`

                    // TODO load all sections
    // sendRequest("GET", 'http://localhost:8000/ec-admin/add-section/get-parent-sections/',null)

    const url = 'http://localhost:8000/ec-admin/add-section/get-parent-sections/'
    fetch(url, {headers:{ 'Access-Control-Allow-Origin': '*'}}).then(response => response.json()).then(data => console.log(data));

    searchForm +=`
                </select>
            </div>
            <div class="categories">
                <h2 class="search-block-header">Категория</h2>
                <select name="select-category" id="select-category">
                    <option value="">Выбкрите категорию</option>`

                    // TODO load all categories
    searchForm += `
                </select>
            </div>
            <button class="submit" type="submit">Применить</button>
        </form>`

    if (searchPanel.style.display === 'none') {
         searchPanel.innerHTML = searchForm
        searchPanel.style.opacity = '0'

        setTimeout(() => {
            content.style.filter = 'blur(1rem)';
            searchPanel.style.display = 'flex';
            searchPanel.style.opacity = '1';
        })
    }
    else {
        searchPanel.style.opacity = '0'
        setTimeout(() =>{
            searchPanel.style.display = 'none'
            content.style.filter = 'none'

        });
        const delForm = document.querySelector('.form')
        delForm.remove()
    }
    //TODO changing img when you click on the button
});
    //TODO del first option when you click on the select

