// Task 4 Lab 4

const POPUP_TRIGGER = ".popup-trigger";
const USER_ANSWER_TAG = ".user-answer";
const CHECK_BTN = ".check-btn";
const TASK_TAG = ".task";
const RESULT_TAG = ".result";

class Popup {
  constructor(
    task = "",
    answer = "",
    content = null,
    isOpen = false,
    trigger = null,
    checkTrigger = null
  ) {
    (this.task = task), (this.answer = answer), (this.isOpen = isOpen);
    this.trigger = trigger;
    this.content = content;
    this.checkTrigger = checkTrigger;
  }

  initPopup() {
    this.content = this.createPopupContent();
    this.checkTrigger = this.content.querySelector(CHECK_BTN) ?? null;

    this.update();
    this.setupEvents();
  }

  createPopupContent() {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
  <p class="task">${this.task}</p>
  <input type="text" class="user-answer" placeholder="Your answer">
  <button class="check-btn button">Check Answer</button>
  <p class="result"></p>
        `;

    if (this.trigger) {
      popup.id = `${this.trigger.id}-popup`;
      this.trigger.appendChild(popup);
    }

    return popup;
  }

  setupEvents() {
    if (this.trigger && this.content && this.checkTrigger) {
      this.trigger.addEventListener("mouseenter", () => this.openPopup());
      this.trigger.addEventListener("mouseleave", () => this.closePopup());
      this.checkTrigger.addEventListener("click", () => this.checkAnswer());
    }
  }

  update() {
    if (this.content) {
      this.content.classList.toggle("is-popup-open", this.isOpen);
    }
  }

  openPopup() {
    this.isOpen = true;
    this.update();
  }

  closePopup() {
    const userAnswer = this.content.querySelector(USER_ANSWER_TAG);
    const result = this.content.querySelector(RESULT_TAG);

    this.isOpen = false;
    this.userAnswer = "";

    result.textContent = "";
    userAnswer.value = "";
    this.update();
  }

  checkAnswer() {
    const userAnswer = this.content.querySelector(USER_ANSWER_TAG).value.trim();
    const result = this.content.querySelector(RESULT_TAG);

    if (userAnswer.toLowerCase() === this.answer.toLowerCase()) {
      result.textContent =
        "You're god damn right! 🎉, But please, go touch grass";
      result.style.color = "var( --color-success)";
    } else {
      result.textContent = "Meh, that's wrong. Too much grass touching";
      result.style.color = "var( --color-alert)";
    }
  }
}

const tasks = [
    {
        task: "I live inside a function and vanish outside. What am I?",
        answer: "local"
    },
     {
        task: "I change when added to a string. What am I?",
        answer: "coercion"
    },
     {
        task: "Declared but not defined. What am I?",
        answer: "undefined"
    }, {
        task: "Double equals converts, triple equals is strict. What am I?",
        answer: "boolean"
    },
     {
        task: "I wait in the background and run when called. What am I?",
        answer: "callback"
    }
]

function getRandomTask() {
    const randomIndex = Math.floor(Math.random() * tasks.length);
    return tasks[randomIndex];
}

function runPopup() {
  const targets = Array.from(document.querySelectorAll(POPUP_TRIGGER)) ?? [];

  targets.map((target) => {
    const task = getRandomTask();
    const popup = new Popup(task.task, task.answer, null, false, target, null);
    popup.initPopup();
  });
}

runPopup();
