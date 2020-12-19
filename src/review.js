class Review {
    constructor(reviewData, reviewAttributes) {
        this.id = reviewData.id
        this.content = reviewAttributes.content
        this.itemId = reviewAttributes.item_id
        Review.all.push(this)
    }
    
    renderReviewContent() {
        return `
        <br>
        <div class="card border-dark mb-3" style="max-width: 18rem;">
            <div class="card-header">Review Posted...</div>
            <div class="card-body text-dark">
                <h6 class="card-title">${this.content}</h6>
                <p class="card-text"></p>
            </div>
        </div>
        `
    }
        

}

Review.all = [];