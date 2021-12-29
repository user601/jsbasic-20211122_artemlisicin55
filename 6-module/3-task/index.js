import createElement from "../../assets/lib/create-element.js";
/*export default class Carousel {
  onstructor(slides) {
    this.slides = slides;
    this.elem = document.createElement("div");
    this.elem.classList.add("carousel");
    this.render(slides);
    setTimeout(() => this.initCarousel());
    this.elem.addEventListener("click", (event) => this.onClick(event));
  }

  render(slides) {
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
    console.log(event);
    if (!button) {
      return;
    }
    let divSlide = event.target.closest(".carousel__slide");
    console.log(divSlide.getAttribute("data-id"));

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

    divArrowLeft.style.display = "none";

    let width = document.querySelector(".carousel__slide").offsetWidth;
    //let slides = document.querySelectorAll(".carousel__slide");
    let slidesAll = this.slides.length - 1;
    divArrowLeft.addEventListener("click", () => {
      counter += width;
      sliderWrapper.style.transform = `translateX(${counter}px)`;
      arrowRight.style.display = "";
      if (counter == 0) {
        divArrowLeft.style.display = "none";
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
}*/
export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.currentSlideNumber = 0;
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
        <div class="carousel">
          <div class="carousel__arrow carousel__arrow_right">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon" />
          </div>
          <div class="carousel__arrow carousel__arrow_left">
            <img src="/assets/images/icons/angle-left-icon.svg" alt="icon" />
          </div>
          <div class="carousel__inner"></div>
        </div>
        `);

    let slides = this.slides.map((item) =>
      createElement(`
      <div class="carousel__slide" data-id="${item.id}">
        <img
          src="/assets/images/carousel/${item.image}"
          class="carousel__img"
          alt="slide"
        />
        <div class="carousel__caption">
          <span class="carousel__price">€${item.price.toFixed(2)}</span>
          <div class="carousel__title">${item.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon" />
          </button>
        </div>
      </div>`)
    );

    this.sub("inner").append(...slides);

    this.update();
  }

  addEventListeners() {
    this.elem.onclick = ({ target }) => {
      let button = target.closest(".carousel__button");
      if (button) {
        let id = target.closest("[data-id]").dataset.id;

        this.elem.dispatchEvent(
          new CustomEvent("product-add", {
            detail: id,
            bubbles: true,
          })
        );
      }

      if (target.closest(".carousel__arrow_right")) {
        this.next();
      }

      if (target.closest(".carousel__arrow_left")) {
        this.prev();
      }
    };
  }

  sub(ref) {
    return this.elem.querySelector(`.carousel__${ref}`);
  }

  next() {
    this.currentSlideNumber++;
    this.update();
  }

  prev() {
    this.currentSlideNumber--;
    this.update();
  }

  update() {
    let offset = -this.elem.offsetWidth * this.currentSlideNumber;
    this.sub("inner").style.transform = `translateX(${offset}px)`;

    if (this.currentSlideNumber == this.slides.length - 1) {
      this.sub("arrow_right").style.display = "none";
    } else {
      this.sub("arrow_right").style.display = "";
    }

    if (this.currentSlideNumber == 0) {
      this.sub("arrow_left").style.display = "none";
    } else {
      this.sub("arrow_left").style.display = "";
    }
  }
}
