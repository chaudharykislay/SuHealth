/***********************
 * COUNSELING FORM
 ***********************/
function submitForm() {
    let name = document.getElementById("fname").value || "Student";

    let message =
`Subject: Thank you for reaching out — Counseling Request Received

Hello ${name},

Thank you for completing the counseling intake form. We have received your request and a member of our counseling team will review it.

If you marked this as urgent or indicated risk, we will contact you immediately. Otherwise, we aim to respond within 48 hours to schedule a suitable time to talk.

If this is an emergency, please call Aasra: +91 9820466726,
KIRAN: 1800-599-0019, or Tele-MANAS: 14416.

— Student Wellness Team (SuHealth)`;

    alert(message);
}


/***********************
 * SELF CARE TIP
 ***********************/
function AddTip() {
    let tip = document.getElementById("tip-boc").value;

    if (tip.trim() === "") {
        alert("Please enter a tip");
        return;
    }

    document.querySelector(".tip-box span").innerText = tip;
    localStorage.setItem("dailyTip", tip);   // save to localStorage
    document.getElementById("tip-boc").value = "";
}

function EditTip(btn) {
    let daily = btn.parentElement;
    let oldtip = daily.querySelector("span").innerText;
    document.getElementById("tip-boc").value = oldtip;
}


/***********************
 * DAILY QUOTE
 ***********************/
function AddQuote() {
    let motivation = document.getElementById("Motivation-boc").value;

    if (motivation.trim() === "") {
        alert("Enter today quote");
        return;
    }

    document.querySelector(".Motivation-box span").innerText = motivation;
    localStorage.setItem("dailyQuote", motivation); // save to localStorage
    document.getElementById("Motivation-boc").value = "";
}

function EditQuote(btn) {
    let daily = btn.parentElement;
    let oldQuote = daily.querySelector("span").innerText;
    document.getElementById("Motivation-boc").value = oldQuote;
}

let resources = JSON.parse(localStorage.getItem("mentalHealthResources")) || [];
let editIndex = -1;


function showResources() {
    let container = document.getElementById("resourceContainer");
    container.innerHTML = "";

    resources.forEach((res, index) => {
        container.innerHTML += `
            <div class="product">
                <span class="title">${res.title}</span><br>
                <img src="${res.image}" width="428" height="230">
                <p>${res.description} 
                    <a href="${res.link}" target="_blank">Open</a>
                </p>
                <button onclick="editResource(${index})">Edit</button>
                <button onclick="deleteResource(${index})">Delete</button>
            </div>
        `;
    });
}


// Add or Update Resource
function addResource() {
    let title = document.getElementById("res-title").value;
    let description = document.getElementById("res-description").value;
    let link = document.getElementById("res-link").value;
    let imageFile = document.getElementById("res-img").files[0];

    if (!title || !description || (!imageFile && editIndex === -1)) {
        alert("Please fill all fields");
        return;
    }

    let imageURL = imageFile ? URL.createObjectURL(imageFile) : resources[editIndex].image;

    let resourceData = {
        title: title,
        description: description,
        link: link,
        image: imageURL
    };

    if (editIndex === -1) {
        resources.push(resourceData);       // add new
    } else {
        resources[editIndex] = resourceData; // update
        editIndex = -1;
    }

    localStorage.setItem("mentalHealthResources", JSON.stringify(resources));
    showResources();

    // Clear inputs
    document.getElementById("res-title").value = "";
    document.getElementById("res-description").value = "";
    document.getElementById("res-link").value = "";
    document.getElementById("res-img").value = "";
}


// Edit resource
function editResource(index) {
    let res = resources[index];

    document.getElementById("res-title").value = res.title;
    document.getElementById("res-description").value = res.description;
    document.getElementById("res-link").value = res.link;

    editIndex = index;
}


// Delete resource
function deleteResource(index) {
    resources.splice(index, 1);
    localStorage.setItem("mentalHealthResources", JSON.stringify(resources));
    showResources();
}
/***********************
 * STUDENT FORM SUBMISSIONS (ADMIN VIEW)
 ***********************/
function showSubmissions() {

    let submissions = JSON.parse(
        localStorage.getItem("mentalHealthSubmissions")
    ) || [];

    let container = document.getElementById("submissionContainer");

    if (!container) return;

    container.innerHTML = "";

    if (submissions.length === 0) {
        container.innerHTML = "<p>No student submissions yet.</p>";
        return;
    }

    submissions.forEach((s, index) => {
        container.innerHTML += `
            <div class="product">
                <b>Name:</b> ${s.name}<br>
                <b>Email:</b> ${s.email}<br>
                <b>Submitted At:</b> ${s.submittedAt}<br>
                <b>Message:</b> ${s.description}<br>
                <b>Status:</b>
                ${
                    s.urgent
                        ? "<span style='color:red; font-weight:bold;'>URGENT</span>"
                        : "<span style='color:green;'>Normal</span>"
                }
            </div>
        `;
    });
}


/***********************
 * LOAD SAVED DATA ON PAGE LOAD
 ***********************/
window.onload = function () {

    // Load tip
    let savedTip = localStorage.getItem("dailyTip");
    if (savedTip) {
        document.querySelector(".tip-box span").innerText = savedTip;
    }

    // Load quote
    let savedQuote = localStorage.getItem("dailyQuote");
    if (savedQuote) {
        document.querySelector(".Motivation-box span").innerText = savedQuote;
    }

    // Load resources
    showResources();

    // ✅ Load student form submissions
    showSubmissions();
};