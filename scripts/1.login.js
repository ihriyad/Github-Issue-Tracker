document.getElementById("login-btn").addEventListener("click", function () {
  // console.log("btn clicked")
  const getUserName = document.getElementById("input-username");
  const userName = getUserName.value;

  const getPassword = document.getElementById("input-password");
  const password = getPassword.value;
  //   console.log(password)

  if (userName === "admin" && password === "admin123") {
    // alert("Login Success")
    window.location.replace("home.html");
  } else {
    alert("Invalid Username or Password");
  }
  return;
});
