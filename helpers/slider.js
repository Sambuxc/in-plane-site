const slides = [
  {
    label: "Hero image slider placeholder",
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
    slideElement.textContent = slides[currentIndex].label;
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
