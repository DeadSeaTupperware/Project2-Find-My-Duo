const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

function handleSubmit(event) {
    event.preventDefault();
    console.log('form submitted');
    const searchTerm = searchInput.value;
    window.location.href=`/search?q=${searchTerm}`;
}
searchForm.addEventListener('submit', handleSubmit)