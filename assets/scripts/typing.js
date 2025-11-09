// Task 1 Lab 4

function createTyper() {
  let letterIndex = 0;
  const SPEED = 100;

  const TEXT = "⭐ Your gateway to creativity and fun! ⭐";
  const container = document.getElementById("type-writer");
  container.textContent = "";

  function autoType() {
    if (letterIndex < TEXT.length) {
      container.textContent += TEXT.charAt(letterIndex);
      letterIndex++;
      setTimeout(autoType, SPEED);
    }
  }

  autoType();
}

createTyper();
