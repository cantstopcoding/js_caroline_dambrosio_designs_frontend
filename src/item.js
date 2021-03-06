class Item {
  constructor(item, itemAttributes) {
    this.id = item.id;
    this.name = itemAttributes.name;
    this.price = itemAttributes.price;
    this.description = itemAttributes.description;
    this.image_url = itemAttributes.image_url;
    this.category = itemAttributes.category;
    Item.all.push(this);
    console.log(this);
  }

  static findById(id) {
    return this.all.find((item) => {
      return parseInt(item.id) === id;
    });
  }

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
                    <button data-edit-item-display-id=${this.id} type="button" class="btn btn-sm btn-outline-secondary" data-toggle="collapse" data-target="#collapseUpdateForm-${this.id}" aria-expanded="false" aria-controls="collapseUpdateForm-${this.id}">Edit</button>
                    <button data-delete-item-id=${this.id} type="button" class="btn btn-sm btn-outline-secondary">Delete</button>
                  </div>
                  <small class="text-muted">Category: ${this.category.name}</small> 
                </div>
              </div>
              <p>	                        
                <button id="reviews-button" class="btn btn-sm btn-outline-secondary" type="button" data-toggle="collapse" data-target="#collapseExample-${this.id}" aria-expanded="false" aria-controls="collapseExample-${this.id}">	                        
                  Reviews	
                </button>	
              </p>

              <div class="collapse" id="collapseExample-${this.id}">
                <div class="card card-body">
                  <form id="create-review-form">
                    <div class="form-group">
                      <label for="content">Write a Review...</label>
                      <textarea class="form-control" id="input-${this.id}" name="content" value="" rows="3"></textarea>
                    </div>
                    <button data-review-submit-id="${this.id}" class="btn btn-sm btn-outline-secondary" type="submit" value="Submit">Submit</button>
                  </form>
                  <div class="container" id="review-container-${this.id}">
                      
                  </div>
                </div>
              </div>

            

            </div>
          </div>
        </div>
      `;
  }

  renderReviewContent(review) {
    return `
      <br>
      <div class="card border-dark mb-3" style="max-width: 18rem;">
        <div class="card-header">Review Posted ${review.created_at}</div>
        <div class="card-body text-dark">
          <h6 class="card-title">${review.content}</h6>
          <p class="card-text"></p>
        </div>
      </div>
    `;
  }
}

Item.all = [];
// Item.all needs to be in global scope
// source: https://www.youtube.com/watch?v=oUiLxmgOvJ8&t=3288s 1:13:05

// work on static class and edit
