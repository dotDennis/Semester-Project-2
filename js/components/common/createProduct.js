import { baseUrl } from "../../settings/api.js";

export function createProduct(data, element) {
  let image = baseUrl + data.image.formats.small.url;
  let alt = data.image.caption;
  let title = data.title;
  let price = data.price;
  let id = data.id;
  let featured = "";

  if (data.featured) {
    featured = `
        <span class="badge badge-pill carousel__badge"><span class="material-icons">
        star
        </span></span>
        `;
  }

  const container = document.querySelector(`${element}`);

  container.innerHTML += `<div class="col col-6 col-lg-3">
                              <div class="container__thumbnail">
                                  <img class="w-100" src="${image}" alt="${alt}">
                              </div>
                              ${featured}
                              <div class="container__caption">
                                  <div class="container__title d-flex align-items-baseline">
                                      <h3 class="mb-0">${title}</h2>
                                  </div>
                                  <div class="container__price d-flex align-items-baseline mt-1">
                                      <h3 class="price price__initial">${price} NOK</h3>
                                  </div>
                              </div>
                              <a class="container__link" href="/product.html?product=${id}"></a>
                            </div>
                           `;
}
