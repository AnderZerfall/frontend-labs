// Task 2 Lab 4

const SLIDE_TAG = ".slide";
const NEXT_BUTTON_TAG = ".slider-next-button";
const PREVIOUS_BUTTON_TAG = ".slider-previous-button";
const ACTIVE_SLIDE_TAG = ".current-slide";

class Slide {
  #id;

  constructor({ id = crypto.randomUUID(), element = null }) {
    this.#id = id;
    this.element = element;
  }

  getId() {
    return this.#id;
  }

  setActive(isActive = false) {
    this.element.classList.toggle("current-slide", isActive);
    this.element.style.order = 1;
  }
}

class Slider {
  constructor(   slides = [],
    currentSlideIndex = 0,
    nextButton = null,
    previousButton = null,) {
    this.slides = slides;
    this.currentSlideIndex = currentSlideIndex;
    (this.nextButton = nextButton), (this.previousButton = previousButton);
  }

  initSlider() {
    const slidesContent =
      Array.from(document.querySelectorAll(SLIDE_TAG)) ?? [];
    console.log(slidesContent);
    const slides = slidesContent.map((slide) => new Slide({ element: slide }));

    this.slides = slides;
    this.nextButton = document.querySelector(NEXT_BUTTON_TAG) ?? null;
    this.previousButton = document.querySelector(PREVIOUS_BUTTON_TAG) ?? null;

    this.update();
    this.setupEvents();
  }

  setupEvents() {
    if (this.nextButton)
      this.nextButton.addEventListener("click", () => this.nextSlide());

    if (this.previousButton)
      this.previousButton.addEventListener("click", () => this.previouSlide());
  }

  update() {
    this.slides.forEach((slide, i) => {
      slide.setActive(i === this.currentSlideIndex);
      slide.element.style.order =
        (i - this.currentSlideIndex + this.slides.length) % this.slides.length;

      const relativeIndex = i - this.currentSlideIndex;
      const offset = relativeIndex * slide.element.offsetWidth;

      slide.element.style.transform = `translateX(${offset}px)`;
    });
  }

  nextSlide() {
    const withinRange =
      this.currentSlideIndex >= 0 &&
      this.currentSlideIndex < this.slides.length - 1;

    if (withinRange) {
      this.currentSlideIndex += 1;
    } else {
      this.currentSlideIndex = 0;
    }

    this.update();
  }

  previouSlide() {
    const withinRange =
      this.currentSlideIndex > 0 &&
      this.currentSlideIndex <= this.slides.length - 1;

    if (withinRange) {
      this.currentSlideIndex -= 1;
    } else {
      this.currentSlideIndex = this.slides.length - 1;
    }

    this.update();
  }
}

function runSlider() {
  const slider = new Slider({});
  slider.initSlider();
}

runSlider();
