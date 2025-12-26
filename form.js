function submitForm() {

    let name = document.getElementById("fname").value || "Student";
    let email = document.getElementById("email")?.value || "Not provided";
    let description = document.getElementById("description")?.value || "No description";

    // Urgent / crisis check
    let urgent = document.getElementById("r3")?.checked || false;

    // Load existing submissions
    let submissions = JSON.parse(
        localStorage.getItem("mentalHealthSubmissions")
    ) || [];

    // Create submission object
    let submission = {
        name: name,
        email: email,
        description: description,
        urgent: urgent,
        submittedAt: new Date().toLocaleString()
    };

    // Save to localStorage
    submissions.push(submission);
    localStorage.setItem(
        "mentalHealthSubmissions",
        JSON.stringify(submissions)
    );

    // Emergency alert
    if (urgent) {
        alert(
            "🚨 URGENT ALERT 🚨\n\n" +
            "Your response indicates a crisis.\n\n" +
            "Please contact immediate help:\n" +
            "Aasra: +91 9820466726\n" +
            "KIRAN: 1800-599-0019\n" +
            "Tele-MANAS: 14416"
        );
    } else {
        alert(
            "Thank you " + name + ".\n\n" +
            "Your request has been submitted successfully.\n" +
            "Our counseling team will contact you within 48 hours."
        );
    }

    // Reset the form
    document.querySelector(".health-form").reset();
}
