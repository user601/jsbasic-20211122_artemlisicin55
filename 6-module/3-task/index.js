import createElement from "../../assets/lib/create-element.js";
export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement("div");
    this.elem.classList.add("carousel");
    this.createCarousel(slides);
    setTimeout(() => this.initCarousel());
    this.elem.addEventListener("click", (event) => this.onClick(event));
  }
  createCarousel(slides) {
    let divArrowRight = document.createElement("div");
    this.elem.append(divArrowRight);
    divArrowRight.classList.add("carousel__arrow");
    divArrowRight.classList.add("carousel__arrow_right");
    divArrowRight.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;

    let divArrowLeft = document.createElement("div");
    this.elem.append(divArrowLeft);
    divArrowLeft.classList.add("carousel__arrow");
    divArrowLeft.classList.add("carousel__arrow_left");
    divArrowLeft.innerHTML = `<img src="/assets/images/icons/angle-left-icon.svg" alt="icon">`;

    let divInner = document.createElement("div");
    this.elem.append(divInner);
    divInner.classList.add("carousel__inner");

    slides.forEach((slide) => {
      let divSlide = document.createElement("div");
      divInner.append(divSlide);
      divSlide.classList.add("carousel__slide");
      divSlide.dataset.id = `${slide.id}`;
      divSlide.innerHTML = `<img src="/assets/images/carousel/${
        slide.image
      }" class="carousel__img" alt="slide">
        <div class="carousel__caption">
        <span class="carousel__price">€${slide.price.toFixed(2)}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>`;
    });
  }
  onClick(event) {
    let button = event.target.closest(".carousel__button");

    if (!button) {
      return;
    }
    let divSlide = event.target.closest(".carousel__slide");

    let customEvent = new CustomEvent("product-add", {
      detail: divSlide.getAttribute("data-id"),
      bubbles: true,
    });
    this.elem.dispatchEvent(customEvent);
  }
  initCarousel() {
    let arrowLeft = document.querySelector(".carousel__arrow_left");
    let arrowRight = document.querySelector(".carousel__arrow_right");
    let sliderWrapper = document.querySelector(".carousel__inner");

    let counter = 0;

    arrowLeft.style.display = "none";

    let width = document.querySelector(".carousel__slide").offsetWidth;
    //let slides = document.querySelectorAll(".carousel__slide");
    let slidesAll = this.slides.length - 1;
    arrowLeft.addEventListener("click", () => {
      counter += width;
      sliderWrapper.style.transform = `translateX(${counter}px)`;
      arrowRight.style.display = "";
      if (counter == 0) {
        arrowLeft.style.display = "none";
      }
    });

    arrowRight.addEventListener("click", () => {
      counter -= width;
      arrowLeft.style.display = "";
      sliderWrapper.style.transform = `translateX(${counter}px)`;
      if (counter == -(width * slidesAll)) {
        arrowRight.style.display = "none";
      }
    });
  }
}
