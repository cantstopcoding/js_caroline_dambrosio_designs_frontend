class Review extends Item {
    constructor(item, itemAttributes, reviewData, reviewAttributes) {
        super(item, itemAttributes)
        this.id = reviewData.id
        this.content = reviewAttributes.content
        this.itemId = reviewAttributes.item_id
        this.created_at = reviewAttributes.created_at
        Review.all.push(this)
    }
}

Review.all = [];