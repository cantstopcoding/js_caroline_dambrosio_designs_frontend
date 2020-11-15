const itemApi = "http://localhost:3000/api/v1/items"

document.addEventListener('DOMContentLoaded', () => {
    fetchItems()
});

function fetchItems() {
    fetch(itemApi)
    .then(response => response.json())
    .then(items => {
        console.log(items);
    });
}