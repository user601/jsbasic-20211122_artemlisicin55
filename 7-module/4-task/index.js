export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;
    this.steps = steps;
    this.elem = document.createElement("div");
    this.elem.classList.add("slider");
    this.render();
    this.addEvent(this.elem);
    this.dragNDrop(this.elem);
  }
  render() {
    this.elem.innerHTML = `
    <div class="slider__thumb" style="left: 50%;">
    <span class="slider__value">2</span>
    </div>
    <div class="slider__progress" style="width: 50%;"></div>
    <div class="slider__steps">${this.renderSteps()}
    </div>`;
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
  dragNDrop(element) {
    let segments = this.steps - 1;
    let sliderValue = this.elem.querySelector(".slider__value");
    let sliderThumb = this.elem.querySelector(".slider__thumb");
    let sliderProgress = this.elem.querySelector(".slider__progress");

    sliderThumb.onpointerdown = function (event) {
      event.preventDefault();
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);

      function onPointerMove(event) {
        element.classList.add("slider_dragging");
        let left = event.clientX - element.getBoundingClientRect().left;
        let leftRelative = left / element.offsetWidth;
        if (leftRelative < 0) {
          leftRelative = 0;
        }
        if (leftRelative > 1) {
          leftRelative = 1;
        }
        let leftPercents = leftRelative * 100;
        let approximateValue = leftRelative * segments;
        let value = Math.round(approximateValue);
        sliderThumb.style.left = `${leftPercents}%`;
        sliderProgress.style.width = `${leftPercents}%`;
        sliderValue.innerHTML = value;
        this.value = value;
      }

      function onPointerUp(event) {
        console.log(event);
        document.querySelector(".slider").classList.remove("slider_dragging");
        let newEvent = new CustomEvent("slider-change", {
          detail: this.value,
          bubbles: true,
        });
        element.dispatchEvent(newEvent);
        document.removeEventListener("pointerup", onPointerUp);
        document.removeEventListener("pointermove", onPointerMove);
      }
    };
  }

  removeOnDragStart() {
    sliderThumb.ondragstart = function () {
      return false;
    };
  }
}
