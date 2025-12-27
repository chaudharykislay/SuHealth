/*******************************
 * STUDENT MENTAL HEALTH PAGE
 *******************************/

/* ===============================
   LOAD DAILY SELF-CARE TIP
================================ */
let savedTip = localStorage.getItem("dailyTip");

if (savedTip) {
    document.getElementById("student-tip").innerText = savedTip;
} else {
    document.getElementById("student-tip").innerText =
        "Take a deep breath and remember that taking care of yourself matters.";
}


/* ===============================
   LOAD DAILY QUOTE (API + FALLBACK)
================================ */
function loadDailyQuote() {
    fetch("https://api.quotable.io/random")
        .then(response => response.json())
        .then(data => {
            document.getElementById("student-quote").innerText =
                `"${data.content}" — ${data.author}`;
        })
        .catch(() => {
            // Fallback if API fails
            let savedQuote = localStorage.getItem("dailyQuote");
            document.getElementById("student-quote").innerText =
                savedQuote || "You are stronger than you think.";
        });
}

loadDailyQuote();


/* ===============================
   LOAD MENTAL HEALTH RESOURCES
================================ */
let resources =
    JSON.parse(localStorage.getItem("mentalHealthResources")) || [];

let container = document.getElementById("studentResourceContainer");

container.innerHTML = "";

if (resources.length === 0) {
    container.innerHTML =
        "<p style='text-align:center;'>Mental health resources will be available soon.</p>";
} else {
    resources.forEach(res => {
        container.innerHTML += `
            <div class="product">
                <span class="title">${res.title}</span><br>
                <img src="${res.image}" width="428" height="230" alt="Resource Image">
                <p>
                    ${res.description}
                    <a href="${res.link}" target="_blank">Open</a>
                </p>
            </div>
        `;
    });
}


/* ===============================
   LOCATION-BASED EMERGENCY HELP
================================ */
function loadEmergencyHelp() {
    fetch("https://ipapi.co/json/")
        .then(response => response.json())
        .then(data => {
            let country = data.country_name;

            if (country === "India") {
                document.getElementById("location-help").innerText =
                    "Emergency Help (India): AASRA 9820466726 | KIRAN 1800-599-0019 | Tele-MANAS 14416";
            } else {
                document.getElementById("location-help").innerText =
                    "Emergency Help: Please contact your local emergency services.";
            }
        })
        .catch(() => {
            // Fallback if location API fails
            document.getElementById("location-help").innerText =
                "Emergency Help: AASRA 9820466726 | KIRAN 1800-599-0019";
        });
}

loadEmergencyHelp();