// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}


// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}


// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}


// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });

  qs(selector).addEventListener("click", callback);
}


// get URL parameter
export function getParam(param) {

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(param);

}


// load header and footer
export function loadHeaderFooter() {

  // If your project does not use partials, this can stay empty.
  // It prevents errors when importing it.

}


// render list with template
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterBegin",
  clear = false
) {

  const htmlStrings = list.map(templateFn);


  if (clear) {
    parentElement.innerHTML = "";
  }


  parentElement.insertAdjacentHTML(
    position,
    htmlStrings.join("")
  );

}


// discount calculation
export function getDiscount(price) {

  if (price > 300) {

    return 20;

  } else if (price >= 150) {

    return 12;

  } else {

    return 5;

  }

}


// discounted price
export function getDiscountedPrice(price) {

  const discount = getDiscount(price);

  return price - (price * discount / 100);

}