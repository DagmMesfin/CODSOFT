var clicking_sound = new Audio();
clicking_sound.src = "sound/click.wav";
clicking_sound.volume = 0.5;
var hover_sound = new Audio();
hover_sound.src = "sound/hover.wav";
hover_sound.volume = 0.5;

let clickme = document.querySelectorAll('.sound_eff');

for(i of clickme){
i.addEventListener('click', () => {
    clicking_sound.play();
});

i.addEventListener('mouseenter', () => {
    hover_sound.play();
});
}

var tablinks = document.getElementsByClassName("tab-link");
var tabcontents = document.getElementsByClassName("content");

function opentb(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-tab");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-content");
    }
    event.currentTarget.classList.add("active-tab")
    document.getElementById(tabname).classList.add("active-content")
}


sidemenu = document.getElementById("side-bar");
menubar = document.querySelector(".fa-bars");

function openmenu(){
    sidemenu.style.right = "0";
    menubar.style.opacity = "0";

}
function closemenu(){
    sidemenu.style.right = "-300px";
    menubar.style.opacity = "100%";
}
