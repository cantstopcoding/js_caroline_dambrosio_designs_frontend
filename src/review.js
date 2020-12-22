class Review {
    constructor(reviewData, reviewAttributes) {
        this.id = reviewData.id
        this.content = reviewAttributes.content
        this.itemId = reviewAttributes.item_id
        this.createdAt = reviewAttributes.created_at
        Review.all.push(this)
    }
    
    renderReviewContent(review) {
        return `
        <br>
        <div class="card border-dark mb-3" style="max-width: 18rem;">
            <div class="card-header">Review Posted ${review.createdAt}</div>
            <div class="card-body text-dark">
                <h6 class="card-title">${review.content}</h6>
                <p class="card-text"></p>
            </div>
        </div>
        `
    }
}

Review.all = [];