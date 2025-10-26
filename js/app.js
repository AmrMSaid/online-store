var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var productList = document.getElementById("productList");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var storeProducts = [];
var inputsRegex = {
  name: /^[A-Z].{2,49}$/,
  price: /^[1-9]\d*$/,
  category: /^Laptop|Mobile|Camera|Printer|Speaker|Headphone|TV$/,
  description: /^.{3,100}$/,
};

if (localStorage.getItem("storeProducts") != null) {
  storeProducts = JSON.parse(localStorage.getItem("storeProducts"));
  displayProducts(storeProducts);
}

function addProduct() {
  if (
    validateInput(inputsRegex.name, productName) &
    validateInput(inputsRegex.price, productPrice) &
    validateInput(inputsRegex.category, productCategory) &
    validateInput(inputsRegex.description, productDescription) &
    validateImage()
  ) {
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
}

function clearForm() {
  productName.value = "";
  productPrice.value = null;
  productCategory.value = null;
  productDescription.value = "";
  productImage.value = null;
  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCategory.classList.remove("is-valid");
  productDescription.classList.remove("is-valid");
  productImage.classList.remove("is-valid");
}

function displayProducts(arr) {
  var productHtml = "";
  for (var i = 0; i < arr.length; i++) {
    var product = arr[i];
    productHtml += `<div class="col product">
            <div class="border shadow p-3">
              <div class="product-image">
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
  scrollToTop();
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

function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

function updateProduct() {
  if (
    validateInput(inputsRegex.name, productName) &
    validateInput(inputsRegex.price, productPrice) &
    validateInput(inputsRegex.category, productCategory) &
    validateInput(inputsRegex.description, productDescription)
  ) {
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
}

updateBtn.addEventListener("click", function () {
  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCategory.classList.remove("is-valid");
  productDescription.classList.remove("is-valid");
  productImage.classList.remove("is-valid");
});

function validateInput(inputRegex, inputElement) {
  if (inputRegex.test(inputElement.value)) {
    inputElement.classList.add("is-valid");
    inputElement.classList.remove("is-invalid");
    inputElement.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    inputElement.classList.add("is-invalid");
    inputElement.classList.remove("is-valid");
    inputElement.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}

function validateImage() {
  if (productImage.files.length) {
    productImage.classList.add("is-valid");
    productImage.classList.remove("is-invalid");
    productImage.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    productImage.classList.add("is-invalid");
    productImage.classList.remove("is-valid");
    productImage.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}
