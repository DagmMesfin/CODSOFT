const inp_box = document.querySelector("#input-box");
const store_list = document.querySelector(".todolist");
var action_elem = document.createElement("div");
var counter = 0;
function addingTask(){
    const task = inp_box.value;
    if(inp_box.value === ''){
            alert("You shall write something on it to be effective!");
            return;
        } else {
            console.log("Success");
        }
        const task_cont = document.createElement("div"); 
        task_cont.classList.add("list-container");
        task_cont.setAttribute('id', 'yourElementId');
        store_list.appendChild(task_cont);
        

        const task_elem = document.createElement("div");
        task_elem.classList.add("list-elem");

        task_cont.appendChild(task_elem);

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

        inp_box.value = '';
        counter++;
        DataSave();

        edit_elem.addEventListener('click', () => {
            if(edit_elem.innerText.toLowerCase() == "edit"){
                task_inp_elem.removeAttribute("readonly");
                task_inp_elem.focus();
                edit_elem.innerText = "Save";
            } else {
                task_inp_elem.setAttribute("readonly", "readonly");
                edit_elem.innerText = "Edit";
                DataSave();
            }
        });
        delete_elem.addEventListener('click', () => {
            store_list.removeChild(task_cont);
            counter--;
            DataSave();
        });
}



function DataSave(){
    var task_list = document.querySelectorAll(".texto");
    var task_list_elem = [];
    var task_actions = ["edit", "delete"];
    task_list.forEach(element => {
        task_list_elem.push(element.value);
    });
    localStorage.setItem("task_list", JSON.stringify(task_list_elem));
    localStorage.setItem("action_div", action_elem.innerHTML);
    localStorage.setItem("action", task_actions);
    localStorage.setItem("stored_data", store_list.innerHTML);
    localStorage.setItem("num_task", counter);
    console.log(task_list_elem);
}

function DataLoad(){
    store_list.innerHTML = localStorage.getItem("stored_data");
    task_list = document.querySelectorAll(".texto");
    task_list_elem = JSON.parse(localStorage.getItem("task_list"));

    i=0;
    task_list.forEach(element => {
        element.value = task_list_elem[i];
        i++;
    });
    
    counter = localStorage.getItem("num_task");

}

DataLoad();