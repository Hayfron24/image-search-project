const accessKey = 'aHi83U0h99oThU_mpLAYaUTlVfJS1GdTL90dRU6pPkI';

const formEl = document.querySelector('form');
const inputEl = document.getElementById('search-input');
const searchBtnEl = document.getElementById('search-btn');

const searchResults = document.querySelector('.search-results');

const showMoreBtn = document.getElementById('show-more-btn');

let inputData = '';
let pageNumber = 1;

const searchImages = async () =>{
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${inputData}&client_id=${accessKey}`;

    const respose = await fetch(url);
    const data = await respose.json();

    const results = data.results;

    if (pageNumber === 1){
        searchResults.innerHTML ='';
    }

    results.map((result) =>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result');

        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.textContent = result.alt_description;

        imageWrapper.append(image, imageLink);
        searchResults.append(imageWrapper);
    })

    pageNumber++;
    if (pageNumber > 1){
        showMoreBtn.style.display = 'block';
    }
}

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    pageNumber = 1;
    searchImages();
});
showMoreBtn.addEventListener('click', () => {
    searchImages();
});