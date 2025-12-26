let resources = JSON.parse(localStorage.getItem("resources")) || [];

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    let s1value = document.getElementById("s1").value;
    let s2value = document.getElementById("s2").value;
    
    let link ;
    if(s1value=="Nutrition🥗"){
        link="adminnutrition.html"
    }
    else if(s1value=="Fitness💪🏼"){
        link="adminfitnessupdate.html"
    }
    else if(s1value=="Mentalhealth🧠"){
        link="mentalhealthadmin.html"
    }
    else{
        link ="adminresourcesupdate.html";
    }

    let resource ={
        s1value,
        s2value,
        status: "Active🟢",
       link: link
    };
    resources.push(resource);
    showResources();
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
        box3.innerHTML += `<p> ${name.status}  </p>`;
    });

    let box4 = document.getElementById("re7");
    if (!box4) return;
    box4.innerHTML = "";    
    resources.forEach((name, index) => {
        box4.innerHTML += `<p> <button onclick="removeResource(${index})">Remove❌</button> <button onclick="goToPage('${name.link}')">Update🔧</button> </p>`;
    });
}
    function removeResource(index){
        resources.splice(index, 1);
        localStorage.setItem("resources",JSON.stringify(resources));
        showResources();
    } 
    function goToPage(page) {
    window.location.href = page;
}                    



showResources();
