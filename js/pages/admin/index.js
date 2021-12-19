import { baseUrl } from "../../settings/api.js";

const container = document.querySelector(".admin__products");

async function createAdmin() {
  try {
    const response = await fetch(baseUrl + "/products");
    const data = await response.json();

    console.log(data);
    // Build the carousel with featured products
    data.forEach((product) => {
      buildHtml(product);
    });
  } catch (error) {
    // if there's an error - display error to user
    console.log(error);
  } finally {
    /* removeLoader(); */
  }
}

function buildHtml(product) {
  container.innerHTML += `<div class="row w-100 gx-0 mb-3">
      <div class="col image__container">
      <img src="${baseUrl}${product.image.formats.small.url}" alt="" />
      </div>
      <div class="headings col">
      <a class="lead" href="product.html?product=${product.id}">${product.title}</a>
          <p>${product.price} NOK</p>
              </div>
      <div class="col button__container">
        <button">remove</button>
        <button">update</button>
      </div>
      </div>
    `;
}

createAdmin();
