const itemsApi = "http://localhost:3000/api/v1/items"

document.addEventListener('DOMContentLoaded', () => {
    getRequestForItems()

    const createItemForm = document.querySelector("#create-item-form");

    createItemForm.addEventListener("submit", (e) => createFormHandler(e));
});

function getRequestForItems() {
    fetch(itemsApi)
    .then(response => response.json())
    .then(items => {
        items.data.forEach(item => {
            // debugger source: https://www.youtube.com/watch?v=2xvuGWI3H58&t=349s 102:19
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

function createFormHandler(e) {
    e.preventDefault();
    const nameInput = document.querySelector("#input-name").value;
    const priceInput = document.querySelector("#input-price").value;
    const descriptionInput = document.querySelector("#input-description").value;
    const urlInput = document.querySelector("#input-url").value;
    const categoryId = parseInt(document.querySelector("#categories").value);
}