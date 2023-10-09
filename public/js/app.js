const hero = document.querySelector(".hero");

if (hero) {
  window.addEventListener("load", () => {
    hero.classList.add("active");
  });
}
