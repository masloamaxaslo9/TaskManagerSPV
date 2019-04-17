// Def value for input data (create task)

(function defaultData() { // Today`s date
    Date.prototype.toDateInputValue = (function() {
        let local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    });

    document.getElementById('input-deadline-task').value = new Date().toDateInputValue();

})();

// Require for Load Columns and Task

loadColumnsAndTask();
function loadColumnsAndTask() {
    let csrftoken = getCookie('csrftoken');
    let option = {
        method: 'GET',
        headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    };
    let url = `/api-desks/${getCookie('desk_id')}/`;
    request(`http://127.0.0.1:8000${url}`, option, requestCallbackloadColumn);

    function requestCallbackloadColumn(data) {
        if (data.status !== 200) {
            console.log(data.status);
            console.log(data);
        } else {
            let result = data.json();
            result
                .then((resolve) => {
                    console.log(resolve);
                    buildingColumns(resolve.columns);              //// FOR CREATE COLUMNS AND TASKS
                    selectUsers(resolve.users);                    //// FOR INNER SELECT WHEN CREATE TASK
                })
        }
    }
}

// Column and Columns

function buildingColumns(columnsOrColumn) {
    if (columnsOrColumn.length === 0) {
        return false;
    } else {
        document.getElementById('not-found-columns').style.display = 'none'; // Hide text: Columns not found.
        createColumnsOrColumn(columnsOrColumn);
    }
}

function createColumnsOrColumn(columnsOrColumn) {
    let columnDefault = document.getElementById('column-def').cloneNode(true); // Hidden column for inner column
    let taskDefault = document.getElementById('column-def-task-def').cloneNode(true);
    
    if (columnsOrColumn instanceof Array) {
        // Create Column in window
        columnsOrColumn.forEach(function (column, i) {
            // Bilding Coluns
            let columnCop = columnDefault.cloneNode(true);
            columnCop.style.display = 'inline-block';
            columnCop.setAttribute('id', `column-${column.id}`);
            columnCop.querySelector('.name-column').innerHTML = column.name;
            columnCop.querySelector('.btn-action').setAttribute('data-column-id', column.id);
            columnCop.querySelector('.btn-action').setAttribute('id', `btn-open-modal-create-task-${column.id}`);
            document.getElementById('for-append-child').appendChild(columnCop);
            // Building Tasks
            let tasks = column.tasks;
            tasks.forEach(function (task, i) {
                let taskCop = taskDefault.cloneNode(true);
                taskCop.style.display = 'block';
                taskCop.setAttribute('data-column-id', column.id);
                taskCop.setAttribute('id', `task-${i}`);
                taskCop.querySelector('.task-name').innerHTML = task.name;
                taskCop.querySelector('.task-deadline').innerHTML = task.task_deadline;
                // Priority colors
                if(task.priority === 'High') taskCop.querySelector('.task-priority > .label').classList.add('label-error');
                if(task.priority === 'Medium') taskCop.querySelector('.task-priority > .label').classList.add('label-warning');
                if(task.priority === 'Low') taskCop.querySelector('.task-priority > .label').classList.add('label-success');
                taskCop.querySelector('.task-priority > .label').innerHTML = task.priority;
                // Event for task
                taskCop.addEventListener('click', modalTask.bind(null, task));
                // Append task in column
                let columnId = document.getElementById(columnCop.id);
                columnId.insertBefore(taskCop, columnId.children[1]);
            })
        });
    } else {
        console.log(columnsOrColumn);
        if(columnsOrColumn.related_desk) { // Column
            let columnCop = columnDefault.cloneNode(true);
            columnCop.style.display = 'inline-block';
            columnCop.setAttribute('id', `column-${columnsOrColumn.id}`);
            columnCop.setAttribute('data-column-id', columnsOrColumn.id);
            columnCop.querySelector('.name-column').innerHTML = columnsOrColumn.name;
            columnCop.querySelector('.btn-action').setAttribute('data-column-id', columnsOrColumn.id);
            columnCop.querySelector('.btn-action').setAttribute('id', `btn-open-modal-create-task-${columnsOrColumn.id}`);
            document.getElementById('for-append-child').appendChild(columnCop);
        } else if (columnsOrColumn.related_column) { // Task
            let taskCop = taskDefault.cloneNode(true);
            taskCop.style.display = 'block';
            taskCop.setAttribute('data-column-id', columnsOrColumn.related_column);
            taskCop.setAttribute('id', `task-${columnsOrColumn.id}`);
            taskCop.querySelector('.task-name').innerHTML = columnsOrColumn.name;
            taskCop.querySelector('.task-deadline').innerHTML = columnsOrColumn.task_deadline;
            // Priority
            if(columnsOrColumn.priority === 'High') taskCop.querySelector('.task-priority > .label').classList.add('label-error');
            if(columnsOrColumn.priority === 'Medium') taskCop.querySelector('.task-priority > .label').classList.add('label-warning');
            if(columnsOrColumn.priority === 'Low') taskCop.querySelector('.task-priority > .label').classList.add('label-success');
            taskCop.querySelector('.task-priority > .label').innerHTML = columnsOrColumn.priority;
            // Event for task
            taskCop.addEventListener('click', modalTask.bind(null, columnsOrColumn));
            // Append task in column
            let columnId = document.getElementById(`column-${columnsOrColumn.related_column}`);
            columnId.insertBefore(taskCop, columnId.children[1]);
        }
    }
}
// Close building

// Inner Select list (Modal Create Task)

function selectUsers(users) {
    let inputPriority = document.getElementById('input-current-executor-task');

    users.forEach(function (user) {
        let optionElement = document.createElement('option');
        optionElement.innerHTML = user.username;
        optionElement.value = user.user_id;
        inputPriority.appendChild(optionElement);
    });
}