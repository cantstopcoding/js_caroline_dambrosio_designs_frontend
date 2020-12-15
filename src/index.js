const itemsApi = "http://localhost:3000/api/v1/items"
const reviewsApi = "http://localhost:3000/api/v1/reviews"
const loginApi = "http://localhost:3000/api/v1/login"
const profileApi = "http://localhost:3000/api/v1/profile"


document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM is loaded!')
    getRequestForItems()

    const createItemForm = document.querySelector("#create-item-form");
    createItemForm.addEventListener("submit", (e) => createFormHandler(e));
    
   
    const loginForm = document.querySelector("#login-form");
    loginForm.addEventListener("submit", (e) => loginFormHandler(e));

    // let reviewSubmits = document.querySelectorAll('#review-submit')
    //     reviewSubmits.forEach(rs => {
    //         rs.addEventListener("submit", (e) => {
    //         e.preventDefault()
    //         console.log(e)
    //     })
    // })
});

function getRequestForItems() {
    fetch(itemsApi)
    .then(response => response.json())
    .then(items => {
        items.data.forEach(item => {
            let newItem = new Item(item, item.attributes);
            document.querySelector('#item-container').innerHTML += newItem.renderItemCard()

            document.querySelectorAll('#item-container').forEach(cont => {
                let reviewsArr = item.attributes.reviews.map(r => r);
                let filteredReviewsArr = reviewsArr.filter(r => r.item_id === parseInt(item.id))

                cont.getElementsByClassName('container')[cont.getElementsByClassName('container').length - 1].innerHTML += `
                <div class="album py-5 bg-light">
                    <div class="col-md-4">
                        ${filteredReviewsArr.map(r => r.content).join('<br>')}
                    </div>
                    <br>
                </div>    
                ` 
                const reviewButton = document.createElement('button')
                reviewButton.setAttribute('data-item-id', `${item.id}`)
                reviewButton.setAttribute('class', 'btn btn-sm btn-outline-secondary')
                reviewButton.setAttribute('type', 'submit')
                reviewButton.setAttribute('value', "Submit")

                document.querySelectorAll('#review-submit').forEach(rs => {
                    rs.addEventListener("click", e => {
                        // is there something i can do to not have the item end up in in item 3?
                        reviewFormHandler(e)
                    })
                })
            })


            function reviewFormHandler(e) {
                e.preventDefault()
                console.log(e)
                const contentInput = document.querySelector("#input-content").value;
                reviewPostFetch(contentInput, item.id);
            }

            // i have to match the review input to the item id the review should be rendered to the correct item
        });
    });
}

function reviewPostFetch(content, item_id) {
    const bodyData = {content, item_id}
    fetch(reviewsApi, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })          
    .then(response => response.json())
    .then(review => {
        const reviewData = review.data;
        let newReview = new Review(reviewData, reviewData.attributes);
        document.querySelector('#review-container').innerHTML += newReview.renderReviewContent()
    })
}
// reviewSubmit.addEventListener("submit", (e) => {
//     e.preventDefault()
//     console.log(e)
// });

// function createReviewFormHandler(e) {
//     e.preventDefault()
//     console.log(e)
// }

function loginFormHandler(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('#login-email').value
    const passwordInput = e.target.querySelector('#login-password').value
    loginFetch(emailInput, passwordInput)
    // console.log(e);
}

function loginFetch(email, password) {
    const bodyData = {user: { email, password }}

    fetch(loginApi, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(json => {
        localStorage.setItem('token', json.jwt)
        renderUserProfile()
    })
}

function renderUserProfile() {
    console.log(localStorage.getItem('token'));
    fetch(profileApi, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(json => {
      alert(`Hi ${json.user.data.attributes.first_name}!`)
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

// function createReviewFormHandler(e) {
//     e.preventDefault()
//     console.log(e);
    // const contentInput = document.querySelector("#input-content").value;
    // reviewPostFetch(content);
// }

function postFetch(name, price, description, image_url, category_id) {
    const bodyData = {name, price, description, image_url, category_id}
    
    fetch(itemsApi, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(item => {
        const itemData = item.data;
        let newItem = new Item(itemData, itemData.attributes);
        document.querySelector('#item-container').innerHTML += newItem.renderItemCard()
    });
}




