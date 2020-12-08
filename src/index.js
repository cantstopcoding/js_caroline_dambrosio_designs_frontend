const itemsApi = "http://localhost:3000/api/v1/items"
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
            // reviewsArr = [].push(review)
            // how do I get the reviews

            document.querySelectorAll('#item-container').forEach(cont => {
                let reviewsArr = item.attributes.reviews.map(r => r);
                let filteredReviewsArr = reviewsArr.filter(r => r.item_id === parseInt(item.id))
                // debugger
                // how do i access the item id
                // how do i acccess item-1
                // item = 'item-1'
                // document.querySelector(#item-${item.id})
                // parseInt(item.split('').pop())

                // how do i put only the review that belongs to the item into that item's review container?

                
                // I'm thinking I can create a div with an item-id and attach the review to that id
                // Make some kind of conditonal where if the item-id is equal to the reviews.item_id then the
                    // reviews.content will be added to the inner html of the #revied-container 

                    // if item-id equals reviews.item_id
                        // add reviews.content to cont.innerHTML
                    // end

                    // filteredReviewsArray = reviewsArray.filter( r => r.item_id === item-id )
                    // returns [review, review, review]
                    // cont.innerHtml += filteredReviewsArray.join() <br>



                cont.getElementsByClassName('container')[cont.getElementsByClassName('container').length - 1].innerHTML += `
                <div class="album py-5 bg-light">
                    <div class="col-md-4">
                        ${filteredReviewsArr.map(r => r.content).join('<br>')}
                    </div>
                    <br>
                </div>    
                ` 
            })
        });
    });
}

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


// function reviewPostFetch(content) {
//     const bodyData = {content}
    
//     fetch(itemsApi, {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(bodyData)
//     })
//     .then(response => response.json())
//     .then(item => {
//         const itemData = item.data;
//         let newItem = new Item(itemData, itemData.attributes);
//         document.querySelector('#review-container').innerHTML += newItem.renderReview()
//     });
// }
