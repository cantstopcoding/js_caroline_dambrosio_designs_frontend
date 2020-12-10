class Item {
    constructor(item, itemAttributes) {
        this.id = item.id
        this.name = itemAttributes.name
        this.price = itemAttributes.price
        this.description = itemAttributes.description
        this.image_url = itemAttributes.image_url
        this.category = itemAttributes.category
        this.reviews = itemAttributes.reviews.content //.map(review => review.content).join(' ')
        Item.all.push(this)
        console.log(this)
    }

    // getRequestForItems() {
    //     fetch(itemsApi)
    //     .then(response => response.json())
    //     .then(items => {
    //         items.data.forEach(item => {
    //             let newItem = new this(item, item.attributes);
    //             document.querySelector('#item-container').innerHTML += this.renderItemCard()
    //             newItem.reviewForm()
    //         });
    //     });
    // }

    renderItemCard() {
        // debugger source: https://www.youtube.com/watch?v=2xvuGWI3H58&t=349s 102:19
        return `
            <div id="item-${this.id}">
                <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                        <img src="${this.image_url}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${this.name}</h5>
                            <p class="card-text">${this.description}</p>
                            <p class="card-text">$${this.price}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                </div>
                                <small class="text-muted">Category: ${this.category.name}</small>
                            </div>
                        </div>

                        <p>
                            <button id="reviews-button" class="btn btn-sm btn-outline-secondary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                Reviews
                            </button>
                        </p>
                        <div class="collapse" id="collapseExample">
                            <div class="card card-body">
                                <form id="create-review-form">
                                    <div class="form-group">
                                        <label for="content">Write a Review...</label>
                                        <textarea class="form-control" id="input-content" name="content" rows="3"></textarea>
                                    </div>
                                    <button id="review-submit" class="btn btn-sm btn-outline-secondary" type="submit" value="Submit">Submit</button>
                                </form>
                                <div class="container" id="review-container">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `

        
        
        // return `
        // <div data-id=${this.id}>
        //     <img src=${this.image_url} height="200" width="250">
        //     <h3>${this.name}</h3>
        //     <h3>$${this.price}</h3>
        //     <h3>${this.description}</h3>
        //     <p>${this.category.name}</p>
        //     <button data-id=${this.id}>edit</button>
        // </div>
        // <br><br>`;
    }


    clickEvent() {
        document.querySelectorAll('#review-submit').forEach(rs => {
            rs.addEventListener("click", e => this.createReviewFormHandler(e))
        })
    }

    createReviewFormHandler(e) {
        e.preventDefault()
        console.log(e)
        // const contentInput = document.querySelector("input-content").value;
        // this.reviewPostFetch = (contentInput);
    }


}

Item.all = [];
// Item.all needs to be in global scope
// source: https://www.youtube.com/watch?v=oUiLxmgOvJ8&t=3288s 1:13:05

// work on static class and edit