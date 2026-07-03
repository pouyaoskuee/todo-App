
const todoInput = document.querySelector('.input');
const todoForm = document.querySelector('.add__form');
const todoList = document.querySelector('.list__ul');
const sort = document.querySelector('.filter-todos');

const editForm = document.querySelector('.modal__form');
const editInput = document.querySelector('.edit__input');

const modal = document.querySelector('.modal');
const blur = document.querySelector('.blur');
const closeModal = document.querySelector('.modal__close');




document.addEventListener('DOMContentLoaded', ()=> addToDom(getAllTodos()))
todoForm.addEventListener('submit', addTodo )
closeModal.addEventListener('click', ocClose)
blur.addEventListener('click', ocClose)

let default_value
sort.addEventListener('change', (e)=> {
    default_value = e?.target?.value || "all"
    sortChange()
})








function addTodo(e){
    e.preventDefault();
    if (!todoInput.value) return alert('input is required') ;
    const newTodo = {
        id: Date.now(),
        created_at: new Date().toISOString(),
        title: todoInput.value,
        isCompleted: false,
    }

    saveTodo(newTodo)
    sortChange()
    todoInput.value = '';
}



function addToDom(todos){
    let result = '';
    todos.forEach((item) => {
        result += `<li class="list__li">
            <p class="list__title ${item.isCompleted===true ? "completed":""} ">${item.title}</p>
            <span class="list__data">${new Date(item.created_at).toLocaleDateString('en-US')}</span>
            <button type="button" data-todo-id=${item.id} class="check">&check;</button>
            <button type="button" data-todo-id=${item.id} class="remove">&times;</button>
            <button type="submit" data-todo-id=${item.id} class="edit">&circlearrowleft;</button>
        </li>`

    })
    todoList.innerHTML = result;


    const remove=document.querySelectorAll('.remove');
    remove.forEach((item)=>{
        item.addEventListener('click', taskRemove);
    })

    const check=document.querySelectorAll('.check');
    check.forEach((item)=>{
        item.addEventListener('click' , taskCheck)
    })

    const edit=document.querySelectorAll('.edit');
    edit.forEach((item)=>{
        item.addEventListener('click', taskEdit)
    })

}



function sortChange(){

    const todos = getAllTodos()
    switch (default_value){
        case 'all':{
            addToDom(todos)
            break;
        }
        case 'completed':{
            addToDom(todos.filter((t)=>(t.isCompleted)))
            break;
        }
        case 'uncompleted':{
            addToDom(todos.filter((t)=>(!t.isCompleted)))
            break;

        }
        default: addToDom(todos)
    }
}


function taskRemove(e){
    let todos = getAllTodos()
    e.preventDefault();
    saveAllTodos(todos.filter((t)=>(t.id!==Number(e.target.dataset.todoId))))
    sortChange()
}



function taskCheck(e){
    let todos = getAllTodos()
    e.preventDefault();
    const todo = todos.find((t)=>(t.id===Number(e.target.dataset.todoId)))
    todo.isCompleted=!todo.isCompleted;
    saveAllTodos(todos)
    sortChange()
}

function taskEdit(e){
    let todos = getAllTodos()
    e.preventDefault();
    onOpen()
    const todo = todos.find((t)=> t.id===Number(e.target.dataset.todoId))
    editInput.value = todo.title;
    editForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        todo.title=editInput.value
        saveAllTodos(todos)
        addToDom(todos)
        ocClose()
    });

}


function getAllTodos(){
    return JSON.parse(localStorage.getItem('todos')) || [];
}

function saveTodo(todo){
    const saveTodos= getAllTodos()
    saveTodos.push(todo)
    localStorage.setItem('todos',JSON.stringify(saveTodos))
}

function saveAllTodos(todos){
    localStorage.setItem('todos',JSON.stringify(todos))
}

function onOpen(){
    modal.classList.toggle('block');
    blur.classList.toggle('block');
}

function ocClose(){
    modal.classList.remove('block')
    blur.classList.remove('block')
}





