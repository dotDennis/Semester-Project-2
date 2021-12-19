import { baseUrl } from "../settings/api.js";
import { ID } from "../settings/param.js";

// redirect if id = null
if (!ID) {
  location.href = "/";
}

let storeItem = "";
const productContainer = document.querySelector(".container__product .row");
const bag = JSON.parse(localStorage.getItem("shoppingBag"));

async function createIndex() {
  try {
    // await response then await json

    const response = await fetch(baseUrl + "/products?id=" + ID);
    const json = await response.json();

    let featured = "";

    if (json[0].featured) {
      featured = `
          <span class="badge badge-pill carousel__badge"><span class="material-icons">
          star
          </span></span>
          `;
    }

    productContainer.innerHTML = `  <div class="col-12 col-lg-6">
                                        <div class="product__image">
                                            <img class="img-fluid" src="${baseUrl}${json[0].image.formats.large.url}"/>
                                            ${featured}
                                            </div>
                                    </div>
                                    <div class="col-12 col-lg-6 d-flex flex-column">
                                            <h1 class="title">${json[0].title}</h1>
                                            <h2 class="mb-5 price">${json[0].price} NOK</h2>
                                            <p class="mt-5 mb-5">${json[0].description}</p>
                                            <button class="btn  product__btn" data-product="${json[0].id}">add to bag</button>
                                    </div>`;

    const productBtn = document.querySelector(".product__btn");
    productBtn.addEventListener("click", addToBag);
    storeItem = json[0];

    // Check if item is in bag, if it is, remove update button text.
    if (JSON.parse(localStorage.getItem("shoppingBag"))) {
      const arr = JSON.parse(localStorage.getItem("shoppingBag"));
      const filter = arr.filter((product) => product.id === storeItem.id);

      if (filter.length) {
        productBtn.innerHTML = "remove from bag";
      }
    }
  } catch (error) {
    // if there's an error - display error to user
    console.log(error);
  } finally {
    /* removeLoader(); */
  }
}

function addToBag(e) {
  let bagArr = [];
  if (JSON.parse(localStorage.getItem("shoppingBag"))) {
    bagArr = JSON.parse(localStorage.getItem("shoppingBag"));

    const filteredArr = bagArr.filter((product) => product.id === storeItem.id);

    if (filteredArr.length) {
      const newArr = bagArr.filter((product) => product.id !== storeItem.id);
      bagArr = newArr;
      localStorage.setItem("shoppingBag", JSON.stringify(bagArr));
      e.target.innerHTML = "add to bag";
    } else {
      bagArr.push(storeItem);
      localStorage.setItem("shoppingBag", JSON.stringify(bagArr));
      e.target.innerHTML = "remove from bag";
    }
  } else {
    bagArr.push(storeItem);
    localStorage.setItem("shoppingBag", JSON.stringify(bagArr));
    e.target.innerHTML = "remove from bag";
  }
}

createIndex();
