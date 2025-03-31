
document.getElementById("adminBtn").addEventListener("click", function () {
  loginRedirect("adminDashboard.html");
});

document.getElementById("employeeBtn").addEventListener("click", function () {
  loginRedirect("employeeDashboard.html");
});

document.getElementById("toggleSignup").addEventListener("click", function () {
  let formTitle = document.getElementById("formTitle");
  let loginBtn = document.getElementById("loginBtn");

  if (formTitle.innerText === "Login") {
      formTitle.innerText = "Sign Up";
      loginBtn.innerText = "Sign Up";
  } else {
      formTitle.innerText = "Login";
      loginBtn.innerText = "Login";
  }
});

function loginRedirect(page) {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (username.trim() === "" || password.trim() === "") {
      alert("Please enter both username and password.");
      return;
  }

  window.location.href = page;
}
