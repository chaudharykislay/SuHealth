let resources = JSON.parse(localStorage.getItem("resources")) || [];

document.querySelector("form").addEventListener("submit", function(event) {
    let s1value = document.getElementById("s1").value;
    let s2value = document.getElementById("s2").value;
    let s3value = "Active";
    resources.push({ s1value, s2value });
    localStorage.setItem("resources", JSON.stringify(resources));
    alert(s1value+s2value + " added to your resources!");
});