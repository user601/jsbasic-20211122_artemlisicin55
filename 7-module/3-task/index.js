export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;
    this.steps = steps;
    this.elem = document.createElement("div");
    this.elem.classList.add("slider");
    this.render();
    this.addEvent(this.elem);
  }
  render() {
    this.elem.innerHTML = `
  <div class="slider__thumb" style="left: 50%;">
  <span class="slider__value">2</span>
  </div>
    <div class="slider__progress" style="width: 50%;"></div>
    <div class="slider__steps"> ${this.renderSteps()} </div>`;
  }
  renderSteps() {
    let steps = "";
    for (let i = 0; i < this.steps; i++) {
      if (i == 0) {
        steps += '<span class="slider__step-active"></span>';
      } else {
        steps += "<span></span>";
      }
    }
    return steps;
  }
  addEvent(element) {
    let segments = this.steps - 1;
    let sliderValue = this.elem.querySelector(".slider__value");
    let sliderThumb = this.elem.querySelector(".slider__thumb");
    let sliderProgress = this.elem.querySelector(".slider__progress");

    this.elem.addEventListener("click", function (event) {
      let left = event.clientX - element.getBoundingClientRect().left;
      let leftRelative = left / element.offsetWidth;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = (value / segments) * 100;
      sliderThumb.style.left = `${valuePercents}%`;
      sliderProgress.style.width = `${valuePercents}%`;
      sliderValue.innerHTML = value;

      let newEvent = new CustomEvent("slider-change", {
        detail: value,
        bubbles: true,
      });
      element.dispatchEvent(newEvent);
    });
  }
}
