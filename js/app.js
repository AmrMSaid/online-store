var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var storeProducts = [];
var productList = document.getElementById("productList");
if (localStorage.getItem("storeProducts") != null) {
  storeProducts = JSON.parse(localStorage.getItem("storeProducts"));
  displayProducts(storeProducts);
}

function addProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
    image: productImage.files[0].name,
  };
  storeProducts.push(product);
  localStorage.setItem("storeProducts", JSON.stringify(storeProducts));
  displayProducts(storeProducts);
  clearForm();
}

function clearForm() {
  productName.value = "";
  productPrice.value = null;
  productCategory.value = null;
  productDescription.value = "";
  productImage.value = null;
}

function displayProducts(arr) {
  var productHtml = "";
  for (var i = 0; i < arr.length; i++) {
    var product = arr[i];
    productHtml += `<div class="col">
            <div class="border shadow p2">
              <div class="product-image mb-3">
                <img src="./images/${
                  product.image
                }" class="w-100 h-100 object-fit-contain" />
              </div>
              <h4>${product.name}</h4>
              <p class="text-muted">${product.description}</p>
              <p><span class="fw-bold">Category: </span>${product.category}</p>
              <div class="d-flex justify-content-between">
                <span class="fw-bold">${product.price} EGP</span>
                <span>
                  <i onclick="deleteProduct(${
                    product.oldIndex || i
                  })" class="fa-solid fa-trash text-danger fs-5"></i>
                  <i onclick="initDataToUpdate(${
                    product.oldIndex || i
                  })" class="fa-solid fa-pen-to-square text-danger fs-5"></i>
                </span>
              </div>
            </div>
          </div>`;
  }
  productList.innerHTML = productHtml;
}

function deleteProduct(productIndex) {
  storeProducts.splice(productIndex, 1);
  displayProducts(storeProducts);
  localStorage.setItem("storeProducts", JSON.stringify(storeProducts));
}

function searchProducts(trim) {
  var searchResults = [];
  for (var i = 0; i < storeProducts.length; i++) {
    if (storeProducts[i].name.toLowerCase().includes(trim.toLowerCase())) {
      storeProducts[i].oldIndex = i;
      searchResults.push(storeProducts[i]);
    }
  }
  displayProducts(searchResults);
}

var selectedElementIndex = null;

function initDataToUpdate(index) {
  storeProducts[index].name;
  storeProducts[index].price;
  storeProducts[index].category;
  storeProducts[index].description;
  productName.value = storeProducts[index].name;
  productPrice.value = storeProducts[index].price;
  productCategory.value = storeProducts[index].category;
  productDescription.value = storeProducts[index].description;
  addBtn.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");
  selectedElementIndex = index;
}

function updateProduct() {
  storeProducts[selectedElementIndex].name = productName.value;
  storeProducts[selectedElementIndex].price = productPrice.value;
  storeProducts[selectedElementIndex].category = productCategory.value;
  storeProducts[selectedElementIndex].description = productDescription.value;
  if (productImage.files[0]) {
    storeProducts[selectedElementIndex].image = productImage.files[0].name;
  }
  displayProducts(storeProducts);
  localStorage.setItem("storeProducts", JSON.stringify(storeProducts));
  updateBtn.classList.replace("d-block", "d-none");
  addBtn.classList.replace("d-none", "d-block");
  clearForm();
}
