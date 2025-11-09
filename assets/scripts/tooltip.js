// Task 3 Lab 4

const TOOLTIP_TRIGGER = ".tooltip-trigger";
const TOOLTIP_CONTENT = ".tooltip";

class Tooltip {
  constructor(content = null, isOpen = false, trigger = null) {
    this.isOpen = isOpen;
    this.trigger = trigger;
    this.content = content;
  }

  initTooltip() {
    this.trigger = document.querySelector(TOOLTIP_TRIGGER) ?? null;
    this.content = document.querySelector(TOOLTIP_CONTENT) ?? null;
    this.update();
    this.setupEvents();
  }

  setupEvents() {
    if (this.trigger && this.content) {
      this.trigger.addEventListener("mouseenter", () => this.showTooltip());

      this.trigger.addEventListener("mouseleave", () => this.closeTooltip());
    }
  }

  update() {
    if (this.content) {
      this.content.classList.toggle("is-tooltip-open", this.isOpen);
    }
  }

  showTooltip() {
    this.isOpen = true;
    this.update();
  }

  closeTooltip() {
    this.isOpen = false;
    this.update();
  }
}

function runTooltip() {
  const tooltip = new Tooltip();

  tooltip.initTooltip();
}

runTooltip();
