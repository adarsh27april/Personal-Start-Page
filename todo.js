
// todo list
// Retrieve todo list from local storage
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
const todo_item_list = document.getElementById("todo-item-list");
// Render the list items from local storage
function renderList() {
   // function to add items in the list to be displayed in the browser
   todo_item_list.innerHTML = "";
   for (let i = 0; i < todoList.length; i++) {
      todo_item_list.innerHTML += `
      <tr>
         <th scope="row">${i + 1}</th>
         <td> ${todoList[i]} </td>
         <td><h4><i class="bi bi-pencil-square" data-index="${i}" id="edit-todo" style="color:rgb(78 255 125);"></i></h4></td>
         <td><h4><i class="bi bi-trash" data-index="${i}" id="delete-todo" style="color:rgb(255 52 52);"></i></h4></td>
      </tr>
      `
   }
}

// Add new item to the list and save to local storage
function addTodo(item) {
   todoList.push(item);
   localStorage.setItem("todoList", JSON.stringify(todoList));
   renderList();
}

// Handle form submission
const newTodoModal = document.getElementById("new-todo-modal")
document.getElementById("add-todo").addEventListener("click", function () {
   let newTodoModal_Value = newTodoModal.value;
   document.getElementById("todo-close-modal").click()
   addTodo(newTodoModal_Value);
   newTodoModal.value = "";
});

// Handle delete or edit button click
todo_item_list.addEventListener('click', (e) => {
   const target = e.target
   // note that this listener will triger everytime anywhere it is clicked on the todo list
   if (target.id == "edit-todo") {
      const index = Number(target.getAttribute("data-index"));
      const todo = todoList[index];
      const newTodo = prompt("Edit todo", todo);//message, default value
      todoList[index] = newTodo ? newTodo.trim() : null;
      localStorage.setItem('todoList', JSON.stringify(todoList));
      renderList();
   }
   else if (target.id == "delete-todo") {
      const index = Number(target.getAttribute("data-index"));
      let yes_no = confirm(`Do you want to delete the todo #${index + 1}`)
      if (yes_no) {
         todoList.splice(index, 1);
         localStorage.setItem('todoList', JSON.stringify(todoList));
         renderList();
      }
   }
})

// Render the list initially
renderList();
