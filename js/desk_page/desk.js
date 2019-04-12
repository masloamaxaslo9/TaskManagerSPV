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
    let url = `/api-desks/${getCookie('desk_id')}/columns/`;
    request(`http://127.0.0.1:8000${url}`, option, requestCallbackloadColumn);

    function requestCallbackloadColumn(data) {
        if (data.status !== 200) {
            console.log(data.status);
            console.log(data);
        } else {
            let result = data.json();
            result
                .then((resolve) => {
                    buildingColumns(resolve);
                })
        }
    }
}

loadColumnsAndTask();

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

    if (columnsOrColumn instanceof Array) {
        // Create Column in window
        columnsOrColumn.forEach(function (column, i) {
            console.log(column);
            console.log(i);
            // Bilding Coluns
            let columnCop = columnDefault.cloneNode(true);
            columnCop.style.display = 'inline-block';
            columnCop.setAttribute('id', `column-${i}`);
            columnCop.querySelector('.name-column').innerHTML = column.name;
            columnCop.querySelector('.btn-action').setAttribute('data-column-id', column.id);
            columnCop.querySelector('.btn-action').setAttribute('id', `btn-open-modal-create-task-${column.id}`);
            document.getElementById('for-append-child').appendChild(columnCop);
            // Building Task
            // taskDefault.style.display = 'block';

        });
        console.log('Всього колонок ' + columnsOrColumn.length);
    } else {
        let columnCop = columnDefault.cloneNode(true);
        columnCop.style.display = 'inline-block';
        columnCop.setAttribute('id', `column-${columnsOrColumn.length}`);
        columnCop.setAttribute('data-column-id', columnsOrColumn.id);
        columnCop.querySelector('.name-column').innerHTML = columnsOrColumn.name;
        columnCop.querySelector('.btn-action').setAttribute('data-column-id', columnsOrColumn.id);
        columnCop.querySelector('.btn-action').setAttribute('id', `btn-open-modal-create-task-${columnsOrColumn.id}`);
        document.getElementById('for-append-child').appendChild(columnCop);
        console.log(columnsOrColumn);
    }
}

// Task and Tasks

function buildingTasks(tasksOrTask) {
    if (tasksOrTask.length === 0) {
        return false;
    } else {
        createTasksOrTask(tasksOrTask);
    }
}

function createTasksOrTask(tasksOrTask) {
    let taskDefault = document.getElementById('column-def-task-def').cloneNode(true); // Hidden task for inner column
    console.log(taskDefault);
}