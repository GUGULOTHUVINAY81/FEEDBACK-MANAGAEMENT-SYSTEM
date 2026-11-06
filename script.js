/* =====================================================
   FEEDBACK MANAGEMENT SYSTEM
   HTML + CSS + JAVASCRIPT ONLY
   ===================================================== */


/* =====================================================
   DATABASE
   ===================================================== */

const ADMIN_ACCOUNT = {
    id: "admin001",
    name: "Priya Sharma",
    email: "admin@fms.com",
    password: "admin123",
    role: "admin"
};


/* =====================================================
   INITIAL SAMPLE DATA
   ===================================================== */

function initializeDatabase() {

    if (!localStorage.getItem("fms_users")) {

        const sampleUsers = [

            {
                id: "USR001",
                name: "Aarav Sharma",
                email: "aarav@gmail.com",
                phone: "9876543210",
                password: "aarav123",
                role: "user"
            },

            {
                id: "USR002",
                name: "Ananya Reddy",
                email: "ananya@gmail.com",
                phone: "9876543211",
                password: "ananya123",
                role: "user"
            },

            {
                id: "USR003",
                name: "Rahul Kumar",
                email: "rahul@gmail.com",
                phone: "9876543212",
                password: "rahul123",
                role: "user"
            },

            {
                id: "USR004",
                name: "Sneha Patel",
                email: "sneha@gmail.com",
                phone: "9876543213",
                password: "sneha123",
                role: "user"
            },

            {
                id: "USR005",
                name: "Karthik Rao",
                email: "karthik@gmail.com",
                phone: "9876543214",
                password: "karthik123",
                role: "user"
            }

        ];

        localStorage.setItem(
            "fms_users",
            JSON.stringify(sampleUsers)
        );
    }


    if (!localStorage.getItem("fms_feedback")) {

        const sampleFeedback = [

            {
                id: "FDB001",
                userId: "USR001",
                userName: "Aarav Sharma",
                category: "Website",
                priority: "Medium",
                subject: "Website navigation improvement",
                description:
                    "The website is useful, but the navigation menu could be made simpler for new users.",
                status: "Resolved",
                response:
                    "Thank you for your suggestion. The navigation has been reviewed by our team.",
                createdAt: "2026-09-18",
                updatedAt: "2026-09-19"
            },

            {
                id: "FDB002",
                userId: "USR002",
                userName: "Ananya Reddy",
                category: "Infrastructure",
                priority: "High",
                subject: "Need additional seating",
                description:
                    "Additional seating arrangements are required in the common area during peak hours.",
                status: "In Progress",
                response:
                    "The administration is currently reviewing the seating requirement.",
                createdAt: "2026-09-19",
                updatedAt: "2026-09-20"
            },

            {
                id: "FDB003",
                userId: "USR003",
                userName: "Rahul Kumar",
                category: "Suggestion",
                priority: "Low",
                subject: "Suggestion for online feedback",
                description:
                    "It would be helpful to have an online feedback facility so users can submit feedback easily.",
                status: "Pending",
                response: "",
                createdAt: "2026-09-20",
                updatedAt: "2026-09-20"
            },

            {
                id: "FDB004",
                userId: "USR004",
                userName: "Sneha Patel",
                category: "Service",
                priority: "Medium",
                subject: "Service response time",
                description:
                    "The response time for service requests could be improved.",
                status: "Pending",
                response: "",
                createdAt: "2026-09-21",
                updatedAt: "2026-09-21"
            }

        ];

        localStorage.setItem(
            "fms_feedback",
            JSON.stringify(sampleFeedback)
        );
    }

}


/* =====================================================
   GET DATA
   ===================================================== */

function getUsers() {

    return JSON.parse(
        localStorage.getItem("fms_users") || "[]"
    );

}


function getFeedback() {

    return JSON.parse(
        localStorage.getItem("fms_feedback") || "[]"
    );

}


function saveUsers(users) {

    localStorage.setItem(
        "fms_users",
        JSON.stringify(users)
    );

}


function saveFeedback(feedback) {

    localStorage.setItem(
        "fms_feedback",
        JSON.stringify(feedback)
    );

}


/* =====================================================
   CURRENT USER
   ===================================================== */

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("fms_currentUser")
    );

}


function setCurrentUser(user) {

    localStorage.setItem(
        "fms_currentUser",
        JSON.stringify(user)
    );

}


function clearCurrentUser() {

    localStorage.removeItem("fms_currentUser");

}


/* =====================================================
   PAGE MANAGEMENT
   ===================================================== */

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.add("hidden");
    });


    const selectedPage =
        document.getElementById(pageId);

    if (selectedPage) {

        selectedPage.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}


/* =====================================================
   NAVIGATION
   ===================================================== */

function updateNavigation() {

    const currentUser = getCurrentUser();

    const loginButton =
        document.getElementById("loginNavBtn");

    const registerButton =
        document.getElementById("registerNavBtn");

    const logoutButton =
        document.getElementById("logoutBtn");


    if (currentUser) {

        loginButton.classList.add("hidden");
        registerButton.classList.add("hidden");
        logoutButton.classList.remove("hidden");

    } else {

        loginButton.classList.remove("hidden");
        registerButton.classList.remove("hidden");
        logoutButton.classList.add("hidden");

    }

}


/* =====================================================
   TOAST MESSAGE
   ===================================================== */

function showToast(message, type = "success") {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.className = "toast show " + type;

    setTimeout(function() {

        toast.className = "toast";

    }, 3000);

}


/* =====================================================
   REGISTER
   ===================================================== */

document
    .getElementById("registerForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("registerName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim().toLowerCase();

        const phone =
            document.getElementById("registerPhone").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("registerConfirmPassword").value;


        if (password !== confirmPassword) {

            showToast(
                "Passwords do not match.",
                "error"
            );

            return;
        }


        const users = getUsers();


        const existingUser =
            users.find(function(user) {

                return user.email === email;

            });


        if (existingUser) {

            showToast(
                "Email is already registered.",
                "error"
            );

            return;
        }


        const newUser = {

            id:
                "USR" +
                Date.now(),

            name: name,

            email: email,

            phone: phone,

            password: password,

            role: "user"

        };


        users.push(newUser);

        saveUsers(users);


        document
            .getElementById("registerForm")
            .reset();


        showToast(
            "Registration successful. Please login."
        );


        setTimeout(function() {

            showPage("loginPage");

        }, 1000);

    });


/* =====================================================
   LOGIN
   ===================================================== */

document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim()
                .toLowerCase();


        const password =
            document
                .getElementById("loginPassword")
                .value;


        /* ADMIN LOGIN */

        if (
            email === ADMIN_ACCOUNT.email &&
            password === ADMIN_ACCOUNT.password
        ) {

            setCurrentUser(ADMIN_ACCOUNT);

            updateNavigation();

            document
                .getElementById("loginForm")
                .reset();

            showToast("Admin login successful.");

            updateAdminDashboard();

            showPage("adminDashboard");

            return;
        }


        /* USER LOGIN */

        const users = getUsers();


        const user =
            users.find(function(item) {

                return (
                    item.email === email &&
                    item.password === password
                );

            });


        if (!user) {

            showToast(
                "Invalid email or password.",
                "error"
            );

            return;
        }


        setCurrentUser(user);

        updateNavigation();

        document
            .getElementById("loginForm")
            .reset();


        showToast(
            "Login successful."
        );


        updateUserDashboard();

        showPage("userDashboard");

    });


/* =====================================================
   LOGOUT
   ===================================================== */

function logout() {

    clearCurrentUser();

    updateNavigation();

    showToast(
        "You have been logged out."
    );

    showPage("homePage");

}


/* =====================================================
   USER DASHBOARD
   ===================================================== */

function updateUserDashboard() {

    const user = getCurrentUser();

    if (!user || user.role !== "user") {

        return;

    }


    document.getElementById(
        "welcomeUser"
    ).textContent =
        "Welcome, " + user.name;


    const feedback =
        getFeedback().filter(function(item) {

            return item.userId === user.id;

        });


    const total = feedback.length;


    const pending =
        feedback.filter(function(item) {

            return item.status === "Pending";

        }).length;


    const resolved =
        feedback.filter(function(item) {

            return item.status === "Resolved";

        }).length;


    document.getElementById(
        "userTotalFeedback"
    ).textContent = total;


    document.getElementById(
        "userPendingFeedback"
    ).textContent = pending;


    document.getElementById(
        "userResolvedFeedback"
    ).textContent = resolved;


    renderUserFeedback();

}


/* =====================================================
   USER FEEDBACK TABLE
   ===================================================== */

function renderUserFeedback() {

    const user = getCurrentUser();

    if (!user) {

        return;

    }


    const feedback =
        getFeedback().filter(function(item) {

            return item.userId === user.id;

        });


    const container =
        document.getElementById(
            "userFeedbackTable"
        );


    if (feedback.length === 0) {

        container.innerHTML =
            `
            <div class="empty-state">
                <p>No feedback submitted yet.</p>
            </div>
            `;

        return;
    }


    let html = `

        <div class="table-wrapper">

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Subject</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

    `;


    feedback.forEach(function(item) {

        html += `

            <tr>

                <td>${escapeHTML(item.id)}</td>

                <td>
                    ${escapeHTML(item.subject)}
                </td>

                <td>
                    ${escapeHTML(item.category)}
                </td>

                <td>
                    ${escapeHTML(item.priority)}
                </td>

                <td>
                    ${getStatusBadge(item.status)}
                </td>

                <td>
                    ${escapeHTML(item.createdAt)}
                </td>

                <td>

                    <button
                        class="action-btn view-btn"
                        onclick="viewFeedback('${item.id}')"
                    >
                        View
                    </button>

                </td>

            </tr>

        `;

    });


    html += `

            </tbody>

        </table>

        </div>

    `;


    container.innerHTML = html;

}


/* =====================================================
   SUBMIT FEEDBACK
   ===================================================== */

document
    .getElementById("feedbackForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const user = getCurrentUser();


        if (!user || user.role !== "user") {

            showToast(
                "Please login as a user.",
                "error"
            );

            showPage("loginPage");

            return;
        }


        const category =
            document.getElementById(
                "feedbackCategory"
            ).value;


        const priority =
            document.getElementById(
                "feedbackPriority"
            ).value;


        const subject =
            document.getElementById(
                "feedbackSubject"
            ).value.trim();


        const description =
            document.getElementById(
                "feedbackDescription"
            ).value.trim();


        const feedback =
            getFeedback();


        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        const newFeedback = {

            id:
                "FDB" +
                Date.now(),

            userId:
                user.id,

            userName:
                user.name,

            category:
                category,

            priority:
                priority,

            subject:
                subject,

            description:
                description,

            status:
                "Pending",

            response:
                "",

            createdAt:
                today,

            updatedAt:
                today

        };


        feedback.push(newFeedback);

        saveFeedback(feedback);


        document
            .getElementById("feedbackForm")
            .reset();


        showToast(
            "Feedback submitted successfully."
        );


        updateUserDashboard();

        showPage("userDashboard");

    });


/* =====================================================
   STATUS BADGE
   ===================================================== */

function getStatusBadge(status) {

    let className = "status-pending";


    if (status === "In Progress") {

        className = "status-progress";

    }


    if (status === "Resolved") {

        className = "status-resolved";

    }


    if (status === "Rejected") {

        className = "status-rejected";

    }


    return `
        <span class="status ${className}">
            ${escapeHTML(status)}
        </span>
    `;

}


/* =====================================================
   VIEW FEEDBACK
   ===================================================== */

function viewFeedback(id) {

    const feedback =
        getFeedback().find(function(item) {

            return item.id === id;

        });


    if (!feedback) {

        showToast(
            "Feedback not found.",
            "error"
        );

        return;

    }


    const details =
        document.getElementById(
            "feedbackDetails"
        );


    details.innerHTML = `

        <div class="detail-item">
            <strong>Feedback ID</strong>
            <span>${escapeHTML(feedback.id)}</span>
        </div>

        <div class="detail-item">
            <strong>User</strong>
            <span>${escapeHTML(feedback.userName)}</span>
        </div>

        <div class="detail-item">
            <strong>Category</strong>
            <span>${escapeHTML(feedback.category)}</span>
        </div>

        <div class="detail-item">
            <strong>Priority</strong>
            <span>${escapeHTML(feedback.priority)}</span>
        </div>

        <div class="detail-item">
            <strong>Subject</strong>
            <span>${escapeHTML(feedback.subject)}</span>
        </div>

        <div class="detail-item">
            <strong>Description</strong>
            <p>${escapeHTML(feedback.description)}</p>
        </div>

        <div class="detail-item">
            <strong>Status</strong>
            ${getStatusBadge(feedback.status)}
        </div>

        <div class="detail-item">
            <strong>Submitted Date</strong>
            <span>${escapeHTML(feedback.createdAt)}</span>
        </div>

        ${
            feedback.response
                ?
                `
                <div class="detail-item">

                    <strong>Admin Response</strong>

                    <div class="admin-response">
                        ${escapeHTML(feedback.response)}
                    </div>

                </div>
                `
                :
                `
                <div class="detail-item">
                    <strong>Admin Response</strong>
                    <p>No response yet.</p>
                </div>
                `
        }

    `;


    document
        .getElementById("feedbackModal")
        .classList.remove("hidden");

}


/* =====================================================
   CLOSE MODAL
   ===================================================== */

function closeModal() {

    document
        .getElementById("feedbackModal")
        .classList.add("hidden");

}


/* =====================================================
   ADMIN DASHBOARD
   ===================================================== */

function updateAdminDashboard() {

    const user = getCurrentUser();


    if (!user || user.role !== "admin") {

        return;

    }


    const feedback = getFeedback();

    const users = getUsers();


    document.getElementById(
        "adminTotalFeedback"
    ).textContent = feedback.length;


    document.getElementById(
        "adminPendingFeedback"
    ).textContent =
        feedback.filter(function(item) {

            return item.status === "Pending";

        }).length;


    document.getElementById(
        "adminProgressFeedback"
    ).textContent =
        feedback.filter(function(item) {

            return item.status === "In Progress";

        }).length;


    document.getElementById(
        "adminResolvedFeedback"
    ).textContent =
        feedback.filter(function(item) {

            return item.status === "Resolved";

        }).length;


    document.getElementById(
        "adminTotalUsers"
    ).textContent = users.length;


    renderAdminFeedback();

    renderAdminUsers();

}


/* =====================================================
   ADMIN FEEDBACK TABLE
   ===================================================== */

function renderAdminFeedback() {

    const feedback =
        getFeedback();


    const searchInput =
        document.getElementById(
            "adminSearch"
        );


    const statusFilter =
        document.getElementById(
            "adminStatusFilter"
        );


    const search =
        searchInput
            ?
            searchInput.value
                .trim()
                .toLowerCase()
            :
            "";


    const status =
        statusFilter
            ?
            statusFilter.value
            :
            "All";


    const filtered =
        feedback.filter(function(item) {

            const matchesSearch =
                !search ||
                item.id.toLowerCase().includes(search) ||
                item.userName.toLowerCase().includes(search) ||
                item.subject.toLowerCase().includes(search) ||
                item.category.toLowerCase().includes(search);


            const matchesStatus =
                status === "All" ||
                item.status === status;


            return matchesSearch && matchesStatus;

        });


    const container =
        document.getElementById(
            "adminFeedbackTable"
        );


    if (filtered.length === 0) {

        container.innerHTML =
            `
            <p>No feedback found.</p>
            `;

        return;

    }


    let html = `

        <div class="table-wrapper">

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>User</th>
                    <th>Subject</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

    `;


    filtered.forEach(function(item) {

        html += `

            <tr>

                <td>
                    ${escapeHTML(item.id)}
                </td>

                <td>
                    ${escapeHTML(item.userName)}
                </td>

                <td>
                    ${escapeHTML(item.subject)}
                </td>

                <td>
                    ${escapeHTML(item.category)}
                </td>

                <td>
                    ${escapeHTML(item.priority)}
                </td>

                <td>
                    ${getStatusBadge(item.status)}
                </td>

                <td>
                    ${escapeHTML(item.createdAt)}
                </td>

                <td>

                    <button
                        class="action-btn view-btn"
                        onclick="adminViewFeedback('${item.id}')"
                    >
                        Manage
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteFeedback('${item.id}')"
                    >
                        Delete
                    </button>

                </td>

            </tr>

        `;

    });


    html += `

            </tbody>

        </table>

        </div>

    `;


    container.innerHTML = html;

}


/* =====================================================
   ADMIN VIEW / MANAGE FEEDBACK
   ===================================================== */

function adminViewFeedback(id) {

    const feedback =
        getFeedback().find(function(item) {

            return item.id === id;

        });


    if (!feedback) {

        showToast(
            "Feedback not found.",
            "error"
        );

        return;

    }


    const details =
        document.getElementById(
            "feedbackDetails"
        );


    details.innerHTML = `

        <div class="detail-item">
            <strong>Feedback ID</strong>
            <span>${escapeHTML(feedback.id)}</span>
        </div>

        <div class="detail-item">
            <strong>User</strong>
            <span>${escapeHTML(feedback.userName)}</span>
        </div>

        <div class="detail-item">
            <strong>Category</strong>
            <span>${escapeHTML(feedback.category)}</span>
        </div>

        <div class="detail-item">
            <strong>Priority</strong>
            <span>${escapeHTML(feedback.priority)}</span>
        </div>

        <div class="detail-item">
            <strong>Subject</strong>
            <span>${escapeHTML(feedback.subject)}</span>
        </div>

        <div class="detail-item">
            <strong>Description</strong>
            <p>${escapeHTML(feedback.description)}</p>
        </div>


        <div class="detail-item">

            <strong>Update Status</strong>

            <select id="modalStatus">

                <option value="Pending"
                    ${feedback.status === "Pending" ? "selected" : ""}>
                    Pending
                </option>

                <option value="In Progress"
                    ${feedback.status === "In Progress" ? "selected" : ""}>
                    In Progress
                </option>

                <option value="Resolved"
                    ${feedback.status === "Resolved" ? "selected" : ""}>
                    Resolved
                </option>

                <option value="Rejected"
                    ${feedback.status === "Rejected" ? "selected" : ""}>
                    Rejected
                </option>

            </select>

        </div>


        <div class="detail-item">

            <strong>Admin Response</strong>

            <textarea
                id="modalResponse"
                rows="5"
                placeholder="Enter response to user..."
            >${escapeHTML(feedback.response || "")}</textarea>

        </div>


        <button
            class="primary-btn"
            onclick="saveAdminChanges('${feedback.id}')"
        >
            Save Changes
        </button>

    `;


    document
        .getElementById("feedbackModal")
        .classList.remove("hidden");

}


/* =====================================================
   SAVE ADMIN CHANGES
   ===================================================== */

function saveAdminChanges(id) {

    const feedback =
        getFeedback();


    const item =
        feedback.find(function(feedbackItem) {

            return feedbackItem.id === id;

        });


    if (!item) {

        showToast(
            "Feedback not found.",
            "error"
        );

        return;

    }


    const status =
        document.getElementById(
            "modalStatus"
        ).value;


    const response =
        document.getElementById(
            "modalResponse"
        ).value.trim();


    item.status = status;

    item.response = response;

    item.updatedAt =
        new Date()
            .toISOString()
            .split("T")[0];


    saveFeedback(feedback);


    closeModal();

    updateAdminDashboard();


    showToast(
        "Feedback updated successfully."
    );

}


/* =====================================================
   DELETE FEEDBACK
   ===================================================== */

function deleteFeedback(id) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this feedback?"
        );


    if (!confirmation) {

        return;

    }


    let feedback =
        getFeedback();


    feedback =
        feedback.filter(function(item) {

            return item.id !== id;

        });


    saveFeedback(feedback);


    updateAdminDashboard();


    showToast(
        "Feedback deleted successfully."
    );

}


/* =====================================================
   ADMIN USERS TABLE
   ===================================================== */

function renderAdminUsers() {

    const users =
        getUsers();


    const container =
        document.getElementById(
            "adminUsersTable"
        );


    if (users.length === 0) {

        container.innerHTML =
            "<p>No users registered.</p>";

        return;

    }


    let html = `

        <div class="table-wrapper">

        <table>

            <thead>

                <tr>

                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>

                </tr>

            </thead>

            <tbody>

    `;


    users.forEach(function(user) {

        html += `

            <tr>

                <td>
                    ${escapeHTML(user.id)}
                </td>

                <td>
                    ${escapeHTML(user.name)}
                </td>

                <td>
                    ${escapeHTML(user.email)}
                </td>

                <td>
                    ${escapeHTML(user.phone)}
                </td>

                <td>
                    User
                </td>

            </tr>

        `;

    });


    html += `

            </tbody>

        </table>

        </div>

    `;


    container.innerHTML = html;

}


/* =====================================================
   HTML SECURITY
   ===================================================== */

function escapeHTML(value) {

    if (value === null || value === undefined) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================================
   PAGE INITIALIZATION
   ===================================================== */

function initializeApplication() {

    initializeDatabase();

    updateNavigation();


    const currentUser =
        getCurrentUser();


    if (currentUser) {

        if (currentUser.role === "admin") {

            updateAdminDashboard();

            showPage("adminDashboard");

        } else {

            updateUserDashboard();

            showPage("userDashboard");

        }

    } else {

        showPage("homePage");

    }

}


/* =====================================================
   MODAL CLICK OUTSIDE
   ===================================================== */

document
    .getElementById("feedbackModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeModal();

        }

    });


/* =====================================================
   START APPLICATION
   ===================================================== */

initializeApplication();