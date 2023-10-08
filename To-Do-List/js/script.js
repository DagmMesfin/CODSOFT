const inp_box = document.querySelector("#input-box");
const store_list = document.querySelector(".todolist");
var action_elem = document.createElement("div");
var counter = 0;

var check_sound = new Audio();
check_sound.src = "sound/check_eff.wav";
check_sound.volume = 0.5;
var delete_sound = new Audio();
delete_sound.src = "sound/delete_eff.wav";
delete_sound.volume = 0.5;
var edit_sound = new Audio();
edit_sound.src = "sound/edit_eff.wav";
edit_sound.volume = 0.5;
var writing_sound = new Audio();
writing_sound.src = "sound/writing_eff.wav";
writing_sound.volume = 0.5;

inp_box.addEventListener("click", function () {
    writing_sound.play();
});

function addingTask() {
    const task = inp_box.value;
    if (inp_box.value === "") {
        alert("You shall write something on it to be effective!");
        return;
    } else {
        console.log("Success");
    }
    const task_cont = document.createElement("div");
    task_cont.classList.add("list-container");
    store_list.appendChild(task_cont);

    const task_elem = document.createElement("div");
    task_elem.classList.add("list-elem");

    task_cont.appendChild(task_elem);

    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.setAttribute("data-key", counter.toString());
    checkbox.type = "checkbox";
    task_elem.appendChild(checkbox);

    const task_inp_elem = document.createElement("input");
    task_inp_elem.classList.add("texto");
    task_inp_elem.type = "text";
    task_inp_elem.value = task;
    task_inp_elem.setAttribute("readonly", "readonly");

    task_elem.appendChild(task_inp_elem);

    action_elem = document.createElement("div");
    action_elem.classList.add("action");
    task_elem.appendChild(action_elem);

    const edit_elem = document.createElement("button");
    edit_elem.classList.add("edit");
    edit_elem.innerHTML = "Edit";
    action_elem.appendChild(edit_elem);
    const delete_elem = document.createElement("button");
    delete_elem.classList.add("delete");
    delete_elem.innerHTML = "Delete";
    action_elem.appendChild(delete_elem);
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            task_inp_elem.classList.add("completed");
            check_sound.play();
        } else {
            task_inp_elem.classList.remove("completed");
            check_sound.play();
        }
        edit_elem.disabled = !edit_elem.disabled;
        DataSave();
    });

    inp_box.value = "";
    counter++;
    DataSave();

    edit_elem.addEventListener("click", () => {
        if (edit_elem.innerText.toLowerCase() == "edit") {
            task_inp_elem.removeAttribute("readonly");
            task_inp_elem.focus();
            edit_elem.innerText = "Save";
            writing_sound.play();
        } else {
            task_inp_elem.setAttribute("readonly", "readonly");
            edit_elem.innerText = "Edit";
            DataSave();
            edit_sound.play();
        }
    });
    delete_elem.addEventListener("click", () => {
        store_list.removeChild(task_cont);
        counter--;
        DataSave();
        delete_sound.play();
    });
    edit_sound.play();
}

//Saving the Data
function DataSave() {
    var task_list = document.querySelectorAll(".texto");
    const checkboxes = document.querySelectorAll(".checkbox");
    savedStatesObj = [];
    let i = 0;

    checkboxes.forEach(function (checkbox) {
        savedStatesObj[i] = checkbox.checked;
        i++;
    });
    localStorage.setItem('checkbox', JSON.stringify(savedStatesObj));
    console.log(savedStatesObj);
    console.log(JSON.parse(localStorage.getItem('checkbox')));


    var task_list_elem = [];
    var task_actions = ["edit", "delete"];
    task_list.forEach((element) => {
        task_list_elem.push(element.value);
    });
    localStorage.setItem("task_list", JSON.stringify(task_list_elem));
    localStorage.setItem("action_div", action_elem.innerHTML);
    localStorage.setItem("action", task_actions);
    localStorage.setItem("stored_data", store_list.innerHTML);
    localStorage.setItem("num_task", counter);
    console.log(task_list_elem);
}

//loading the data at once
function DataLoad() {
    store_list.innerHTML = localStorage.getItem("stored_data");

    const checkboxes = store_list.querySelectorAll('.checkbox');
    const savedStates = JSON.parse(localStorage.getItem('checkbox'));
    let j = 0;
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = savedStates[j];
        j++;
    });

    const list_cont = store_list.querySelectorAll(".list-container");
    let i = 0;
    list_cont.forEach((element) => {
        const edit_btn = element.querySelector(".edit");
        const delete_btn = element.querySelector(".delete");
        const task_inp_elem = element.querySelector(".texto");
        const checkbox = element.querySelector(".checkbox");
        task_list = JSON.parse(localStorage.getItem("task_list"));
        task_inp_elem.value = task_list[i];
        i++;

        edit_btn.addEventListener("click", () => {
            if (edit_btn.innerText.toLowerCase() == "edit") {
                task_inp_elem.removeAttribute("readonly");
                task_inp_elem.focus();
                edit_btn.innerText = "Save";
                writing_sound.play();
            } else {
                task_inp_elem.setAttribute("readonly", "readonly");
                edit_btn.innerText = "Edit";
                edit_sound.play();
                DataSave();
            }
        });

        delete_btn.addEventListener("click", () => {
            store_list.removeChild(element);
            counter--;
            delete_sound.play();
        });

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                task_inp_elem.classList.add("completed");
                check_sound.play();
            } else {
                task_inp_elem.classList.remove("completed");
                check_sound.play();
            }
            edit_btn.disabled = !edit_btn.disabled;
            DataSave();
        });
    });
}

DataLoad();
