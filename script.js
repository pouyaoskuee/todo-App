let default_value='all'

const todoInput = document.querySelector('.input');
const todoForm = document.querySelector('.add__form');
const todoList = document.querySelector('.list__ul');
const sort = document.querySelector('.filter-todos');
const editform = document.querySelector('.modal__form');
const editinput = document.querySelector('.edit__input');
const modal = document.querySelector('.modal');
const blur = document.querySelector('.blur');
const closeModal = document.querySelector('.modal__close');





todoForm.addEventListener('submit', addTodo )

closeModal.addEventListener('click', ocClose)
blur.addEventListener('click', ocClose)

sort.addEventListener('change', (e)=>{
    default_value = e.target.value;
    sortchange()
})

document.addEventListener('DOMContentLoaded', (e)=>{
    const todos = getalltodos()
    addToDom(todos)
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



    sevetodo(newTodo)
    sortchange()
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
        item.addEventListener('click', taskremove);
    })

    const check=document.querySelectorAll('.check');
    check.forEach((item)=>{
        item.addEventListener('click' , taskcheck)
    })

    const edit=document.querySelectorAll('.edit');
    edit.forEach((item)=>{
        item.addEventListener('click', taskedit)
    })

}



function sortchange(){
    const todos = getalltodos()
    switch (default_value){
        case 'all':{
            addToDom(todos)
            break;
        }
        case 'completed':{
            const filtertodo=todos.filter((t)=>(t.isCompleted))
            console.log(filtertodo)
            addToDom(filtertodo)
            break;
        }
        case 'uncompleted':{
            const filtertodo=todos.filter((t)=>(!t.isCompleted))
            console.log(filtertodo)
            addToDom(filtertodo)
            break;

        }
        default: addToDom(todos)
    }

}


function taskremove(e){
    let todos = getalltodos()
    e.preventDefault();
    const btnid= Number(e.target.dataset.todoId);
    const filtered=todos.filter((t)=>(t.id!==btnid))
    todos=filtered
    sevealltodo(todos)
    sortchange(todos)
}



function taskcheck(e){
    let todos = getalltodos()
    e.preventDefault();
    const btnid= Number(e.target.dataset.todoId);
    const todo = todos.find((t)=>(t.id===btnid))
    todo.isCompleted=!todo.isCompleted;
    sevealltodo(todos)
    sortchange(todos)
}


function taskedit(e){
    let todos = getalltodos()
    e.preventDefault();
    const btnid= Number(e.target.dataset.todoId);
    const todo = todos.find((t)=>(t.id===btnid))
    black()
    editform.addEventListener('submit',()=>{
        todo.title= editinput.value
        sevealltodo(todos)
        sortchange(todos)
    })

}

function black(){
    modal.classList.toggle('block');
    blur.classList.toggle('block');
}




function getalltodos(){
    const sevedtodos=JSON.parse(localStorage.getItem('todos')) || [];
    return sevedtodos;
}

function sevetodo(todo){
    const sevetodos= getalltodos()
    sevetodos.push(todo)
    localStorage.setItem('todos',JSON.stringify(sevetodos))
    return sevetodos;
}

function sevealltodo(todos){
    localStorage.setItem('todos',JSON.stringify(todos))
}

function ocClose(){
    modal.classList.remove('block')
    blur.classList.remove('block')
}





