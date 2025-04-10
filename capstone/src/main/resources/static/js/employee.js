document.addEventListener("DOMContentLoaded", async () => {
  await checkSessionAndFetchUser();
  showView("allProjects");
  // Load initial data
  loadCompanyProjects();
  loadEmployeeProjects();
  setupLeaveForm();
  loadProfile();
  loadLeaves();
});

// Authentication and session management
async function checkSessionAndFetchUser() {
  try {
    const response = await fetch("/auth/current", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Not authenticated");

    const userData = await response.json();
    sessionStorage.setItem("employeeId", userData.employeeId);
    sessionStorage.setItem("userRole", userData.role);
    sessionStorage.setItem("userName", userData.name);
    sessionStorage.setItem("userEmail", userData.email);

    document.getElementById("employeeInfo").textContent = `${userData.name} (${userData.role})`;
  } catch (error) {
    alert("Please login first");
    window.location.href = "index.html";
  }
}

// View navigation
function showView(viewId) {
  // Hide all sections
  document.querySelectorAll(".view-section").forEach((section) => {
    section.style.display = "none";
  });
  // Show the selected section
  const section = document.getElementById(viewId);
  if (section) {
    section.style.display = "block";
  }
  switch (viewId) {
    case "allProjects":
      loadCompanyProjects();
      break;
    case "assignedProjects":
      loadEmployeeProjects();
      break;
    case "profile":
      loadProfile();
      break;
    case "leaves":
      loadLeaves();
      break;
  }
}

async function loadCompanyProjects() {
    try {
      const response = await fetch("/projects", { credentials: "include" });
      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);
  
      const text = await response.text();
      console.log("Raw Response:", text);
  
      const projects = JSON.parse(text);
      console.log("Parsed JSON:", projects);
  
      if (!Array.isArray(projects)) throw new Error("Invalid response format");
  
      const container = document.getElementById("companyProjects");
      container.innerHTML = "";
  
      if (projects.length === 0) {
        container.innerHTML =
          '<p class="text-gray-400">No projects available</p>';
        return;
      }
  
      projects.forEach((project) => {
        const projectDiv = document.createElement("div");
        projectDiv.className =
          "bg-[#2c3e50] p-4 rounded-lg shadow border border-[#3d566e] w-full max-w-md";
  
        const projectName = document.createElement("h3");
        projectName.className = "text-xl font-bold text-white";
        projectName.textContent = project.name;
  
        const projectDescription = document.createElement("p");
        projectDescription.className = "text-gray-400 mt-2";
        projectDescription.textContent = project.description;
  
        const btn = document.createElement("button");
        btn.className =
          "bg-[#00bcd4] hover:bg-[#00acc1] text-white px-4 py-2 rounded mt-4";
        btn.textContent = "View Details";
        btn.onclick = () => fetchProjectDetails(project.id);
  
        projectDiv.appendChild(projectName);
        projectDiv.appendChild(projectDescription);
        projectDiv.appendChild(btn);
        container.appendChild(projectDiv);
      });
    } catch (error) {
      console.error("Error loading projects:", error);
      document.getElementById("companyProjects").innerHTML =
        '<p class="text-red-500">Error loading projects</p>';
    }
  }
  

// Function to load projects assigned to the current employee
async function loadEmployeeProjects() {
  try {
    const employeeId = sessionStorage.getItem("employeeId");
    if (!employeeId) {
      throw new Error("No employee ID found");
    }

    const response = await fetch("http://localhost:8080/employees/projects", {
      credentials: "include",
    });

    console.log("Response Status:", response.status);

    if (!response.ok) {
      throw new Error(
        `Server returned ${response.status}: ${response.statusText}`
      );
    }

    const text = await response.text();
    console.log("Raw Response:", text);
    const projects = JSON.parse(text);
    console.log("Parsed Projects:", projects);

    const container = document.getElementById("projectList");
    if (!container) {
      console.error("Container 'projectList' not found");
      return;
    }

    container.innerHTML = "";

    if (!Array.isArray(projects) || projects.length === 0) {
      container.innerHTML =
        '<li class="p-4 text-gray-600">No assigned projects</li>';
      return;
    }

    projects.forEach((project) => {
      const projectItem = document.createElement("li");
      projectItem.className = "border p-4 rounded-lg shadow-sm";

      const projectName = document.createElement("h3");
      projectName.className = "text-xl font-bold text-white";
      projectName.textContent = project.name;

      const projectDescription = document.createElement("p");
      projectDescription.className = "text-gray-600 mt-2";
      projectDescription.textContent = project.description;

      const btn = document.createElement("button");
      btn.className =
        "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-3";
      btn.textContent = "View Details";
      btn.onclick = () => fetchProjectDetails(project.id);

      projectItem.appendChild(projectName);
      projectItem.appendChild(projectDescription);
      projectItem.appendChild(btn);
      container.appendChild(projectItem);
    });
  } catch (error) {
    console.error("Error loading employee projects:", error);
    const container = document.getElementById("projectList");
    if (container) {
      container.innerHTML =
        '<li class="p-4 text-red-500">Error loading projects: ' +
        error.message +
        "</li>";
    }
  }
}

// Helper function to get employee ID from session
function getCurrentEmployeeId() {
  return (
    document
      .querySelector("[data-employee-id]")
      ?.getAttribute("data-employee-id") ||
    localStorage.getItem("currentEmployeeId")
  );
}

async function assignEmployee(projectId, employeeId) {
  try {
    const response = await fetch(`/assign/${projectId}/${employeeId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Server returned ${response.status}`);
    }

    // Update UI to show assigned status
    const employeeElement = document.getElementById(`employee-${employeeId}`);
    if (employeeElement) {
      const buttonContainer =
        employeeElement.querySelector(".flex.items-center");
      buttonContainer.innerHTML = `
                <span class="text-gray-600 mr-2">Assigned</span>
                <button class="remove-btn text-white px-2 py-1 rounded bg-red-500"
                    onclick="removeEmployee('${projectId}', '${employeeId}')">
                    Remove
                </button>
            `;
    }

    // Show success message
    showNotification("Employee assigned successfully", "success");
  } catch (error) {
    console.error("Error assigning employee:", error);
    showNotification("Failed to assign employee: " + error.message, "error");
  }
}

function showNotification(message, type = "info") {
  let notification = document.getElementById("notification");
  if (!notification) {
    notification = document.createElement("div");
    notification.id = "notification";
    notification.className = "fixed top-4 right-4 p-4 rounded shadow-lg";
    document.body.appendChild(notification);
  }

  notification.className = "fixed top-4 right-4 p-4 rounded shadow-lg";
  if (type === "success") notification.className += " bg-green-500 text-white";
  else if (type === "error") notification.className += " bg-red-500 text-white";
  else notification.className += " bg-blue-500 text-white";

  notification.textContent = message;

  // Show and auto-hide
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

// Project details modal
async function fetchProjectDetails(projectId) {
  try {
    const response = await fetch(`/projects/${projectId}`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch project details");
    const project = await response.json();

    document.getElementById("modalProjectTitle").textContent = project.name;
    document.getElementById("modalProjectDesc").textContent =
      project.description || "No description available";

    let skillsDisplay;
    if (Array.isArray(project.requiredSkills)) {
      skillsDisplay = project.requiredSkills.join(", ");
    } else if (typeof project.requiredSkills === "string") {
      skillsDisplay = project.requiredSkills;
    } else {
      skillsDisplay = "No specific skills required";
    }
    document.getElementById("modalProjectSkills").textContent = skillsDisplay;

    document.getElementById("projectModal").style.display = "block";
  } catch (error) {
    console.error("Error fetching project:", error);
    alert("Failed to load project details");
  }
}
console.log("LEAVES LOADED:", leaves);
// Leave form handling
function setupLeaveForm() {
  const form = document.getElementById("leaveForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const employeeId = sessionStorage.getItem("employeeId");
    if (!employeeId) {
      alert("Please login first");
      return;
    }

    const formData = {
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value,
    };

    if (!formData.startDate || !formData.endDate) {
      alert("Please select both start and end dates");
      return;
    }

    try {
      const response = await fetch(`/leaves/${employeeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Leave request failed");

      const result = await response.text();
      alert(result);
      form.reset();
    } catch (error) {
      console.error("Leave error:", error);
      alert(error.message || "Failed to submit leave request");
    }
  });
}

// Profile management
async function loadProfile() {
  const employeeId = sessionStorage.getItem("employeeId");
  if (!employeeId) {
    console.error("No employee ID found");
    return;
  }

  try {
    const response = await fetch(`/employees/${employeeId}`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to load profile");

    const profile = await response.json();
    if (!profile) throw new Error("No profile data received");

    document.getElementById("profileName").textContent =
      profile.name || "Not available";
    document.getElementById("profileEmail").textContent =
      profile.email || "Not available";

    // Handle skills
    let skillsText;
    if (Array.isArray(profile.skills)) {
      skillsText = profile.skills.join(", ");
    } else if (typeof profile.skills === "string") {
      skillsText = profile.skills;
    } else {
      skillsText = "No skills listed";
    }
    document.getElementById("profileSkills").textContent = skillsText;
  } catch (error) {
    console.error("Error loading profile:", error);
    document.getElementById("profileName").textContent =
      "Error loading profile";
    document.getElementById("profileSkills").textContent =
      "Error loading skills";
  }
}

function showAddSkillForm() {
  document.getElementById("skillAddForm").classList.remove("hidden");
  document.getElementById("newSkill").focus();
}

function hideAddSkillForm() {
  document.getElementById("skillAddForm").classList.add("hidden");
  document.getElementById("newSkill").value = "";
}

async function addSkill() {
  const newSkill = document.getElementById("newSkill").value.trim();
  if (!newSkill) {
    alert("Please enter a skill");
    return;
  }

  const employeeId = sessionStorage.getItem("employeeId");
  if (!employeeId) {
    alert("Please login first");
    return;
  }

  try {
    const response = await fetch(`/employees/${employeeId}/add-skill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ skill: newSkill }),
      credentials: "include",
    });
    const responseClone = response.clone();

    try {
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Failed to add skill"
        );
      }
      alert("Skill added successfully!");
    } catch (jsonError) {
      try {
        const textResult = await responseClone.text();
        if (!response.ok) {
          throw new Error(textResult || "Failed to add skill");
        }
        alert(textResult || "Skill added successfully!");
      } catch (textError) {
        throw new Error("Failed to process server response");
      }
    }

    // Refresh the profile and reset form
    loadProfile();
    hideAddSkillForm();
    document.getElementById("newSkill").value = "";
  } catch (error) {
    console.error("Error adding skill:", error);
    alert(error.message || "Failed to add skill");
  }
}

// Modal controls
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

function logout() {
  fetch("/auth/logout", {
    method: "POST",
    credentials: "include",
  })
    .then(() => {
      sessionStorage.clear();
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Logout error:", error);
      sessionStorage.clear();
      window.location.href = "index.html";
    });
}

async function loadLeaves() {
  const employeeId = sessionStorage.getItem("employeeId");
  if (!employeeId) return;

  try {
    const response = await fetch(`/leaves/employee/${employeeId}`, {
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to load leaves");

    const leaves = await response.json();
    const leavesList = document.getElementById("leavesList");
    leavesList.innerHTML = "";

    if (!leaves || leaves.length === 0) {
      leavesList.innerHTML = `
              <tr>
                  <td colspan="3" class="py-4 px-4 border text-center text-gray-600">
                      No leave applications found
                  </td>
              </tr>`;
      return;
    }

    leaves.forEach((leave) => {
      const row = document.createElement("tr");
      row.className = "hover:bg-gray-50";
      row.innerHTML = `
              <td class="py-2 px-4 border">${formatDate(leave.startDate)}</td>
              <td class="py-2 px-4 border">${formatDate(leave.endDate)}</td>
              <td class="py-2 px-4 border">
                  <span class="px-2 py-1 rounded-full text-xs 
                      ${getStatusClass(leave.status)}">
                      ${leave.status}
                  </span>
              </td>`;
      leavesList.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading leaves:", error);
    document.getElementById("leavesList").innerHTML = `
          <tr>
              <td colspan="3" class="py-4 px-4 border text-center text-red-500">
                  Error loading leaves: ${error.message}
              </td>
          </tr>`;
  }
}

function formatDate(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

function getStatusClass(status) {
  switch (status?.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
