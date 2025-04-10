document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
  const userData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      role: "employee" 
  };
  fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
  })
  .then(response => response.text())  
  .then(data => {
      alert(data); 

      window.location.href = "index.html"; 
  })
  .catch(error => {
      console.error('Error:', error);
      alert("Something went wrong. Please try again.");
  });
});
