function toggleText() {
  const toggleBtn = document.querySelector(".toggle-text-button");
  let txt = document.querySelector("#text");
  toggleBtn.addEventListener("click", () => {
    if (txt.hidden == false) {
      txt.hidden = true;
    } else {
      txt.hidden = false;
    }
  });
}
