function Product() {
  Product.id = JSON.parse(localStorage.getItem("indexId"));
  if (Product.id === undefined) {
    Product.id = 1;
  } else {
    ++Product.id;
  }
  this.id = Product.id;
  this.name = document.getElementById("product-name").value;
  this.price = document.getElementById("product-price").value;
  this.category = document.getElementById("product-category").value;
  this.url = document.getElementById("product-img").value;
}

function onPageLoad() {
  const myCart = JSON.parse(localStorage.getItem("cartList"));
  if (myCart != null) {
    for (let item of myCart) {
      addToPage(item);
    }
  }
}

document.getElementById("product-form").addEventListener("submit", function (e) {
    e.preventDefault();
    addProduct();
  });

function addProduct() {
  const product = new Product();
  addToLocalStorage(product);
  addToPage(product);
  resetForm();
}

function addToLocalStorage(product) {
  let myCart = localStorage.getItem("cartList");
  if (myCart === null) {
    myCart = [];
    myCart.push(product);
  } else {
    myCart = JSON.parse(myCart);
    myCart.push(product);
  }
  localStorage.setItem("cartList", JSON.stringify(myCart));
  localStorage.setItem("indexId", JSON.stringify(product.id));
}

function addToPage(product) {
  document.getElementById("tbody").innerHTML += setTableLine(product);
}

function removeProduct(element) {
  const elementID = getItemIndexId(element.id);
  const newCart = getAllCartWithoutThisProduct(elementID);
  localStorage.setItem("cartList", JSON.stringify(newCart));
  event.target.parentElement.parentElement.remove();
}

function getAllCartWithoutThisProduct(productId) {
  productId = getItemIndexId(productId);
  return JSON.parse(localStorage.getItem("cartList")).filter((item) => item.id != productId);
}

function getThisPrduct(productId) {
  productId = getItemIndexId(productId);
  return JSON.parse(localStorage.getItem("cartList")).filter((item) => item.id == productId).pop();
}

function getItemIndexId(elementId) {
  if (typeof elementId == "string") {
    elementId = elementId.split("-");
    elementId = elementId[1];
  }
  return +elementId;
}

function resetForm() {
  document.getElementById("product-form").reset();
}

function setTableLine(product) {
  const productLine = `
    <tr id="product-${product.id}">
      <td class="image-cell">
        <img class="product-img" src="${product.url}" />
       </td>
       <td class="name-cell">${product.name}</td>
       <td class="price-cell">${product.price}</td>
       <td class="category-cell">${product.category}</td>
       <td class="action-cell">
         <button class="remove-btn" id="remove-${product.id}" onclick="removeProduct(this)">
           remove
         </button>
       </td>
    </tr>`;
  return productLine;
}
