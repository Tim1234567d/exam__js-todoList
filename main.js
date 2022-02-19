let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


const createTask = document.querySelector(".create-task_btn");
const createTask_btn = document.querySelector('.modal__save-task_btn');

const taskCheck = document.getElementsByClassName('task__checkbox');
const deleteTask = document.querySelectorAll(".task__delete_btn");


const main = document.querySelector(".main");
const title = document.querySelector('.modal__title');





const renderTasks = () => {
    for (let i = 0; i < tasks.length; i++) {
        main.appendChild(createTaskTag(tasks[i].title, tasks[i].text, tasks[i].checked));
    }
}
function allFunc() {
    renderTasks();
    TaskChecked();
    deleteTasks_Btn();
    taskChange();
}


const createElement = (tag, className, textContent) => {
    if (!tag) {
        alert("Внутреняя ошибка сервиса!");
        return;
    }
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}
function createTaskTag(title, text, checked) {
    let element = createElement('div', 'task');
    element.innerHTML = ` <div class="task__content">
    <h3 class="task__title">${title}</h3>
     <p class="task__text">
    ${text}
    </p>
    <div class="change">
     <img src="./assets/change.png" alt="" class="change__img">
     <p class="text__change">Изменить</p>
    </div>
    </div>
    <div class="task__input">
    <div class="task__checkbox">
     <img class="task__checkbox_img" src="./assets/check.png"></img>
    </div>
    <img class="task__delete_btn" src="./assets/delete__btn.png" alt="">
    </div>`;
    if (checked === 1) {
        const titleChecked = element.querySelector('.task__title');
        const check_img = element.querySelector('.task__checkbox_img');
        openModal(check_img);
        titleChecked.style.textDecoration = 'line-through';
    }
    return element;
}
createTask.addEventListener('click', function () {
    const createTaskModal = document.querySelector(".modal");
    const modalClose = document.querySelector('.modal__close');
    const closeModal_btn = document.querySelector('.modal__close_btn');
    title.innerHTML = 'Создать задачу';
    createTaskModal.style.visibility = 'visible';
    createTaskModal.style.opacity = 1;

    modalClose.onclick = function () {
        closeModal(createTaskModal);
    };
    closeModal_btn.onclick = function () {
        closeModal(createTaskModal);
    };
    clearInput();
    createTask_btn.onclick = createTask_Save;
    window.onclick = function(event){
        if(event.target == createTaskModal){
            createTaskModal.style.visibility = 'hidden';
            createTaskModal.style.opacity = 0;
        }
    }
})

function createTask_Save() {
    const titleInput = document.querySelector('.modal__title-input');
    const textInput = document.querySelector('.modal__text');
    const createTaskModal = document.querySelector(".modal");
    
    const element = {
        title: '',
        text: '',
        checked: -1,
    }
    if (!titleInput.value || titleInput.value.trim().length === 0) {
        let error = document.querySelector('.modal__error');
        error.textContent = 'Вы не ввели заголовок';
        openModal(error);
        return;
    }
    else if (textInput.value === undefined) {
        element.text = '';
    }
    element.title = titleInput.value;
    element.text = textInput.value;
    tasks.push(element);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    main.innerHTML = '';
    allFunc();
    closeModal(createTaskModal);
    
}
function changeTask_Save(index){
    const titleInput = document.querySelector('.modal__title-input');
    const textInput = document.querySelector('.modal__text');
    const createTaskModal = document.querySelector(".modal");
    const element = {
        title: '',
        text: '',
        checked: -1,
    }
    if (!titleInput.value || titleInput.value.trim().length === 0) {
        let error = document.querySelector('.modal__error');
        error.textContent = 'Вы не ввели заголовок';
        openModal(error);
        return;
    }
    else if (textInput.value === undefined) {
        text = '';
    }
    element.title = titleInput.value;
    element.text = textInput.value;
    tasks[index] = element;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    main.innerHTML = '';
    allFunc();
    closeModal(createTaskModal);
    
}

const closeModal = function (item) {
    item.style.visibility = 'hidden';
    item.style.opacity = 0;
};
const openModal = function (item) {
    item.style.visibility = 'visible';
    item.style.opacity = 1;
};

function clearInput(){
    document.querySelector('.modal__title-input').value = 'Заголовок задачи';
    document.querySelector('.modal__text').value = '';
}


function deleteTasks_Btn() {
    const deleteTask_btn = document.getElementsByClassName('task__delete_btn');
    for (let i = 0; i < deleteTask_btn.length; i++) {
        deleteTask_btn[i].onclick = function () {
            const deleteTaskModal = document.querySelector(".modal-delete");
            const modalClose_Btn = document.querySelector(".modal-delete__close_btn")
            const modalClose = document.querySelector(".modal__close__2");
            openModal(deleteTaskModal);
            modalClose.onclick = function () {
                closeModal(deleteTaskModal);
            };
            modalClose_Btn.onclick = function () {
                closeModal(deleteTaskModal);
            };
            window.onclick = function(event){
                if(event.target == deleteTaskModal){
                    deleteTaskModal.style.visibility = 'hidden';
                    deleteTaskModal.style.opacity = 0;
                }
            }
            const deleteTask = document.querySelector('.modal-delete__btn');
            deleteTask.onclick = () => {
                tasks.splice(i, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                main.innerHTML = '';
                allFunc();
                closeModal(deleteTaskModal);
            }
        }
    }
}
function taskChange() {
    const taskChange = document.getElementsByClassName('change');
    for (let i = 0; i < taskChange.length; i++) {
        taskChange[i].onclick = function () {
            const createTaskModal = document.querySelector(".modal");
            const modalClose = document.querySelector('.modal__close');
            const closeModal_btn = document.querySelector('.modal__close_btn');
            title.textContent = 'Изменить задачу';
            createTaskModal.style.visibility = 'visible';
            createTaskModal.style.opacity = 1;

            modalClose.onclick = function () {
                closeModal(createTaskModal);
            };
            closeModal_btn.onclick = function () {
                closeModal(createTaskModal);
            };
            const titleInput = document.querySelector(".modal__title-input");
            const textInput = document.querySelector(".modal__text");
            titleInput.value = tasks[i].title;
            textInput.value = tasks[i].text;
            createTask_btn.onclick = function(){
                changeTask_Save(i);
                
            };
            window.onclick = function(event){
                if(event.target == createTaskModal){
                    createTaskModal.style.visibility = 'hidden';
                    createTaskModal.style.opacity = 0;
                }
            }
            
        }
    }
}
function TaskChecked() {
    for (let i = 0; i < taskCheck.length; i++) {
        taskCheck[i].onclick = function () {
            tasks[i].checked *= -1;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            main.innerHTML = '';
            allFunc();
        };
    }
}
allFunc();



