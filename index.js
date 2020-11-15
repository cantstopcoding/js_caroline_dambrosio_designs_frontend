const itemsApi = "http://localhost:3000/api/v1/items"

document.addEventListener('DOMContentLoaded', () => {
    getRequestForItems()
});

function getRequestForItems() {
    fetch(itemsApi)
    .then(response => response.json())
    .then(items => {
        items.data.forEach(item => {
            const itemMarkup = `
            <div data-id=${item.id}>
                <img src=${item.attributes.image_url} height="200" width="250">
                <h3>${item.attributes.name}</h3>
                <h3>${item.attributes.price}</h3>
                <h3>${item.attributes.description}</h3>
                <p>${item.attributes.category.name}</p>
                <button data-id=${item.id}>edit</button>
            </div>
            <br><br>`;

            document.querySelector('#item-container').innerHTML += itemMarkup
        });
    });
}