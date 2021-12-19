import { baseUrl } from "../settings/api.js";

// retrieve items from local storage
let bag = [];
if (JSON.parse(localStorage.getItem("shoppingBag"))) {
  bag = JSON.parse(localStorage.getItem("shoppingBag"));
}

const productsContainer = document.querySelector(".bag__products");

function loadItems(bag) {
  productsContainer.innerHTML = "";
  for (let i = 0; bag.length > i; i++) {
    productsContainer.innerHTML += `<div class="row w-100 gx-0 mb-3">
    <div class="col image__container">
    <img src="${baseUrl}${bag[i].image.formats.large.url}" alt="" />
    </div>
    <div class="headings col">
    <a class="lead" href="product.html?product=${bag[i].id}">${bag[i].title}</a>
        <p>${bag[i].price} NOK</p>
            </div>
    <div class="col button__container"><button data-id="${bag[i].id}">X</button></div>
</div>`;
  }

  const buttons = document.querySelectorAll(".button__container button");
  buttons.forEach((button) => {
    button.addEventListener("click", removeProduct);
  });
}

function removeProduct(e) {
  const filter = bag.filter(
    (product) => product.id !== parseInt(e.target.dataset.id)
  );

  bag = filter;

  localStorage.setItem("shoppingBag", JSON.stringify(bag));
  loadItems(bag);
}

loadItems(bag);
