import productsArr from "./products.js";

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function sortProducts(sortOption) {
  if (sortOption==='Name') {
    productsArr.sort((a,b) => a.name.localeCompare(b.name));
  } else if (sortOption==='Price Low to High') {
    productsArr.sort((a, b) => a.price - b.price);
  } else if (sortOption==='Price High to Low'){
    productsArr.sort((a, b) => b.price - a.price);
  } else {
  }
}

export default sortProducts;