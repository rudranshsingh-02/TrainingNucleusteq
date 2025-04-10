// admin.js
let currentProjectId = null;

document.addEventListener("DOMContentLoaded", () => {
  checkAdminSession();
  showSection("projects");
});

async function checkAdminSession() {
  try {
    const response = await fetch("/auth/current", { credentials: "include" });
    if (!response.ok) throw new Error("Not authenticated");
    const user = await response.json();
    sessionStorage.setItem("userName", user.name);
    sessionStorage.setItem("userEmail", user.email);
    document.getElementById(
      "adminInfo"
    ).textContent = `${user.name}(${user.role})`;
    if (user.role !== "admin") throw new Error("Unauthorized access");
  } catch (error) {
    alert("Admin access required");
    window.location.href = "index.html";
  }
}

function showSection(sectionId) {
  document.querySelectorAll(".dashboard-section").forEach((sec) => {
    sec.style.display = "none"; // Hide each section
  });

  document.getElementById("addProjectForm").classList.add("hidden");

  // Show the selected section
  document.getElementById(sectionId).style.display = "block";
  switch (sectionId) {
    case "projects":
      loadProjects();
      break;
    case "employees":
      loadEmployees();
      break;
    case "leaves":
      loadLeaves();
      break;
  }
}

// Projects Management
async function loadProjects() {
  try {
    const response = await fetch("/projects", { credentials: "include" });
    const projects = await response.json();
    const container = document.getElementById("projectsList");
    container.innerHTML = "";

    projects.forEach((project) => {
      const projectDiv = document.createElement("div");
      projectDiv.className =
        "bg-[#2c3e50] p-4 rounded-lg shadow mb-4 text-white";
      projectDiv.innerHTML = `
        <h3 class="text-xl font-bold text-white">${project.name}</h3>
        <p class="text-gray-300 mb-2">${project.description}</p>
        <p class="text-sm text-gray-400"><strong>Required Skills:</strong> ${project.requiredSkills}</p>
        <button id="toggle-suggestions-${project.id}" 
        onclick="showSuggestedEmployees('${project.id}')" 
        class="mt-3 text-cyan-400 hover:text-cyan-300 underline">
    Show Suggested Employees
</button>
<div id="suggestions-${project.id}" class="mt-3" style="display: none;"></div>

      `;
      container.appendChild(projectDiv);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

// Add project functionality
function toggleProjectForm() {
  const addProjectForm = document.getElementById("addProjectForm");

  if (addProjectForm.classList.contains("hidden")) {
    // Hide all sections before showing the form
    document.querySelectorAll(".dashboard-section").forEach((section) => {
      section.style.display = "none";
    });

    addProjectForm.classList.remove("hidden"); // Show form
  } else {
    showSection("projects"); // Return to projects section
  }
}

async function addProject(event) {
  event.preventDefault();
  try {
    const projectData = {
      name: document.getElementById("projectName").value,
      description: document.getElementById("projectDesc").value,
      requiredSkills: document
        .getElementById("projectSkills")
        .value.split(",")
        .map((s) => s.trim())
        .join(","), // Convert to CSV format
      estimatedDuration:
        parseInt(document.getElementById("projectDuration").value) || 0,
      isCompleted: false,
    };

    const response = await fetch("/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to add project");

    showNotification("Project added successfully");
    toggleProjectForm();
    loadProjects();
  } catch (error) {
    console.error("Add project error:", error);
    showNotification(error.message || "Failed to add project");
  }
}

async function showSuggestedEmployees(projectId) {
  const containerId = `suggestions-${projectId}`;
  const buttonId = `toggle-suggestions-${projectId}`;
  const container = document.getElementById(containerId);
  const button = document.getElementById(buttonId);

  // Toggle: If already visible, hide and update button text
  if (container && container.style.display === "block") {
    container.style.display = "none";
    if (button) button.textContent = "Show Suggested Employees";
    return;
  }

  // Set display block & update button
  if (container) {
    container.style.display = "block";
  }
  if (button) button.textContent = "Hide Suggested Employees";

  try {
    const [suggestionsResponse, leavesResponse] = await Promise.all([
      fetch(`/match/${projectId}`, { credentials: "include" }),
      fetch("/leaves", { credentials: "include" }),
    ]);

    if (!suggestionsResponse.ok || !leavesResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const suggestions = await suggestionsResponse.json();
    const allLeaves = await leavesResponse.json();

    const approvedLeaves = allLeaves.filter((leave) => leave.status === "APPROVED");
    const onLeaveIds = approvedLeaves.map((leave) => leave.employee?.id);
    const filteredSuggestions = suggestions.filter(
      (employee) => employee.id && !onLeaveIds.includes(employee.id)
    );

    container.innerHTML = "";

    if (filteredSuggestions.length > 0) {
      const title = document.createElement("h4");
      title.className = "font-bold mt-4 text-white";
      title.textContent = "Suggested Employees:";
      container.appendChild(title);
    } else {
      const noEmployeesMsg = document.createElement("p");
      noEmployeesMsg.className = "text-gray-300 mt-2";
      noEmployeesMsg.textContent = "No available employees matching skills";
      container.appendChild(noEmployeesMsg);
    }

    filteredSuggestions.forEach((employee) => {
      const div = document.createElement("div");
      div.className = "flex items-center justify-between bg-[#374151] p-3 rounded mt-3 text-white";
      div.id = `employee-${employee.id}`;

      const assigned = employee.assignedToProject;

      div.innerHTML = `
        <div class="flex-col">
          <span class="font-semibold">${employee.name}</span>
          <div class="text-gray-300 text-sm">${employee.email}</div>
          <div class="text-sm mt-1 text-gray-400">
            Skills: ${
              Array.isArray(employee.skills)
                ? employee.skills.join(", ")
                : employee.skills || "No skills listed"
            }
          </div>
        </div>
        <div class="flex items-center space-x-2">
          ${
            assigned
              ? `<span class="text-gray-400">Assigned</span>
                 <button class="text-white px-2 py-1 rounded bg-red-500 hover:bg-red-600"
                   onclick="removeEmployee('${projectId}', '${employee.id}')">
                   Remove
                 </button>`
              : `<button class="text-white px-2 py-1 rounded bg-green-600 hover:bg-green-700"
                   onclick="assignEmployee('${projectId}', '${employee.id}')">
                   Assign
                 </button>
                 <button class="text-white px-2 py-1 rounded bg-red-600 hover:bg-red-700"
                   onclick="removeEmployee('${projectId}', '${employee.id}')">
                   Reject
                 </button>`
          }
        </div>
      `;

      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading suggestions:", error);
    container.innerHTML = '<p class="text-red-500">Failed to load suggestions.</p>';
  }
}


let notificationTimeout;

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className =
    "fixed top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded";
  notification.textContent = message;
  document.body.appendChild(notification);

  notificationTimeout = setTimeout(() => {
    notification.remove();
  }, 2000);
}

async function assignEmployee(projectId, employeeId) {
  try {
    const response = await fetch(`/assign/${projectId}/${employeeId}`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to assign employee");

    // Update UI dynamically
    const employeeDiv = document.getElementById(`employee-${employeeId}`);
    if (employeeDiv) {
      const assignBtn = employeeDiv.querySelector(".assign-btn");
      const rejectBtn = employeeDiv.querySelector(".reject-btn");
      assignBtn.textContent = "Assigned";
      assignBtn.classList.remove("bg-green-500");
      assignBtn.classList.add("bg-gray-400", "cursor-not-allowed");
      assignBtn.disabled = true;

      rejectBtn.textContent = "Remove"; // Change Reject to Remove
    }

    console.log(`Employee ${employeeId} assigned to project ${projectId}`);
  } catch (error) {
    console.error("Error assigning employee:", error);
  }
}

async function removeEmployee(projectId, employeeId) {
  try {
    const response = await fetch(`/unassign/${projectId}/${employeeId}`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to remove employee");

    // Update UI dynamically
    const employeeDiv = document.getElementById(`employee-${employeeId}`);
    if (employeeDiv) {
      const assignBtn = employeeDiv.querySelector(".assign-btn");
      const rejectBtn = employeeDiv.querySelector(".reject-btn");
      assignBtn.textContent = "Assign";
      assignBtn.classList.remove("bg-gray-400", "cursor-not-allowed");
      assignBtn.classList.add("bg-green-500");
      assignBtn.disabled = false;

      rejectBtn.textContent = "Reject"; // Change Remove back to Reject
    }

    console.log(`Employee ${employeeId} removed from project ${projectId}`);
  } catch (error) {
    console.error("Error removing employee:", error);
  }
}

// Employees Management
async function loadEmployees() {
  try {
    const response = await fetch("/employees", { credentials: "include" });
    const employees = await response.json();
    const container = document.getElementById("employeesList");
    container.innerHTML = "";

    employees.forEach((employee) => {
      const div = document.createElement("div");
      div.className = "bg-[#2c3e50] p-4 rounded-lg shadow text-white";
      div.innerHTML = `
        <h3 class="font-bold text-lg">${employee.name}</h3>
        <p class="text-gray-300">${employee.email}</p>
        <p class="text-sm mt-2 text-gray-400">
            <strong>Skills:</strong> ${
              Array.isArray(employee.skills)
                ? employee.skills.join(", ")
                : employee.skills || "None"
            }
        </p>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading employees:", error);
  }
}

async function handleUpgrade(email) {
  if (!confirm(`Make this user an admin?`)) return;

  try {
    const response = await fetch(`/auth/upgrade/${email}`, {
      method: "PUT",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Upgrade failed");
    showNotification(`User upgraded to admin successfully`);
    loadEmployees();
  } catch (error) {
    console.error("Upgrade error:", error);
    showNotification(`Error upgrading user`);
  }
}

async function loadLeaves() {
  try {
    const response = await fetch("/leaves", { credentials: "include" });
    const leaves = await response.json();
    const currentDate = new Date();

    // Filter out expired leaves
    const validLeaves = leaves.filter((leave) => {
      const endDate = new Date(leave.endDate);
      return endDate >= currentDate;
    });

    // Auto-reject expired leaves
    const expiredLeaves = leaves.filter((leave) => {
      const endDate = new Date(leave.endDate);
      return endDate < currentDate;
    });
    await Promise.all(
      expiredLeaves.map((leave) =>
        fetch(`/leaves/${leave.id}/REJECTED`, { method: "PUT" })
      )
    );

    renderLeaves(validLeaves);
  } catch (error) {
    console.error("Error loading leaves:", error);
  }
}

async function searchLeaves() {
  const email = document.getElementById("searchEmail").value;
  if (!email) return loadLeaves();

  try {
    const employeesResponse = await fetch("/employees", {
      credentials: "include",
    });
    const employees = await employeesResponse.json();
    const employee = employees.find((e) => e.email === email);

    if (!employee) {
      alert("Employee not found");
      return;
    }

    const leavesResponse = await fetch(`/leaves/employee/${employee.id}`, {
      credentials: "include",
    });
    const leaves = await leavesResponse.json();
    renderLeaves(leaves);
  } catch (error) {
    console.error("Search error:", error);
  }
}

function renderLeaves(leaves) {
  const container = document.getElementById("leavesList");
  container.innerHTML = "";

  if (leaves.length === 0) {
    container.innerHTML = "<p class='text-gray-400'>No leave requests found</p>";
    return;
  }

  leaves.forEach((leave) => {
    const div = document.createElement("div");
    div.className = "bg-[#2c3e50] p-4 rounded-lg shadow mb-4 text-white";

    div.innerHTML = `
      <div class="flex justify-between items-start gap-4 flex-wrap">
        <div>
          <p class="text-lg font-semibold text-white"><strong>Employee:</strong> ${leave.employee.name}</p>
          <p class="text-gray-300">${formatDate(leave.startDate)} - ${formatDate(leave.endDate)}</p>
          <span class="inline-block mt-2 px-2 py-1 rounded text-sm font-medium ${getStatusClass(leave.status)}">
            ${leave.status}
          </span>
        </div>

        ${
          leave.status === "PENDING"
            ? `
          <div class="flex gap-3 mt-2 sm:mt-0">
            <button onclick="updateLeaveStatus('${leave.id}', 'APPROVED')" 
              class="text-green-400 hover:text-green-300 text-xl font-bold">
              ✓
            </button>
            <button onclick="updateLeaveStatus('${leave.id}', 'REJECTED')" 
              class="text-red-400 hover:text-red-300 text-xl font-bold">
              ✗
            </button>
          </div>
          `
            : ""
        }
      </div>
    `;

    container.appendChild(div);
  });
}


async function updateLeaveStatus(leaveId, status) {
  try {
    await fetch(`/leaves/${leaveId}/${status}`, {
      method: "PUT",
      credentials: "include",
    });
    loadLeaves();
  } catch (error) {
    console.error("Status update error:", error);
  }
}

// Helpers
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}

function getStatusClass(status) {
  const classes = {
    APPROVED: "bg-green-800 text-green-100",
    PENDING: "bg-yellow-700 text-yellow-100",
    REJECTED: "bg-red-800 text-red-100",
  };
  return classes[status] || "bg-gray-700 text-gray-100";
}


function logout() {
  fetch("/auth/logout", {
    method: "POST",
    credentials: "include",
  }).then(() => {
    window.location.href = "index.html";
  });
}
