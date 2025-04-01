// employee.js
document.addEventListener("DOMContentLoaded", async () => {
  await checkSessionAndFetchUser();
  // Initialize the first view
  showView('allProjects');
  // Load initial data
  loadCompanyProjects();
  loadAssignedProjects();
  setupLeaveForm();
  loadProfile();
  loadLeaves();
});

// Authentication and session management
async function checkSessionAndFetchUser() {
  try {
      const response = await fetch("/auth/current", {
          method: "GET",
          credentials: "include"
      });
      if (!response.ok) throw new Error("Not authenticated");
      
      const userData = await response.json();
      sessionStorage.setItem("employeeId", userData.employeeId);
      sessionStorage.setItem("userRole", userData.role);
      sessionStorage.setItem("userName", userData.name);
      sessionStorage.setItem("userEmail", userData.email);

      document.getElementById("employeeName").textContent = userData.name;
      document.getElementById("employeeRole").textContent = userData.role;
  } catch (error) {
      alert("Please login first");
      window.location.href = "index.html";
  }
}

// View navigation - Fixed this function
function showView(viewId) {
  // Hide all sections
  document.querySelectorAll('.view-section').forEach(section => {
      section.style.display = 'none';
  });
  // Show the selected section
  const section = document.getElementById(viewId);
  if (section) {
      section.style.display = 'block';
  }
  
  // Refresh the content if needed
  switch(viewId) {
      case 'allProjects':
          loadCompanyProjects();
          break;
      case 'assignedProjects':
          loadAssignedProjects();
          break;
      case 'profile':
          loadProfile();
          break;
  }
}

// Project loading functions
async function loadCompanyProjects() {
  try {
      const response = await fetch("/projects", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to load projects");
      const projects = await response.json();
      const container = document.getElementById("companyProjects");
      container.innerHTML = ''; // Clear previous content
      
      if (projects.length === 0) {
          container.innerHTML = '<p class="text-gray-600">No projects available</p>';
          return;
      }
      
      projects.forEach(project => {
          const btn = document.createElement("button");
          btn.className = "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-2";
          btn.textContent = project.name;
          btn.onclick = () => fetchProjectDetails(project.id);
          container.appendChild(btn);
      });
  } catch (error) {
      console.error("Error loading projects:", error);
      document.getElementById("companyProjects").innerHTML = 
          '<p class="text-red-500">Error loading projects</p>';
  }
}

async function loadAssignedProjects() {
  const employeeId = sessionStorage.getItem("employeeId");
  if (!employeeId) {
      console.error("No employee ID found");
      return;
  }

  try {
      const response = await fetch("/projects", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to load projects");
      
      const allProjects = await response.json();
      const list = document.getElementById("projectList");
      list.innerHTML = ''; // Clear previous content

      // Filter projects where current employee is in assignedEmployees
      const assignedProjects = allProjects.filter(project => 
          project.assignedEmployees?.some(employee => employee.id == employeeId)
      );

      if (assignedProjects.length === 0) {
          list.innerHTML = '<li class="text-gray-600">No assigned projects</li>';
          return;
      }

      assignedProjects.forEach(project => {
          const li = document.createElement("li");
          const btn = document.createElement("button");
          btn.className = "text-blue-500 hover:text-blue-700";
          btn.textContent = project.name || "Unnamed Project";
          btn.onclick = () => fetchProjectDetails(project.id);
          li.appendChild(btn);
          list.appendChild(li);
      });
  } catch (error) {
      console.error("Error loading assigned projects:", error);
      document.getElementById("projectList").innerHTML = 
          '<li class="text-red-500">Error loading projects</li>';
  }
}

// Project details modal
async function fetchProjectDetails(projectId) {
  try {
      const response = await fetch(`/projects/${projectId}`, { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch project details");
      const project = await response.json();
      
      document.getElementById("modalProjectTitle").textContent = project.name;
      document.getElementById("modalProjectDesc").textContent = project.description || "No description available";
      
      // Fix for requiredSkills - handle both string and array cases
      let skillsDisplay;
      if (Array.isArray(project.requiredSkills)) {
          skillsDisplay = project.requiredSkills.join(", ");
      } else if (typeof project.requiredSkills === 'string') {
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
          endDate: document.getElementById("endDate").value
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
              credentials: "include"
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
      const response = await fetch(`/employees/${employeeId}`, { credentials: "include" });
      if (!response.ok) throw new Error("Failed to load profile");
      
      const profile = await response.json();
      if (!profile) throw new Error("No profile data received");

      document.getElementById("profileName").textContent = profile.name || "Not available";
      document.getElementById("profileEmail").textContent = profile.email || "Not available";

      // Handle skills - could be string or array
      let skillsText;
      if (Array.isArray(profile.skills)) {
          skillsText = profile.skills.join(", ");
      } else if (typeof profile.skills === 'string') {
          skillsText = profile.skills;
      } else {
          skillsText = "No skills listed";
      }
      document.getElementById("profileSkills").textContent = skillsText;
  } catch (error) {
      console.error("Error loading profile:", error);
      document.getElementById("profileName").textContent = "Error loading profile";
      document.getElementById("profileSkills").textContent = "Error loading skills";
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
              // "Authorization": "Bearer YOUR_TOKEN" // Uncomment if needed
          },
          body: JSON.stringify({ skill: newSkill }),
          credentials: "include"
      });

      // Clone the response to read it multiple times if needed
      const responseClone = response.clone();
      
      // First try to parse as JSON
      try {
          const result = await response.json();
          if (!response.ok) {
              throw new Error(result.message || result.error || "Failed to add skill");
          }
          alert("Skill added successfully!");
      } catch (jsonError) {
          // If JSON parsing fails, try reading as text
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

// Logout
function logout() {
  fetch("/auth/logout", { 
      method: "POST",
      credentials: "include"
  })
  .then(() => {
      sessionStorage.clear();
      window.location.href = "index.html";
  })
  .catch(error => {
      console.error("Logout error:", error);
      sessionStorage.clear();
      window.location.href = "index.html";
  });
}

// Updated loadLeaves function to match your API response structure
async function loadLeaves() {
  const employeeId = sessionStorage.getItem("employeeId");
  if (!employeeId) return;

  try {
      const response = await fetch(`/leaves/employee/${employeeId}`, {
          credentials: "include"
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

      leaves.forEach(leave => {
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

// Keep these helper functions the same
function formatDate(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

function getStatusClass(status) {
  switch(status?.toLowerCase()) {
      case 'approved':
          return 'bg-green-100 text-green-800';
      case 'pending':
          return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
          return 'bg-red-100 text-red-800';
      default:
          return 'bg-gray-100 text-gray-800';
  }
}