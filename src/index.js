document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM is loaded!')
    getRequestForItems()

    const createItemForm = document.querySelector("#create-item-form");
    createItemForm.addEventListener("submit", (e) => {
        createFormHandler(e)
        createItemForm.reset()
    });
    
   
    const loginForm = document.querySelector("#login-form");
    loginForm.addEventListener("submit", (e) => loginFormHandler(e));
});

function getRequestForItems() {
    const itemsApi = new API
    fetch(itemsApi.itemsUrl())
    .then(response => response.json())
    .then(items => {
        items.data.forEach(item => {
            let newItem = new Item(item, item.attributes);
            document.querySelector('#item-container').innerHTML += newItem.renderItemCard()

            document.querySelectorAll('#item-container').forEach(cont => {
                let reviewsArr = item.attributes.reviews.map(r => r);
                let filteredReviewsArr = reviewsArr.filter(r => r.item_id === parseInt(item.id))
                const reviewContainer = cont.getElementsByClassName('container')[cont.getElementsByClassName('container').length - 1]
                
                reviewContainer.innerHTML += `
                    ${filteredReviewsArr.map(r => `
                    <br>
                    <div class="card border-dark mb-3" style="max-width: 18rem;">
                        <div class="card-header">Review Posted ${r.created_at}</div>
                        <div class="card-body text-dark">
                            <h6 class="card-title">${r.content}</h6>
                            <p class="card-text"></p>
                        </div>
                    </div>
                    `).join('')}
                `   

                newItem.clickEventForAllReviews()
            })
        });
    });
}

function reviewFormHandler(e) {
    e.preventDefault()
    console.log(e)
    const contentInput = document.querySelector(`#input-${e.target.dataset.itemId}`).value
    reviewPostFetch(contentInput, e.target.dataset.itemId); 
    
    document.querySelector(`#input-${e.target.dataset.itemId}`).value = ""                                                                             
}

function reviewPostFetch(content, item_id) {
    const bodyData = {content, item_id}
    const reviewsApi = new API
    fetch(reviewsApi.reviewsUrl(), {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })          
    .then(response => response.json())
    .then(review => {
        const reviewData = review.data;
        let newReview = new Review(reviewData, reviewData.attributes);
        document.querySelector(`#review-container-${newReview.itemId}`).innerHTML += newReview.renderReviewContent()
    })
}

function createFormHandler(e) {
    e.preventDefault();
    const nameInput = document.querySelector("#input-name").value;
    const priceInput = document.querySelector("#input-price").value;
    const descriptionInput = document.querySelector("#input-description").value;
    const imageInput = document.querySelector("#input-url").value;
    const categoryId = parseInt(document.querySelector("#categories").value);
    postFetch(nameInput, priceInput, descriptionInput, imageInput, categoryId);
}

function postFetch(name, price, description, image_url, category_id) {
    const bodyData = {name, price, description, image_url, category_id}
    const itemsApi = new API
    fetch(itemsApi.itemsUrl(), {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(item => {
        const itemData = item.data;
        let newItem = new Item(itemData, itemData.attributes);
        document.querySelector('#item-container').innerHTML += newItem.renderItemCard()
        // can i add event listener once new item is appended to dom
        newItem.clickEventForAllReviews()
    });
}


// function loginFormHandler(e) {
//     e.preventDefault();
//     const emailInput = e.target.querySelector('#login-email').value
//     const passwordInput = e.target.querySelector('#login-password').value
//     loginFetch(emailInput, passwordInput)
// }

// function loginFetch(email, password) {
//     const bodyData = {user: { email, password }}

//     fetch(loginApi, {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(bodyData)
//     })
//     .then(response => response.json())
//     .then(json => {
//         localStorage.setItem('token', json.jwt)
//         renderUserProfile()
//     })
// }

// function renderUserProfile() {
//     console.log(localStorage.getItem('token'));
//     fetch(profileApi, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     })
//     .then(response => response.json())
//     .then(json => {
//       alert(`Hi ${json.user.data.attributes.first_name}!`)
//     })
// }

