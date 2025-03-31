const employeeTable = document.getElementById("employeesTable");
const employeeForm = document.getElementById("employeeForm");
const employeeModel = document.getElementById("employeeModel");
const modelTitle = document.getElementById("ModelTitle");
const addEmployeeBtn = document.getElementById("addEmployeeBtn");
const closeModelBtn = document.querySelector(".close");
const logoutBtn = document.getElementById("logoutBtn");

addEmployeeBtn.addEventListener("click", openAddModel);
logoutBtn.addEventListener("click", logout);
closeModelBtn.addEventListener("click", closeModel);
employeeForm.addEventListener("submit", handleEmployeeSubmit);

document.addEventListener("DOMContentLoaded", loadEmployees);


async function loadEmployees() 
{
    try {
        const response = await fetch("/api/employees");
        const employees = await response.json();
        renderEmployees(employees);
    } catch (error) {
        console.error("Error loading employees:", error);
    }
}

function renderEmployees(employees) 
{
    const tbody = employeeTable.querySelector("tbody");
    tbody.innerHTML = "";

    employees.forEach((emp) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.department}</td>
            <td>${emp.email}</td>
            <td>${formatIndianRupees(emp.salary)}</td>
            <td>
                <button class="btn-edit" data-id="${emp.id}">Edit</button>
                <button class="btn-delete" data-id="${emp.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.querySelectorAll(".btn-edit").forEach((btn) => {
        btn.addEventListener("click", () => openEditModel(btn.dataset.id));
    });

    document.querySelectorAll(".btn-delete").forEach((btn) => {
        btn.addEventListener("click", () => deleteEmployee(btn.dataset.id));
    });
}

function formatIndianRupees(amount) 
{
    if (!amount) return "₹0.00";

    const num = typeof amount === "string" ? parseFloat(amount) : amount;

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);
}

function openAddModel() 
{
    modelTitle.textContent = "Add Employee";
    employeeForm.reset();
    document.getElementById("employeeId").value = "";
    employeeModel.style.display = "block";
}

async function openEditModel(id) 
{
    try {
        const response = await fetch(`/api/employees/${id}`);
        const employee = await response.json();

        modelTitle.textContent = "Edit Employee";
        document.getElementById("employeeId").value = employee.id;
        document.getElementById("name").value = employee.name;
        document.getElementById("department").value = employee.department;
        document.getElementById("email").value = employee.email;
        document.getElementById("salary").value = employee.salary;

        employeeModel.style.display = "block";
    } catch (error) {
        console.error("Error fetching employee:", error);
    }
}

async function handleEmployeeSubmit(e) 
{
    e.preventDefault();

    const id = document.getElementById("employeeId").value;
    const employee = {
        name: document.getElementById("name").value,
        department: document.getElementById("department").value,
        email: document.getElementById("email").value,
        salary: parseFloat(document.getElementById("salary").value),
    };

    try {
        const url = id ? `/api/employees/${id}` : "/api/employees";
        const method = id ? "PUT" : "POST";

        const response = await fetch(url, 
        {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employee),
        });

        if (response.ok) {
            closeModel();
            loadEmployees();
        }
    } catch (error) {
        console.error("Error saving employee:", error);
    }
}

async function deleteEmployee(id) 
{
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
        const response = await fetch(`/api/employees/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            loadEmployees();
        }
    } catch (error) {
        console.error("Error deleting employee:", error);
    }
}

function closeModel() 
{
    employeeModel.style.display = "none";
}


window.addEventListener("click", (event) =>{
    if (event.target === employeeModel) {
        closeModel();
    }
});

async function logout() 
{
    try {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/html/login.html";
    } catch (error) {
        console.error("Logout error:", error);
    }
}