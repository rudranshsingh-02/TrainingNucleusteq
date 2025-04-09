document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
      const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
          window.location.href = '/html/employees.html';
      } else {
          document.getElementById('loginError').textContent = 'Invalid credentials';
      }
  } catch (error) {
      console.error('Login error:', error);
      document.getElementById('loginError').textContent = 'Login failed. Try again.';
  }
});