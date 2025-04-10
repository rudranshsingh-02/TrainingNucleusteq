document.getElementById('employeeLogin').addEventListener('click', function() {
  document.getElementById('role').value = "employee";
  document.getElementById('loginForm').style.display = 'block';
});

document.getElementById('adminLogin').addEventListener('click', function() {
  document.getElementById('role').value = "admin";
  document.getElementById('loginForm').style.display = 'block';
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const loginData = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      role: document.getElementById('role').value
  };

  fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
  })
  .then(response => response.json())
  .then(data => {
      if (data.message === "Login successful!") {
          sessionStorage.setItem("EmpEmail", loginData.email);
          if (data.role === "admin") {
              window.location.href = "admin.html";
          } else {
              window.location.href = "employee.html";
          }
      } else {
          alert("Invalid credentials. Please try again.");
      }
  })
  .catch(error => console.error('Error:', error));
});
