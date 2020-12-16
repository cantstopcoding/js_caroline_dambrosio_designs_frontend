class Review {
    constructor(reviewData, reviewAttributes) {
        this.id = reviewData.id
        this.content = reviewAttributes.content
        this.itemId = reviewAttributes.item_id
        Review.all.push(this)
    }
    
    renderReviewContent() {
        return `
            ${this.content}<br>
        `
    }
}

Review.all = [];