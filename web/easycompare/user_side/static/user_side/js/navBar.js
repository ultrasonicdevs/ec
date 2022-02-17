const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {

    const searchParams = document.querySelector('.search-parameters'),
        content = document.querySelector('.content');

    if (searchParams.style.display === 'none') {
        searchParams.style.opacity = '0';

        setTimeout(() => {
            content.style.filter = 'blur(1rem)';
            searchParams.style.display = 'flex';
            searchParams.style.opacity = '1';
        })
    }
    else {
        searchParams.style.opacity = '0'
        setTimeout(() =>{
            searchParams.style.display = 'none'
            content.style.filter = 'none'
        });
    }
    //TODO changing img when you click on the button
});
    //TODO del first option when you click on the select