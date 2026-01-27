const slides = [
  {
    html: `<img src=\"../assets/image-1.jpg\" alt="Picture of an eagle perched on a tree branch" />`,
  },
  {
    html: `<img src=\"../assets/image-2.jpg\" alt="Picture overlooking a lake at sunset, the sky's warm glow is reflecting off the water" />`,
  },
  {
    html: `<img src=\"../assets/image-3.jpg\" alt="A close up picture of a hummingbird approaching a yellowy-red trumpet vine flower " />`,
  },
];

const initializeSlider = () => {
  let currentIndex = 0;
  const slideElement = document.querySelector(".hero-slide");
  const controls = document.querySelectorAll(".hero-control");

  if (!slideElement || controls.length === 0) {
    return;
  }

  const renderSlide = () => {
    slideElement.innerHTML = slides[currentIndex].html;
  };

  const handleControlClick = (event) => {
    const direction = event.currentTarget.dataset.direction;
    if (!direction) {
      return;
    }

    if (direction === "next") {
      currentIndex = (currentIndex + 1) % slides.length;
    } else {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }

    renderSlide();
  };

  controls.forEach((control) => {
    control.addEventListener("click", handleControlClick);
  });

  renderSlide();
};

document.addEventListener("includes:loaded", initializeSlider);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSlider);
} else {
  initializeSlider();
}
