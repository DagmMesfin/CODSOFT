
const numDis = document.querySelector(".num_display");
const buttons = document.querySelectorAll("button");

const actuators = ["%", "/", "*", "-", "+", "="];

let output = "";



const calculate = (val) => {
    if(val==="=" && output!==""){
        output = eval(output.replace("%", "/100"));
        if(output == "Infinity"){
            output = "Math Error";
        }
    }
    else if(val === "C"){
        output = "";
    }
    else if(val === "DEL"){
        output = output.toString().slice(0, -1);
    }
    else{
        if(output === "" && actuators.includes(val)) return;
        output += val;
    }
    numDis.value = output;
};

buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});


var clicking_sound = new Audio();
clicking_sound.src = "sound/click.wav";
clicking_sound.volume = 0.1;

let clickme = document.querySelectorAll('button');
var hover_sound = new Audio();
hover_sound.src = "beep.wav";
for(i of clickme){
i.addEventListener('click', () => {
    hover_sound.play();
});
}


