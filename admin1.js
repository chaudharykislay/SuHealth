// ==========================
// Element References
// ==========================
const resourceSelect    = document.getElementById('resource');
const categoryInput     = document.getElementById('categoryInput');
const descriptionInput  = document.getElementById('description');
const statusInput       = document.getElementById('statusInput');
const saveBtn           = document.getElementById('saveBtn');
const tbody             = document.getElementById('resourceTable').querySelector('tbody');


// ==========================
// Page Routing (Same logic as Student JS)
// ==========================
function getPageByTitle(title) {
    if (title === "Nutrition🥗") return "Nutition1.html";
    if (title === "Fitness💪🏼") return "FITNESS.html";
    if (title === "Mentalhealth🧠") return "studentmentalhealth.html";
    return "#";
}

function goToPage(page) {
    if (page !== "#") {
        window.location.href = page;
    } else {
        alert("No page linked to this resource.");
    }
}


// ==========================
// Save Button Click
// ==========================
saveBtn.addEventListener('click', function () {

    const title       = resourceSelect.value;
    const category    = categoryInput.value;
    const description = descriptionInput.value;
    const status      = statusInput.value;

    if (!title || !category || !description || !status) {
        alert("Please fill all fields.");
        return;
    }

    // Create new row
    const row = tbody.insertRow();

    row.insertCell().textContent = title;
    row.insertCell().textContent = category;
    row.insertCell().textContent = status;
    row.insertCell().textContent = description;

    // ==========================
    // Actions Column
    // ==========================
    const actionsCell = row.insertCell();

    // UPDATE
    const updateBtn = document.createElement('button');
    updateBtn.textContent = "Update";
    updateBtn.className = "btn btn-sm btn-warning";
    updateBtn.style.marginRight = "6px";

    updateBtn.addEventListener("click", function () {
        const resourceData = {
            title: row.cells[0].textContent,
            category: row.cells[1].textContent,
            status: row.cells[2].textContent,
            description: row.cells[3].textContent
        };

        localStorage.setItem("selectedResource", JSON.stringify(resourceData));
        window.location.href = "admin.html";
    });

    // DELETE
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn btn-sm btn-danger";
    deleteBtn.style.marginRight = "6px";

    deleteBtn.addEventListener("click", function () {
        tbody.removeChild(row);
    });

    // ACCESS (Student-side page opener)
    const accessBtn = document.createElement("button");
    accessBtn.textContent = "Access";
    accessBtn.className = "btn btn-sm btn-success";

    accessBtn.addEventListener("click", function () {
        const title = row.cells[0].textContent;
        const page = getPageByTitle(title);
        goToPage(page);
    });

    // Append buttons
    actionsCell.appendChild(updateBtn);
    actionsCell.appendChild(deleteBtn);
    actionsCell.appendChild(accessBtn);

    clearForm();
});


// ==========================
// Reset Form
// ==========================
function clearForm() {
    resourceSelect.selectedIndex = 0;
    categoryInput.selectedIndex = 0;
    descriptionInput.value = "";
    statusInput.value = "Active";
}
