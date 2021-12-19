import { buildCarousel } from "./buildCarousel.js";

const width = window.innerWidth;
let x = 2;

if (width > 991) {
  x = 3;
}

export function prepareCarousel(data) {
  //filter featured products
  const featuredProduct = data.filter(function (product) {
    return product.featured;
  });

  let id = 0;
  let itemArr = [];

  // loop through filtered (featured) products //
  // the number !!! 6 !!! in the for loop would normally be json.length, it's been put to a fixed value,
  // due to the api only containing 1 product & not showing the design properly. A shoe ecommerce should/would
  // have more than 1 featured pair of shoes.
  for (let i = 0; i < 6; i++) {
    if (!featuredProduct[i]) {
      itemArr.push(featuredProduct[0]);
    } else {
      itemArr.push(featuredProduct[i]);
    }

    // If x items have looped, start building items & then reset array. (x depends on screensize, to configure how many items are displayed at once
    // first check if width is below 768, if so skip checking x & just build the items. if not do the check.
    if (width < 768) {
      buildCarousel(id, itemArr);
      id++;
      itemArr = [];
    } else {
      if ((i + 1) % x === 0) {
        if (i === 0) {
          continue;
        }
        {
          buildCarousel(id, itemArr);
          id++;
        }
        // reset array.
        itemArr = [];
      }
    }
  }
}
