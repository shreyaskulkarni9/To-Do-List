alert("Welcome to To-Do-List Web page where you can add your task and keep note for each task by seeing completed and remaining tasks");
const taskInput = document.getElementById('task');
const addButton = document.getElementById('btn');
const taskList = document.getElementById('tasklist');
const remainingCount = document.getElementById('remainingCount');
const completedCount = document.getElementById('completedCount');
const taskTitle = document.getElementById('taskTitle');
let tasks = [];
addButton.addEventListener('click', addTask);
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }
    const task = {
        text: taskText,
        completed: false
    };
    tasks.push(task);
    taskInput.value = '';
    renderTasks();
    updateCounts();
}
function renderTasks() {
    if(tasks.length===0)
    {
        taskTitle.innerText="";
        taskList.innerText = "No Current Tasks";
        taskList.style.fontWeight = "bold";
        return;
    }
    taskTitle.innerText="Your Tasks";
    taskTitle.style.textDecoration = "underline";
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        const btn=document.createElement('button');
        btn.innerText = "Delete";
        btn.style.fontWeight = "bold";
        btn.setAttribute("id",'btn1');
        checkbox.type = 'checkbox';
        checkbox.setAttribute("id","checkbox");
        checkbox.checked = task.completed;
        const span = document.createElement('span');
        span.textContent = task.text;
        span.style.fontWeight = "bold";
        if (task.completed) {
            span.style.textDecoration = 'line-through';
            span.style.color = 'lightgray';
        }
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            renderTasks();
            updateCounts();
        });
        btn.addEventListener('click',()=>{
            tasks.splice(index,1);
            li.removeChild(checkbox);
            li.removeChild(span);
            li.removeChild(btn);
            renderTasks();
            updateCounts();
        })
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btn);
        taskList.appendChild(li);
    });
}
function updateCounts() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const remainingTasks = tasks.length - completedTasks;
    completedCount.textContent = completedTasks;
    remainingCount.textContent = remainingTasks;
}
