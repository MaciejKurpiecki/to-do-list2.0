{
    let tasks = [];
    let hideDoneTasks = false;

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
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };
    const hideShowTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };
    const setAllAsDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };
    const resetInputField = () => {
        const inputField = document.querySelector(".js-newTask");

        inputField.value = '';
        inputField.focus();
    };
    const bindAllTasksButtons = () => {
        const setAllDoneButton = document.querySelector(".js-setAllAsDone");
        if (setAllDoneButton) {
            setAllDoneButton.addEventListener("click", setAllAsDone);
        };
        const hideShowDoneButton = document.querySelector(".js-hideDone");
        if (hideShowDoneButton) {
            hideShowDoneButton.addEventListener("click", hideShowTasks);
        };
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
        const taskToHtml = task => `
            <li class="list__item ${task.done && hideDoneTasks ? " list__item--hidden" : ""}">
            <button class="js-done list__doneButton">
            ${task.done ? "✔" : ""}
            </button> 
            <button class="js-remove list__removeButton">
            🗑
            </button>          
            <span class="list__task ${task.done ? " list__item--done" : ""}">
            ${task.content}
            </span>
                        </li>`;

        const taskElement = document.querySelector(".js-tasks");
        taskElement.innerHTML = tasks.map(taskToHtml).join("");
    };
    const renderButtons = () => {
        const allTasksButtons = document.querySelector(".js-allTasksButtons");

        if (!tasks.length) {
            allTasksButtons.innerHTML = "";
            return;
        };

        allTasksButtons.innerHTML = `
        <button class="button js-hideDone">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="button js-setAllAsDone"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}>
        Ukończ wszystkie
        </button>
        `;
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindAllTasksButtons();
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
};