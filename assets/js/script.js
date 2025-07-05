/* === Slider & Lightbox minimal === */
const MOBILE_BREAKPOINT = 768;
let isMobile = window.innerWidth < MOBILE_BREAKPOINT;

/* Swipers */
const sliderMain = new Swiper(".slider__main", {
  freeMode: true,
  centeredSlides: true,
  mousewheel: true,
  parallax: true,
  breakpoints: {
    0: { slidesPerView: 2.5, spaceBetween: 20 },
    680: { slidesPerView: 3.5, spaceBetween: 60 },
  },
});

const sliderBg = new Swiper(".slider__bg", {
  centeredSlides: true,
  parallax: true,
  slidesPerView: 3.5,
  spaceBetween: 60,
});

sliderMain.controller.control = sliderBg;
sliderBg.controller.control = sliderMain;

/* DOM refs */
const sliderEls = document.querySelectorAll(".slider__main");
const contentBox = document.querySelector(".slider__content, .slider__main");

/* Resize slider when texte caché */
function updateSliderSize() {
  const expand = contentBox.classList.contains("hidden");
  sliderEls.forEach((el) => el.classList.toggle("slider--expanded", expand));
}

/* Slide change */
sliderMain.on("slideChange", () => {
  contentBox.classList.toggle("hidden", sliderMain.activeIndex > 0);
  updateSliderSize();
  closeOpenedItem();
});

/* Lightbox */
let openedItem = null;

function closeOpenedItem() {
  if (openedItem) {
    openedItem.classList.remove("opened");
    openedItem = null;
  }
}

document.querySelectorAll(".slider__item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();

    if (openedItem && openedItem !== item)
      openedItem.classList.remove("opened");

    item.classList.toggle("opened");
    openedItem = item.classList.contains("opened") ? item : null;
  });
});

document.addEventListener("click", closeOpenedItem);

/* On resize, close any opened item & adjust parallax if breakpoint crossed */
window.addEventListener("resize", () => {
  const nowMobile = window.innerWidth < MOBILE_BREAKPOINT;
  if (nowMobile !== isMobile) {
    isMobile = nowMobile;
    closeOpenedItem();
  }
});
