const resourceSelect    = document.getElementById('resource');
const categoryInput     = document.getElementById('categoryInput');
const descriptionInput  = document.getElementById('description');
const statusInput       = document.getElementById('statusInput');
const saveBtn           = document.getElementById('saveBtn');
const tbody             = document.getElementById('resourceTable').querySelector('tbody');

// Save Button
saveBtn.addEventListener('click', function () {

  const title       = resourceSelect.value;
  const category    = categoryInput.value;
  const description = descriptionInput.value;
  const status      = statusInput.value;

  if (!title || !category || !description || !status) {
    alert("Please select all fields.");
    return;
  }

  // Add new row
  const row = tbody.insertRow();

  row.insertCell().textContent = title;
  row.insertCell().textContent = category;
  row.insertCell().textContent = status;
  row.insertCell().textContent = description;

  // Actions Cell
  const actionsCell = row.insertCell();

  // UPDATE Button (redirects to another page)
  const updateBtn = document.createElement('button');
  updateBtn.textContent = 'Update';
  updateBtn.className = 'btn btn-sm btn-warning';
  updateBtn.style.marginRight = "6px";

  updateBtn.addEventListener('click', function () {

    // Store selected row data
    const resourceData = {
      title: row.cells[0].textContent,
      category: row.cells[1].textContent,
      status: row.cells[2].textContent,
      description: row.cells[3].textContent
    };

    localStorage.setItem('selectedResource', JSON.stringify(resourceData));

    // Redirect to update page
    window.location.href = "admin.html";
  });

  // DELETE Button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'btn btn-sm btn-danger';

  deleteBtn.addEventListener('click', function () {
    tbody.removeChild(row);
  });

  actionsCell.appendChild(updateBtn);
  actionsCell.appendChild(deleteBtn);

  clearForm();
});

function clearForm() {
  resourceSelect.selectedIndex   = 0;
  categoryInput.selectedIndex    = 0;
  descriptionInput.selectedIndex = 0;
  statusInput.value              = 'Active';
}
