//model
let todos;
const utc = new Date().toJSON().slice(0,10).replace(/-/g,'-');
document.getElementById("date-picker").value = utc

const savedTodos = JSON.parse(localStorage.getItem("todos"));
if (Array.isArray(savedTodos)){
    todos = savedTodos;
}

else {
    todos = [
        {title: "Get groceries",
        dueDate: '2022-08-13',
        id: "id1"},
        {title: "Wash car",
        dueDate: '2022-08-14',
        id: "id2"},
        {title: "Make dinner",
        dueDate: '2022-08-15',
        id : "id3"}
        ]
    }
//create a todo
function createTodo(title, dueDate) {
    const id = '' + new Date().getTime();

    todos.push({
        title: title,
        dueDate: dueDate,
        id: id
    });
    saveTodos();
}

//deletes a todo
function removeToDo(idToDelete){
    todos = todos.filter(function(todo) {
        if (todo.id === idToDelete){
            return false;
        }else{
            return true;
        }
    });
    saveTodos();
}

function saveTodos () {
    localStorage.setItem('todos',JSON.stringify(todos));
}

render();
//Controller
function addToDo() {
    let textbox =document.getElementById('todo-title');
    let title = textbox.value;
    const datePicker = document.getElementById('date-picker');
    const dueDate = datePicker.value;
    createTodo(title, dueDate)
    render();
}

function deleteToDo (event) {
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;
    removeToDo(idToDelete)
    render();
};

//View
function render() {
    // reset the list 
    document.getElementById("todo-list").innerHTML = ''
    todos.forEach(function (todo) {
        let element = document.createElement('div');
        element.innerText = todo.title + " " + todo.dueDate;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.style = 'margin-left: 12px;'
        deleteButton.onclick = deleteToDo;
        deleteButton.id = todo.id
        element.appendChild(deleteButton);

        let todoList = document.getElementById("todo-list");
        todoList.appendChild(element);
        });
}