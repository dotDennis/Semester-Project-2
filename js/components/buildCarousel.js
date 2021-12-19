import { baseUrl } from "../settings/api.js";

const carouselContainer = document.querySelector(".carousel-inner");

function createProduct(container, product) {
  let image = baseUrl + product.image.formats.small.url;
  let alt = product.image.caption;
  let title = product.title;
  let price = product.price;
  let id = product.id;
  let featured = "";

  if (product.featured) {
    featured = `
      <span class="badge badge-pill carousel__badge"><span class="material-icons">
      star
      </span></span>
      `;
  }

  container.innerHTML += `<div class="col">
                                <div class="carousel__thumbnail">
                                    <img class="w-100" src="${image}" alt="${alt}">
                                </div>
                                ${featured}
                                <div class="carousel__caption">
                                    <div class="carousel__title d-flex align-items-baseline">
                                        <h3 class="mb-0">${title}</h2>
                                    </div>
                                    <div class="carousel__price d-flex align-items-baseline mt-1">
                                        <h3 class="price price__initial">${price} NOK</h3>
                                    </div>
                                </div>
                                <a class="carousel__link" href="/product.html?product=${id}"></a>
                            </div>      
                            `;
}

export function buildCarousel(id, arr) {
  let active = "";

  if (id === 0) {
    active = " active";
  } else {
    active = "";
  }

  carouselContainer.innerHTML += `<div data-id="${id}" class="carousel-item${active}">
                                        <div class="row"></div>
                                    </div>`;

  /* select carousel container */
  let container = document.querySelector(
    `.carousel-item[data-id="${id}"] .row`
  );

  arr.forEach((product) => createProduct(container, product));
}
