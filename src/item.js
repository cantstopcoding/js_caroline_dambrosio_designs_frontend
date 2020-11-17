class Item {
    constructor(item, itemAttributes) {
        this.id = item.id
        this.name = itemAttributes.name
        this.price = itemAttributes.price
        this.description = itemAttributes.description
        this.image_url = itemAttributes.image_url
        this.category = itemAttributes.category
        Item.all.push(this)
        console.log(this)
    }

    renderItemCard() {
        // debugger source: https://www.youtube.com/watch?v=2xvuGWI3H58&t=349s 102:19
        return `
        <div data-id=${this.id}>
            <img src=${this.image_url} height="200" width="250">
            <h3>${this.name}</h3>
            <h3>$${this.price}</h3>
            <h3>${this.description}</h3>
            <p>${this.category.name}</p>
            <button data-id=${this.id}>edit</button>
        </div>
        <br><br>`;
    }
}

Item.all = [];
// Item.all needs to be in global scope
// source: https://www.youtube.com/watch?v=oUiLxmgOvJ8&t=3288s 1:13:05

// work on static class and edit