{
    let tasks = [];
    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, }
        ];
        render();
    };
    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };
    const toggleStatus = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };
    const resetInputField = () => {
        const inputField = document.querySelector(".js-newTask");

        inputField.value = '';
        inputField.focus();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => removeTask(index))
        });

        const toggleStatusButtons = document.querySelectorAll(".js-done");

        toggleStatusButtons.forEach((toggleStatusButton, index) => {
            toggleStatusButton.addEventListener("click", () => toggleStatus(index))
        });
    };
    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item">
            <button class="js-done list__doneButton">
            ${task.done ? "✔️" : ""}
            </button> 
            <button class="js-remove list__removeButton">
            🗑️
            </button>          
            <span class="list__task ${task.done ? " list__item--done" : ""}">
            ${task.content}
            </span>
                        </li>`;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };
    const renderButtons = () => { };

    const render = () => {
        renderTasks();
        renderButtons();
        bindEvents();
    };
    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return resetInputField();
        }
        addNewTask(newTaskContent);
        resetInputField();
    };
    const init = () => {

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

        render();
    };
    init();
}