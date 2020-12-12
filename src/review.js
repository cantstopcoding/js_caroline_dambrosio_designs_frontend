class Review {
    constructor(reviewData, reviewAttributes) {
        this.id = reviewData.id
        this.content = reviewAttributes.content
        this.itemId = reviewAttributes.item_id
    }
    
    renderReviewContent() {
        return `

        `
    }
}

Item.all = [];