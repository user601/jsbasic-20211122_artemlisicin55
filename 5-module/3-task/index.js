function initCarousel() {
  let arrowLeft = document.querySelector(".carousel__arrow_left");
  let arrowRight = document.querySelector(".carousel__arrow_right");
  let sliderWrapper = document.querySelector(".carousel__inner");
  let counter = 0;

  arrowLeft.style.display = "none";

  let width = document.querySelector(".carousel__slide").offsetWidth;
  let slides = document.querySelectorAll(".carousel__slide");

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
    if (counter == -width * (slides.length - 1)) {
      arrowRight.style.display = "none";
    }
  });
}
