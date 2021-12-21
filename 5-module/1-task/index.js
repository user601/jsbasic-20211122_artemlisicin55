function hideSelf() {
  let btn = document.querySelector(".hide-self-button");

  function hidden() {
    btn.setAttribute("hidden", true);
  }
  btn.addEventListener("click", hidden);
}
