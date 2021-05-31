class Item {
  constructor(item, itemAttributes) {
    this.id = item.id;
    this.name = itemAttributes.name;
    this.price = itemAttributes.price;
    this.description = itemAttributes.description;
    this.imageUrl = itemAttributes.image_url;
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
                        <img src="${this.imageUrl}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${this.name}</h5>
                            <p class="card-text">${this.description}</p>
                            <p class="card-text">$${this.price}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                    <button data-id=${this.id} type="button" class="btn btn-sm btn-outline-secondary" data-toggle="collapse" data-target="#collapseUpdateForm-${this.id}" aria-expanded="false" aria-controls="collapseUpdateForm-${this.id}">Edit</button>                       
                                </div>
                                <small class="text-muted">Category: ${this.category.name}</small>
                            </div>
                        </div>
                        <p>	                        
                            <button id="reviews-button" class="btn btn-sm btn-outline-secondary" type="button" data-toggle="collapse" data-target="#collapseReviews-${this.id}" aria-expanded="false" aria-controls="collapseReviews-${this.id}">	                        
                                Reviews	
                            </button>	
                        </p>

                        
                        
                      

                        <div class="collapse" id="collapseUpdateForm-${this.id}">
                          <div class="card card-body">
                            <div id="update-item"></div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  // REVIEW BUTTON FOR LATER
  //   <div class="collapse" id="collapseReviews-${this.id}">
  //   <div class="card card-body">
  //     <form id="create-review-form">
  //       <div class="form-group">
  //         <label for="content">Write a Review...</label>
  //         <textarea class="form-control" id="input-${this.id}" name="content" value="" rows="3"></textarea>
  //       </div>
  //       <button data-item-id="${this.id}" class="btn btn-sm btn-outline-secondary" type="submit" value="Submit">Submit</button>
  //     </form>
  //     <div class="container" id="review-container-${this.id}"> </div>
  //   </div>
  // </div>

  renderUpdateForm() {
    return `
    <form id="create-item-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="input-name" type="text" name="name" value="${this.name}" placeholder="Enter your Item name..." class="form-control"> <!-- aria-describedby="nameHelp" -->
      </div>
      <div class="form-group">
          <label for="description">Description:</label>
          <textarea id='input-description' name="description" class="form-control"  rows="8" cols="80" value="${this.description}" placeholder="Enter your Item description..."></textarea></textarea>
      </div>
      <div class="form-group">
          <label for="price">Price:</label>
          <input id="input-price" type="number" name="price" value="${this.price}" placeholder="Enter your Item price..." class="form-control"> <!-- aria-describedby="nameHelp" -->
      </div>
      <div class="form-group">
          <label for="image">Image Url:</label>
          <input id='input-url' type="text" name="image" value="${this.imageUrl}" placeholder="Enter Item Image URL..." class="form-control"> <!-- aria-describedby="nameHelp" -->
      </div>
      <div class="form-group">  
      <!-- <label for="categories">Category</label> -->
      <label for="categories">Category:</label>  
      <select id="categories" class="form-control" value="${this.category.name}">
              <option value="1">Dresses</option>
              <option value="2">Purses</option>
              <option value="3">Sandles</option>
          </select>
      </div>
      <input id='edit-button' type="submit" name="submit" value="Edit Item" class="btn btn-primary">
    </form>
    `;
  }

  clickEventForAllReviews() {
    document.querySelectorAll(".card.card-body").forEach((cb) => {
      debugger;
      const reviewSubmitButton =
        cb.getElementsByTagName("button")[
          cb.getElementsByTagName("button").length - 1
        ];

      reviewSubmitButton.addEventListener("click", (e) => {
        reviewFormHandler(e);
      });
    });
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
