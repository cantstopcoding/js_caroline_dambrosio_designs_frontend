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
                
                // let reviewContainer = cont.getElementsByClassName('container')[cont.getElementsByClassName('container').length - 1]
                
                // const borderEl = document.createElement('div')
                // borderEl.setAttribute('class', 'card border-dark mb-3')
                
                // const cardHeader = document.createElement('div');
                // cardHeader.setAttribute('class', 'card-header')
                // cardHeader.innerHTML = "Review Posted..."

                // textDark = document.createElement('div');
                // textDark.setAttribute('class', 'card-body text-dark')
                
                // cardContent = document.createElement('h6');
                // cardContent.setAttribute('class', 'card-title')

                // reviewContainer.appendChild(borderEl)
                // borderEl.appendChild(cardHeader)
                // borderEl.appendChild(textDark)
                // textDark.appendChild(cardContent)


            // <div class="card border-dark mb-3" style="max-width: 18rem;">
            //     <div class="card-header">Review Posted...</div>
            //     <div class="card-body text-dark">
            //         <h6 class="card-title">${r.content}</h6>
            //         <p class="card-text"></p>
            //     </div>
            // </div>

            // I need to somehow go to each review and make it a card and attach it to the container

                debugger
                cont.getElementsByClassName('container')[cont.getElementsByClassName('container').length - 1].innerHTML += `
                    ${filteredReviewsArr.map(r => `
                    <br>
                    <div class="card border-dark mb-3" style="max-width: 18rem;">
                        <div class="card-header">Review Posted...</div>
                        <div class="card-body text-dark">
                            <h6 class="card-title">${r.content}</h6>
                            <p class="card-text"></p>
                        </div>
                    </div>
                    `).join('<br>')}
                `   

                const reviewForm = document.createElement('form')
                reviewForm.setAttribute('data-review-form-id', `${item.id}`)
                
                // const formGroup = document.createElement('div')  
                // formGroup.setAttribute('class', 'form-group')
                
                // const contentLabel = document.createElement('label')
                // contentLabel.setAttribute('for', 'content')
                // contentLabel.innerHTML = "Write a Review..."

                // const reviewInput = document.createElement('textarea')
                // reviewInput.setAttribute('class', 'form-control')
                // reviewInput.setAttribute('id', 'input-content')
                // reviewInput.setAttribute('name', 'content')
                // reviewInput.setAttribute('value', "")
                // reviewInput.setAttribute('rows', '3')

                // // <textarea class="form-control" id="input-content" name="content" value="" rows="3"></textarea>
                
                const reviewButton = document.createElement('button')
                reviewButton.setAttribute('data-button-id', `${item.id}`)
                reviewButton.setAttribute('class', 'btn btn-sm btn-outline-secondary')
                reviewButton.setAttribute('type', 'submit')
                reviewButton.setAttribute('value', "Submit")
                reviewButton.innerHTML = "Submit"

                // const reviewCardBody = document.querySelector('.card.card-body')
                
                // formGroup.appendChild(contentLabel)
                // formGroup.appendChild(reviewInput)
                // reviewForm.appendChild(formGroup)
                reviewForm.appendChild(reviewButton)
                // reviewCardBody.appendChild(reviewForm)

                reviewButton.addEventListener("click", e => {
                    e.preventDefault()
                    console.log(e)
                })

                document.querySelectorAll(".card.card-body").forEach(cb => {
                    cb.getElementsByTagName('button')[cb.getElementsByTagName('button').length - 1].addEventListener("click", e => {
                            reviewFormHandler(e)
                        })
                    })
            })


            function reviewFormHandler(e) {
                e.preventDefault()
                console.log(e)
                const contentInput = document.querySelector(`#input-${e.target.dataset.itemId}`).value
                reviewPostFetch(contentInput, e.target.dataset.itemId);
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
        document.querySelector(`#review-container-${newReview.itemId}`).innerHTML += newReview.renderReviewContent()
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