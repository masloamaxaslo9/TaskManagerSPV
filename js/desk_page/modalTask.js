function modalTask(task) {
    console.log(task);
    let modalElement = document.getElementById('modal-task');
    let taskTitle = modalElement.querySelector('.modal-title');
    let taskPriority = modalElement.querySelector('.priority-task > span');
    let taskDeadline = modalElement.querySelector('.deadline-task > kbd');
    let taskDescription = modalElement.querySelector('.description-task');
    modalElement.classList.add('active');

    modalElement.addEventListener('click', closeModal);
    function closeModal() {
        if(event.target.hasAttribute('aria-label')) {
            modalElement.classList.remove('active');
            //Remove class from priority
            taskPriority.classList.remove('label-error', 'label-warning', 'label-success');
        }
    }

    // Task Name
    taskTitle.innerHTML = task.name;

    // Task Priority
    taskPriority.innerHTML = task.priority;
    if(task.priority === 'High') taskPriority.classList.add('label-error');
    if(task.priority === 'Medium') taskPriority.classList.add('label-warning');
    if(task.priority === 'Low') taskPriority.classList.add('label-success');

    // Task Select Column

    // Task Deadline
    taskDeadline.innerHTML = task.task_deadline;

    // Task Description
    taskDescription.innerHTML = task.description;
}