class Item {
    constructor(item, itemAttributes) {
        this.id = item.id
        this.name = itemAttributes.name
        this.price = itemAttributes.price
        this.description = itemAttributes.description
        this.image_url = itemAttributes.image_url
        this.category = itemAttributes.category
        Item.all.push(this)
    }
}

Item.all = [];