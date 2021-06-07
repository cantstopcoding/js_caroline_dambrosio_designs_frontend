document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is loaded!");
  getRequestForItems();

  const createItemForm = document.querySelector("#create-item-form");

  createItemForm.addEventListener("submit", (e) => {
    itemFormHandler(e);
    createItemForm.reset();
  });

  const itemContainer = document.querySelector("#item-container");

  itemContainer.addEventListener("click", (e) => {
    console.log(e.target.dataset.reviewSubmitId);

    if (e.target.dataset.reviewSubmitId) {
      reviewFormHandler(e);
    }

    if (e.target.dataset.deleteItemId) {
      deleteItem(e);
    }

    if (e.target.dataset.editItemDisplayId) {
      const id = parseInt(e.target.dataset.editItemDisplayId);
      const item = Item.findById(id);
      console.log(item);
    }

    console.log(e.target.dataset.reviewSubmitId);
    if (e.target.dataset.updateItemSubmitId) {
      updateFormHandler(e);
    }
  });
});

const updateFormHandler = (e) => {
  e.preventDefault();
  const form = e.target.parentElement;

  const name = form.querySelector("input").value;
  const description = form.description.value;
  const price = form.price.value;
  const image_url = form.image.value;
  const category_id = form.categories.value;

  const bodyData = { name, price, description, image_url, category_id };
  const itemsApi = new API();
  fetch(
    `http://localhost:3000/api/v1/items/${e.target.dataset.updateItemSubmitId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    }
  )
    .then((response) => response.json())
    .then((item) => {
      if (Array.isArray(item)) {
        alert(item.join(", "));
      } else {
        const itemData = item.data;
        let newItem = new Item(itemData, itemData.attributes);
        document.querySelector("#item-container").innerHTML +=
          newItem.renderItemCard();
      }
    });
};

const deleteItem = (e) => {
  e.preventDefault();
  fetch(`http://localhost:3000/api/v1/items/${e.target.dataset.deleteItemId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    Accept: "application/json",
  });
  e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
};

function getRequestForItems() {
  const itemsApi = new API();
  fetch(itemsApi.itemsUrl())
    .then((response) => response.json())
    .then((items) => {
      items.data.forEach((item) => {
        let newItem = new Item(item, item.attributes);
        document.querySelector("#item-container").innerHTML +=
          newItem.renderItemCard();

        document.querySelectorAll("#item-container").forEach((cont) => {
          let reviewsArr = item.attributes.reviews.map((r) => r);
          let filteredReviewsArr = reviewsArr.filter(
            (r) => r.item_id === parseInt(item.id)
          );
          const reviewContainer =
            cont.getElementsByClassName("container")[
              cont.getElementsByClassName("container").length - 1
            ];

          reviewContainer.innerHTML += `
                    ${filteredReviewsArr
                      .map(
                        (r) => `
                    ${newItem.renderReviewContent(r)}
                    `
                      )
                      .join("")}
                `;
        });
      });
    })
    .catch((err) => {
      console.log(err, "this is an error!!!");
    });
}

function reviewFormHandler(e) {
  e.preventDefault();
  console.log(e);
  const contentInput = document.querySelector(
    `#input-${e.target.dataset.reviewSubmitId}`
  ).value;
  reviewPostFetch(contentInput, e.target.dataset.reviewSubmitId);

  document.querySelector(`#input-${e.target.dataset.reviewSubmitId}`).value =
    "";
}

function reviewPostFetch(content, item_id) {
  const bodyData = { content, item_id };
  const reviewsApi = new API();
  fetch(reviewsApi.reviewsUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  })
    .then((response) => response.json())
    .then((review) => {
      if (Array.isArray(review)) {
        alert(review.join(", "));
      } else {
        const reviewData = review.data;
        let newReview = new Review(
          review.data.attributes.item,
          review.data.attributes.item,
          reviewData,
          reviewData.attributes
        );
        document.querySelector(
          `#review-container-${newReview.itemId}`
        ).innerHTML += newReview.renderReviewContent(newReview);
      }
    })
    .catch((err) => {
      console.log(err, "this is an error!!!");
    });
}

function itemFormHandler(e) {
  e.preventDefault();
  const nameInput = document.querySelector("#input-name").value;
  const priceInput = document.querySelector("#input-price").value;
  const descriptionInput = document.querySelector("#input-description").value;
  const imageInput = document.querySelector("#input-url").value;
  const categoryId = parseInt(document.querySelector("#categories").value);
  itemPostFetch(
    nameInput,
    priceInput,
    descriptionInput,
    imageInput,
    categoryId
  );
}

function itemPostFetch(name, price, description, image_url, category_id) {
  const bodyData = { name, price, description, image_url, category_id };
  const itemsApi = new API();
  fetch(itemsApi.itemsUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  })
    .then(function (response) {
      return response.json();
    })
    .then((item) => {
      if (Array.isArray(item)) {
        alert(item.join(", "));
      } else {
        const itemData = item.data;
        let newItem = new Item(itemData, itemData.attributes);
        document.querySelector("#item-container").innerHTML +=
          newItem.renderItemCard();
      }
    })
    .catch((err) => {
      console.log(err, "this is an error!!!");
    });
}
