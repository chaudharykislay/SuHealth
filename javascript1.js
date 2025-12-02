let resources = JSON.parse(localStorage.getItem("resources")) || [];

document.querySelector("form").addEventListener("submit", function(event) {
    let s1value = document.getElementById("s1").value;
    let s2value = document.getElementById("s2").value;
    let s3value = "Active";
    let s4value = document.getL
    resources.push({ s1value, s2value });
    localStorage.setItem("resources", JSON.stringify(resources));
    alert(s1value+s2value + " added to your resources!");
});
function showResources() {
    let box1 = document.getElementById("re4");
    if (!box1) return;
    box1.innerHTML = "";
    resources.forEach((name, index) => {
        box1.innerHTML += `<p> ${name.s1value} </p>`;
    });  
    let box2 = document.getElementById("re5");
    if (!box2) return;
    box2.innerHTML = "";
    resources.forEach((name, index) => {
        box2.innerHTML += `<p> ${name.s2value} </p>`;
    });
    let box3 = document.getElementById("re6");
    if (!box3) return;
    box3.innerHTML = "";
    resources.forEach((name, index) => {
        box3.innerHTML += `<p> Active ✅  </p>`;
    });

    let box4 = document.getElementById("re7");
    if (!box4) return;
    box4.innerHTML = "";    
    resources.forEach((name, index) => {
        box4.innerHTML += `<p> <button onclick="removeResource(${index})">Remove</button> <button onclick="a href="FITNESS.html">Access</button> </p>`;
    });
}
    function removeResource(index){
        resources.splice(index, 1);
        localStorage.setItem("resources",JSON.stringify(resources));
        showResources();
    }                     



showResources();
