document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get role selection from radio buttons or dropdown
    const role = document.querySelector('input[name="role"]:checked')?.value;

    if (!role) {
        alert("Please select a role before logging in.");
        return;
    }

    const loginData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        role: role // Include role in the request
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
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
});
