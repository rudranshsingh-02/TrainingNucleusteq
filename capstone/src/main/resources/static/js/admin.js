
// admin.js
let currentProjectId = null;

document.addEventListener("DOMContentLoaded", () => {
    checkAdminSession();
    showSection('projects');
});

async function checkAdminSession() {
    try {
        const response = await fetch("/auth/current", { credentials: "include" });
        if (!response.ok) throw new Error("Not authenticated");
        const user = await response.json();
        if (user.role !== "admin") throw new Error("Unauthorized access");
    } catch (error) {
        alert("Admin access required");
        window.location.href = "index.html";
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.dashboard-section').forEach(sec => {
        sec.classList.remove('active-section');
    });
    document.getElementById(sectionId).classList.add('active-section');
    
    switch(sectionId) {
        case 'projects': loadProjects(); break;
        case 'employees': loadEmployees(); break;
        case 'leaves': loadLeaves(); break;
    }
}

// Projects Management
async function loadProjects() {
    try {
        const response = await fetch("/projects", { credentials: "include" });
        const projects = await response.json();
        const container = document.getElementById("projectsList");
        container.innerHTML = "";

        projects.forEach(project => {
            const projectDiv = document.createElement("div");
            projectDiv.className = "bg-white p-4 rounded-lg shadow mb-4";
            projectDiv.innerHTML = `
                <h3 class="text-xl font-bold">${project.name}</h3>
                <p class="text-gray-600 mb-2">${project.description}</p>
                <p class="text-sm"><strong>Required Skills:</strong> ${project.requiredSkills}</p>
                <button onclick="showSuggestedEmployees('${project.id}')" 
                        class="mt-2 text-blue-500 hover:text-blue-700">
                    Show Suggested Employees
                </button>
                <div id="suggestions-${project.id}" class="mt-2"></div>
            `;
            container.appendChild(projectDiv);
        });
    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

// Add project functionality
function toggleProjectForm() {
    const form = document.getElementById('addProjectForm');
    form.classList.toggle('hidden');
}

async function addProject(event) {
    event.preventDefault();
    try {
        const projectData = {
            name: document.getElementById('projectName').value,
            description: document.getElementById('projectDesc').value,
            requiredSkills: document.getElementById('projectSkills').value.split(',').map(s => s.trim()).join(','),  // Convert to CSV format
            estimatedDuration: parseInt(document.getElementById('projectDuration').value) || 0,
            isCompleted: false 
        };        

        const response = await fetch('/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData),
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Failed to add project');
        
        showNotification('Project added successfully');
        toggleProjectForm();
        loadProjects();
    } catch (error) {
        console.error('Add project error:', error);
        showNotification(error.message || 'Failed to add project');
    }
}

async function showSuggestedEmployees(projectId) {
    currentProjectId = projectId;
    try {
        // Fetch suggestions and leave data in parallel
        const [suggestionsResponse, leavesResponse] = await Promise.all([
            fetch(`/match/${projectId}`, { credentials: "include" }),
            fetch("/leaves", { credentials: "include" })
        ]);

        // ✅ Check if responses are OK before parsing JSON
        if (!suggestionsResponse.ok || !leavesResponse.ok) {
            throw new Error("Failed to fetch data");
        }

        const suggestions = await suggestionsResponse.json();
        const allLeaves = await leavesResponse.json();

        // ✅ Filter only APPROVED leaves
        const approvedLeaves = allLeaves.filter(leave => leave.status === "APPROVED");
        const onLeaveIds = approvedLeaves.map(leave => leave.employee?.id); // Ensure employee exists

        // ✅ Remove employees who are on leave
        const filteredSuggestions = suggestions.filter(employee => 
            employee.id && !onLeaveIds.includes(employee.id) // Ensure employee has ID
        );

        // ✅ Ensure container exists
        const container = document.getElementById(`suggestions-${projectId}`);
        if (!container) {
            console.error(`Error: Container "suggestions-${projectId}" not found.`);
            return;
        }

        // ✅ Clear previous content
        container.innerHTML = filteredSuggestions.length > 0 ? 
            "<h4 class='font-bold mt-4'>Suggested Employees:</h4>" : 
            "<p>No available employees matching skills</p>";
    
        console.log("Suggestions API Response:", suggestions);

        // ✅ Display employees
        filteredSuggestions.forEach(employee => {
            const div = document.createElement("div");
            div.className = "flex items-center justify-between bg-gray-50 p-2 rounded mt-2";
            div.innerHTML = `
                <div>
                    <span class="font-medium">${employee.name}</span>
                    <span class="text-gray-600 text-sm">${employee.email}</span>
                </div>
                <div>
                    <span class="action-btn text-green-500" 
                          onclick="assignEmployee('${employee.id}')">✓</span>
                    <span class="action-btn text-red-500" 
                          onclick="removeEmployee('${employee.id}')">✗</span>
                </div>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error("Error loading suggestions:", error);
    }
}

// async function showSuggestedEmployees(projectId) {
//     async function showSuggestedEmployees(projectId) {
//         // Fetch suggested employees
//         console.log("Fetching employees for project:", projectId);
    
//         // Make sure filteredSuggestions has data
//         console.log("Filtered Suggestions:", filteredSuggestions);
    
//         filteredSuggestions.forEach(employee => {
//             console.log("Employee:", employee);  // Check each employee
    
//             const div = document.createElement("div");
//             div.innerHTML = `
//                 <div class="flex-1">
//                     <div class="font-medium">${employee.name}</div>
//                     <div class="text-gray-600 text-sm">${employee.email}</div>
//                     <div class="text-xs mt-1 text-gray-500">
//                         Skills: ${Array.isArray(employee.skills) ? 
//                             employee.skills.join(', ') : 
//                             employee.skills}
//                     </div>
//                 </div>
//             `;
//             container.appendChild(div);
//         });
//     }
    

let notificationTimeout;

function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "fixed top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded";
    notification.textContent = message;
    document.body.appendChild(notification);

    notificationTimeout = setTimeout(() => {
        notification.remove();
    }, 2000);
}

// async function assignEmployee(employeeId) {
//     try {
//         await fetch(`/match/${currentProjectId}/assign/${employeeId}`, {
//             method: "POST",
//             credentials: "include"
//         });
//         showSuggestedEmployees(currentProjectId);
//         loadProjects();
//     } catch (error) {
//         console.error("Assignment error:", error);
//     }
// }
// async function assignEmployee(employeeId, employeeName) {
//     try {
//         await fetch(`/match/${currentProjectId}/assign/${employeeId}`, {
//             method: "POST",
//             credentials: "include"
//         });
        
//         // Remove from list immediately
//         const container = document.getElementById(`suggestions-${currentProjectId}`);
//         const employeeDiv = container.querySelector(`[onclick*="${employeeId}"]`);
//         if (employeeDiv) employeeDiv.parentElement.parentElement.remove();
        
//         showNotification(`${employeeName} assigned to project`);
//         loadProjects();
//     } catch (error) {
//         console.error("Assignment error:", error);
//         showNotification(`Error assigning ${employeeName}`);
//     }
// }

// async function removeEmployee(employeeId) {
//     try {
//         await fetch(`/match/${currentProjectId}/remove/${employeeId}`, {
//             method: "POST",
//             credentials: "include"
//         });
//         showSuggestedEmployees(currentProjectId);
//         loadProjects();
//     } catch (error) {
//         console.error("Removal error:", error);
//     }
// }
// async function removeEmployee(employeeId, employeeName) {
//     try {
//         await fetch(`/match/${currentProjectId}/remove/${employeeId}`, {
//             method: "POST",
//             credentials: "include"
//         });
        
//         // Remove from list immediately
//         const container = document.getElementById(`suggestions-${currentProjectId}`);
//         const employeeDiv = container.querySelector(`[onclick*="${employeeId}"]`);
//         if (employeeDiv) employeeDiv.parentElement.parentElement.remove();
        
//         showNotification(`${employeeName} removed from project`);
//         loadProjects();
//     } catch (error) {
//         console.error("Removal error:", error);
//         showNotification(`Error removing ${employeeName}`);
//     }
// }
async function assignEmployee(employeeId, employeeName) {
    try {
        // ... existing API call ...
        
        // Immediate removal
        const employeeDiv = document.querySelector(`[onclick*="assignEmployee('${employeeId}'"]`).closest('div');
        if (employeeDiv) employeeDiv.remove();
        
        showNotification(`${employeeName} assigned successfully`);
    } catch (error) {
        // ... error handling ...
    }
}

async function removeEmployee(employeeId, employeeName) {
    try {
        // ... existing API call ...
        
        // Immediate removal
        const employeeDiv = document.querySelector(`[onclick*="removeEmployee('${employeeId}'"]`).closest('div');
        if (employeeDiv) employeeDiv.remove();
        
        showNotification(`${employeeName} removed from suggestions`);
    } catch (error) {
        // ... error handling ...
    }
}
// Employees Management
async function loadEmployees() {
    try {
        const response = await fetch("/employees", { credentials: "include" });
        const employees = await response.json();
        const container = document.getElementById("employeesList");
        container.innerHTML = "";

        employees.forEach(employee => {
            const div = document.createElement("div");
            div.className = "bg-white p-4 rounded-lg shadow";
            div.innerHTML = `
                <h3 class="font-bold">${employee.name}</h3>
                <p class="text-gray-600">${employee.email}</p>
                <p class="text-sm mt-2"><strong>Skills:</strong> ${employee.skills}</p>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error("Error loading employees:", error);
    }
}

// async function loadEmployees() {
//     try {
//         const response = await fetch("/employees", { credentials: "include" });
//         const employees = await response.json();
//         const container = document.getElementById("employeesList");
//         container.innerHTML = "";

//         employees.forEach(employee => {
//             const div = document.createElement("div");
//             div.className = "bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50";
//             div.innerHTML = `
//                 <div class="flex justify-between items-center">
//                     <div>
//                         <h3 class="font-bold">${employee.name}</h3>
//                         <p class="text-gray-600">${employee.email}</p>
//                         <p class="text-sm mt-2"><strong>Skills:</strong> ${employee.skills}</p>
//                     </div>
//                     <div class="flex gap-2">
//                         <button onclick="event.stopPropagation(); handleUpgrade('${employee.email}')" 
//                                 class="text-blue-500 hover:text-blue-700 text-sm">
//                             Make Admin
//                         </button>
//                         <button onclick="event.stopPropagation(); handleDelete('${employee.id}', '${employee.name}')" 
//                                 class="text-red-500 hover:text-red-700 text-sm">
//                             Delete
//                         </button>
//                     </div>
//                 </div>
//             `;
//             container.appendChild(div);
//         });
//     } catch (error) {
//         console.error("Error loading employees:", error);
//     }
// }



async function handleUpgrade(email) {
    if (!confirm(`Make this user an admin?`)) return;
    
    try {
        const response = await fetch(`/auth/upgrade/${email}`, {
            method: "PUT",
            credentials: "include"
        });
        
        if (!response.ok) throw new Error("Upgrade failed");
        showNotification(`User upgraded to admin successfully`);
        loadEmployees();
    } catch (error) {
        console.error("Upgrade error:", error);
        showNotification(`Error upgrading user`);
    }
}
// Leave Management
// async function loadLeaves() {
//     try {
//         const response = await fetch("/leaves", { credentials: "include" });
//         const leaves = await response.json();
//         renderLeaves(leaves);
//     } catch (error) {
//         console.error("Error loading leaves:", error);
//     }
// }
async function loadLeaves() {
    try {
        const response = await fetch("/leaves", { credentials: "include" });
        const leaves = await response.json();
        const currentDate = new Date();
        
        // Filter out expired leaves
        const validLeaves = leaves.filter(leave => {
            const endDate = new Date(leave.endDate);
            return endDate >= currentDate;
        });

        // Auto-reject expired leaves (optional - if backend doesn't handle)
        const expiredLeaves = leaves.filter(leave => {
            const endDate = new Date(leave.endDate);
            return endDate < currentDate;
        });

        // Optional: Update status for expired leaves
        await Promise.all(expiredLeaves.map(leave => 
            fetch(`/leaves/${leave.id}/REJECTED`, { method: 'PUT' })
        ));

        renderLeaves(validLeaves);
    } catch (error) {
        console.error("Error loading leaves:", error);
    }
}

async function searchLeaves() {
    const email = document.getElementById("searchEmail").value;
    if (!email) return loadLeaves();

    try {
        const employeesResponse = await fetch("/employees", { credentials: "include" });
        const employees = await employeesResponse.json();
        const employee = employees.find(e => e.email === email);
        
        if (!employee) {
            alert("Employee not found");
            return;
        }

        const leavesResponse = await fetch(`/leaves/employee/${employee.id}`, { 
            credentials: "include" 
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
        container.innerHTML = "<p>No leave requests found</p>";
        return;
    }

    leaves.forEach(leave => {
        const div = document.createElement("div");
        div.className = "bg-white p-4 rounded-lg shadow mb-4";
        div.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <p><strong>Employee:</strong> ${leave.employee.name}</p>
                    <p>${formatDate(leave.startDate)} - ${formatDate(leave.endDate)}</p>
                    <span class="status-badge ${getStatusClass(leave.status)}">
                        ${leave.status}
                    </span>
                </div>
                ${leave.status === "PENDING" ? `
                <div>
                    <span class="action-btn text-green-500" 
                          onclick="updateLeaveStatus('${leave.id}', 'APPROVED')">✓</span>
                    <span class="action-btn text-red-500" 
                          onclick="updateLeaveStatus('${leave.id}', 'REJECTED')">✗</span>
                </div>
                ` : ''}
            </div>
        `;
        container.appendChild(div);
    });
}

async function updateLeaveStatus(leaveId, status) {
    try {
        await fetch(`/leaves/${leaveId}/${status}`, {
            method: "PUT",
            credentials: "include"
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
        APPROVED: "bg-green-100 text-green-800",
        PENDING: "bg-yellow-100 text-yellow-800",
        REJECTED: "bg-red-100 text-red-800"
    };
    return classes[status] || "bg-gray-100 text-gray-800";
}

function logout() {
    fetch("/auth/logout", { 
        method: "POST",
        credentials: "include"
    }).then(() => {
        window.location.href = "index.html";
    });
}