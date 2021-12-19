import { createProduct } from "./common/createProduct.js";

export function createCategory(data, container) {
  // If this was a filtered category, a forEach loop would be used, but I need 4 items for the design, so using a for loop with fixed "length";

  let x = 4;
  if (container === ".container__products .row") {
    x = 10;
  }

  for (let i = 0; i < x; i++) {
    if (!data[i]) {
      createProduct(data[0], container); //to fill space on design.
    } else {
      createProduct(data[i], container);
    }
  }
}
