export default class ProductCard {
  constructor(product) {
    this.elem = document.createElement("div");
    this.elem.classList.add("card");
    this.render(product);
  }
  render(product) {
    let divTop = document.createElement("div");
    this.elem.append(divTop);
    divTop.classList.add("card__top");
    divTop.innerHTML = `<img src="/assets/images/products/${
      product.image
    }" class="card__image" alt="product"><span class="card__price">€${product.price.toFixed(
      2
    )}</span>`;

    let divBody = document.createElement("div");
    this.elem.append(divBody);
    divBody.classList.add("card__body");
    divBody.innerHTML = `<div class="card__title">${product.name}</div><button type="button" class="card__button" onclick="product-add()"><img src="/assets/images/icons/plus-icon.svg" alt="icon"></button>`;
  }
}
