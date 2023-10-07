const inp_box = document.querySelector("#input-box");
const store_list = document.querySelector(".todolist");

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
        

        const task_elem = document.createElement("div");
        task_cont.classList.add("list-elem");

        task_cont.appendChild(task_elem);

        const task_inp_elem = document.createElement("input");
        task_inp_elem.classList.add("texto");
        task_inp_elem.type = "text";
        task_inp_elem.value = task;
        task_inp_elem.setAttribute("readonly", "readonly");

        task_cont.appendChild(task_inp_elem);

        store_list.appendChild(task_cont);

        const action_elem = document.createElement("div");
        action_elem.classList.add("action");
        task_cont.appendChild(action_elem);


        const edit_elem = document.createElement("button");
        edit_elem.classList.add("edit");
        edit_elem.innerHTML = "Edit";
        action_elem.appendChild(edit_elem);
        const delete_elem = document.createElement("button");
        delete_elem.classList.add("delete");
        delete_elem.innerHTML = "Delete";
        action_elem.appendChild(delete_elem);

        inp_box.value = '';

        edit_elem.addEventListener('click', () => {
            if(edit_elem.innerText.toLowerCase() == "edit"){
                task_inp_elem.removeAttribute("readonly");
            task_inp_elem.focus();
            edit_elem.innerText = "Save";
            } else {
                task_inp_elem.setAttribute("readonly", "readonly");
                edit_elem.innerText = "Edit";
            }
        });
        delete_elem.addEventListener('click', () => {
            store_list.removeChild(task_cont);
        });
}
