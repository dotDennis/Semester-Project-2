import { baseUrl } from "./settings/api.js";
import { createCategory } from "./components/createCategory.js";
import { prepareCarousel } from "./components/prepareCarousel.js";

const hero = document.querySelector(".hero");

function removeLoader() {
  setTimeout(() => {
    document.querySelector("body").classList.remove("preload");
    document.querySelector(".loader").outerHTML = "";
  }, 100);
}

async function createIndex() {
  try {
    // await response then await json

    const homeResponse = await fetch(baseUrl + "/home");
    const homeData = await homeResponse.json();

    // fetch & place banner url in html.style="background-image: url('img/bg.png');"
    hero.style.backgroundImage = `url('${baseUrl}${homeData.hero_banner.formats.large.url}')`;

    const productsResponse = await fetch(baseUrl + "/products");
    const productsData = await productsResponse.json();

    // Build the carousel with featured products
    prepareCarousel(productsData);

    // Loop through rest of the images & create categories equal to 2x 4 items, normally it would be done with the same filter method used in
    // the carousel (featured category) but the strapi API has no categories, hence why it's being done without filtering categories.
    createCategory(productsData, ".categories__men .row");
    createCategory(productsData, ".categories__women .row");
  } catch (error) {
    // if there's an error - display error to user
    console.log(error);
  } finally {
    removeLoader();

    // add carousel functionality (has to be done in the finally, as element has to be selected. Great if there's issues in the api call)
  }
}

createIndex();
