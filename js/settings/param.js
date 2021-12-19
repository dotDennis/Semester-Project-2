const queryString = document.location.search;

const params = new URLSearchParams(queryString);

// get the id from the querystring
export const ID = params.get("product");
