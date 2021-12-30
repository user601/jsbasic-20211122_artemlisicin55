import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.elem = document.createElement("div");
    this.elem.classList.add("modal");
    this.title = "";
    this.body = "";
    this.opened = false;
    this.elem.addEventListener("click", (event) => this.onClick(event));

    document.addEventListener("keydown", (event) => this.onKeydown(event));
  }
  open() {
    this.opened = true;
    let body = document.querySelector("body");
    body.classList.add("is-modal-open");
    this.elem.innerHTML = `<div class="modal__overlay"></div> <div class="modal__inner">
<div class="modal__header">
<button type="button" class="modal__close">
<img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
</button>
<h3 class="modal__title">${this.title}</h3>
</div>
<div class="modal__body">${this.body}</div></div> `;
    body.append(this.elem);
  }
  setTitle(title) {
    this.title = title;
    if (this.opened) {
      let modalTitle = this.elem.querySelector(".modal__title");
      modalTitle.innerHTML = title;
    }
  }
  setBody(text) {
    this.body = text.outerHTML;
    if (this.opened) {
      let modalBody = this.elem.querySelector(".modal__body");
      modalBody.innerHTML = text.outerHTML;
    }
  }
  close() {
    let body = document.querySelector("body");
    body.classList.remove("is-modal-open");
    this.elem.remove();
    this.opened = false;
  }
  onClick(event) {
    if (event.target.closest(".modal__close")) {
      this.close();
    }
  }
  onKeydown(event) {
    if (event.code === "Escape") {
      this.close();
    }
  }
}
