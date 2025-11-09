// Task 5 Lab 4

const changeTheme = () => {
  const now = new Date("2025-11-09T23:42:17.000Z");
  const hour = now.getHours();

  const isNightTime = hour >= 21 || hour < 6;

  if (isNightTime) {
    const allElements = document.querySelectorAll("*");

    allElements.forEach((el) => {
      el.style.filter = "brightness(0.96)"; // I've changed to 4% instead of 40, cause 40 is too much
    });
  }
};

changeTheme();
