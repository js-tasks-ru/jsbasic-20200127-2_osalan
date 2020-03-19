'use strict';

class ProductList {
  productsUrl = '/assets/data/products.json';
  productsStoreKey = 'cart-products';

  constructor(element) {
    this.el = element;
    this.el.innerHTML = this.template;
  }

  allProducts = new Map();
  selectedProducts = new Set();

  show() {
    let result = fetch(this.productsUrl)
      .then(response => response.json())
      .then(response => this.load(response));
    return result;
  }

  load(json) {
    console.log(json);
    let productsDiv = this.el.querySelector('.homepage-cards');
    for (let product of json) {
      productsDiv.append(this.createProduct(product));
      this.allProducts.set(product.id, product);
    }
  }

  createProduct(product) {
    let productDiv = document.createElement('div');
    productDiv.className = 'products-list-product col-md-6 col-lg-4 mb-4';
    productDiv.dataset.id = product.id;
    productDiv.innerHTML = `
    <div class="card">
        <div class="card-img-wrap">
            <img class="card-img-top" src="${product.imageUrl}" alt="Card image cap">
        </div>
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <div class="rate">
                <i class="icon-star ${product.rating !== null && product.rating.stars >= 1 ? 'checked' : ''}"></i>
                <i class="icon-star ${product.rating !== null && product.rating.stars >= 2 ? 'checked' : ''}"></i>
                <i class="icon-star ${product.rating !== null && product.rating.stars >= 3 ? 'checked' : ''}"></i>
                <i class="icon-star ${product.rating !== null && product.rating.stars >= 4 ? 'checked' : ''}"></i>
                <i class="icon-star ${product.rating !== null && product.rating.stars == 5 ? 'checked' : ''}"></i>
                <span class="rate-amount ml-2">${product.rating !== null ? product.rating.reviewsAmount : 0}</span>
            </div>
            <p class="card-text price-text discount"><strong>${product.price}</strong>
            <small class="ml-2">${product.oldPrice !== null ? product.oldPrice : ''}</small></p>

            <button class="product-add-to-cart" data-button-role="add-to-cart">
              Add to cart
            </button>
        </div>
    </div>
    `;
    let button = productDiv.querySelector('.product-add-to-cart');
    button.addEventListener('click', (event) => this.clickButton(event));
    return productDiv;
  }

  clickButton(event) {
    let result = confirm('Вы уверенны, что хотите добавить этот товар в корзину?');
    if (!result) {
      return;
    }
    let cardDiv = event.target.closest('.products-list-product');
    this.selectedProducts.add(this.allProducts.get(parseInt(cardDiv.dataset.id)));
    localStorage.setItem(this.productsStoreKey, Array.from(this.selectedProducts).join(','));
    for(let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
      }
      console.log(`${key}: ${localStorage.getItem(key)}`);
    }
  }

  template = `
  <div class="row justify-content-end">
    <div class="col-lg-9">
        <h3 class="section-title">
          Top Recommendations For You |
          <a href="/checkout.html">Your Cart</a>
        </h3>
        <div class="row homepage-cards">
            <!--ВОТ ЗДЕСЬ БУДУТ КАРТОЧКИ ТОВАРОВ-->
        </div>
    </div>
</div>
  `;
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.ProductList = ProductList;
