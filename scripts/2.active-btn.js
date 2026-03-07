const buttons = document.querySelectorAll(".btn");
// console.log(buttons)
buttons.forEach(function (button) {
  // console.log(button)
  button.addEventListener("click", function () {
    buttons.forEach(function (btn) {
      // console.log(btn)
      btn.classList.remove("active");
    });
    button.classList.add("active");
  });
});
