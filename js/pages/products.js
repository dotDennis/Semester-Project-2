import { baseUrl } from "../settings/api.js";
import { createCategory } from "../components/createCategory.js";
import { createProduct } from "../components/common/createProduct.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const category = params.get("category");

if (!category) {
  location.href = "/";
}

const titleContainer = document.querySelector(".category__title");

if (category === "unisex") {
  titleContainer.innerHTML = category + " shoes";
} else {
  titleContainer.innerHTML = category + "'s shoes";
}

// to store fresh data locally
let productArr = "";

async function initiateCategory() {
  try {
    // await response then await json

    const response = await fetch(baseUrl + "/products"); //?category=women or men from param, but the api has no categories, so this will have to do, for design.
    const data = await response.json();

    // store data locally so we can retrieve it without calling API, then filter products on search.
    productArr = data;
    localStorage.setItem("products", JSON.stringify(productArr));

    createCategory(data, ".container__products .row");
  } catch (error) {
    // if there's an error - display error to user
    console.log(error);
  } finally {
    /*     removeLoader(); */
  }
}

initiateCategory();

const searchInput = document.querySelector("#search");

searchInput.addEventListener("keyup", searchProducts);

function searchProducts(e) {
  titleContainer.innerHTML = "Search";
  if (JSON.parse(localStorage.getItem("products"))) {
    let products = JSON.parse(localStorage.getItem("products"));

    let searchValue = e.target.value;

    const filteredProducts = products.filter((product) => {
      return (
        product.title.includes(searchValue) ||
        product.description.includes(searchValue)
      );
    });

    document.querySelector(".container__products .row").innerHTML = "";
    filteredProducts.forEach((product) =>
      createProduct(product, ".container__products .row")
    );
    if (!filteredProducts.length) {
      document.querySelector(
        ".container__products .row"
      ).innerHTML = `<span class="lead">No products found when searching for "${searchValue}".</span>`;
    }
  }

  /* credit: https://www.youtube.com/watch?v=wxz5vJ1BWrc */
}
