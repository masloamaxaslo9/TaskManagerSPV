function modalTask(task) {
    console.log(task);
    setCookie('task_id', task.id);
    console.log('=====================');
    let target = event.target;
    while (target !== document.querySelector('.task')) {
        if (target.tagName === 'DIV') {
            setCookie('column_id', target.getAttribute('data-column-id'));
            break
        }
        target = target.parentNode;
    }

    let modalElement = document.getElementById('modal-task');
    let taskTitle = modalElement.querySelector('.modal-title');
    let taskPriority = modalElement.querySelector('.priority-task > span');
    let taskColumn = modalElement.querySelector('.column-task > select');
    let taskDeadline = modalElement.querySelector('.deadline-task > kbd');
    let taskDescription = modalElement.querySelector('.description-task');
    let taskExecutor = modalElement.querySelector('.executor span');
    modalElement.classList.add('active');

    modalElement.addEventListener('click', closeModal);
    function closeModal() {
        if(event.target.hasAttribute('aria-label')) {
            modalElement.classList.remove('active');
            // Remove class from priority
            taskPriority.classList.remove('label-error', 'label-warning', 'label-success');

            // Remove Comments
            let allComments = modalElement.querySelectorAll('blockquote');
            let arrayAllComment = Array.from(allComments);

            arrayAllComment = arrayAllComment.filter((comment) => {
                if(comment.getAttribute('data-lvl-comment') === '1') return comment;
            });
            
            arrayAllComment.forEach(function (commentBlock) {
                document.getElementById('comments').removeChild(commentBlock);
            });

            // Remove select list column
            let allSelectOptionsColumn = taskColumn.querySelectorAll('option');
            allSelectOptionsColumn.forEach((option) => {
                option.remove();
            });
        }
    }

    // Task Name
    taskTitle.innerHTML = task.name;

    // Task Priority
    taskPriority.innerHTML = task.priority;
    if(task.priority === 'High') taskPriority.classList.add('label-error');
    if(task.priority === 'Medium') taskPriority.classList.add('label-warning');
    if(task.priority === 'Low') taskPriority.classList.add('label-success');

    // Change column for task
    taskColumn.onchange = function () {
        let selectedIndex = taskColumn.options.selectedIndex;
        let selectedValue = taskColumn.options[selectedIndex].value;

        let objCreate = {
            related_column: selectedValue
        };

        let csrftoken = getCookie('csrftoken');
        let option = {
            method: 'PATCH',
            headers: {
                'X-CSRFToken': csrftoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(objCreate)
        };

        request(`http://127.0.0.1:8000/api-desks/${getCookie('desk_id')}/columns/${getCookie('column_id')}/tasks/${getCookie('task_id')}/`, option, requireCallBackChangeColumn);

        function requireCallBackChangeColumn(result) {
            notification(result.status);
            result.json()
                .then((resolve) => {
                    return resolve
                })
                .then((taskInnerColumn) => {
                    if (result.status === 200) changeColumnForTask(task, taskInnerColumn);
                })
        }

    };

    // Task Select Column
    task.columns.forEach(function (column) {
        let option;
        option = new Option(column.name, column.id);
        if(column.id === task.related_column) {
            option = new Option(column.name, column.id, true, true);
        }
        taskColumn.appendChild(option);
    });

    // Task Deadline
    taskDeadline.innerHTML = task.task_deadline;

    // Task Description
    taskDescription.innerHTML = task.description;
    
    // Task Executor
    let userExecutor = task.users.filter(function (user) {
        if(task.current_executor === user.user_id) return user;
    });
    taskExecutor.innerHTML = userExecutor[0].username;

    //  Task Comments
    // Request for list comments
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
    request(`http://127.0.0.1:8000/api-desks/${getCookie('desk_id')}/columns/${getCookie('column_id')}/tasks/${task.id}/comments/`, option, callBackCommentsList);

    function callBackCommentsList(result) {
        result.json()
            .then((resolve) => {
                return resolve
            })
            .then((result) => {
                buildingComents(result);
            })
    }
}

function buildingComents(comments) {
    let commentsElement = document.getElementById('comments');
    // Array/Obj
    if (comments instanceof Array) {
        // Comments lvl 1
        comments.forEach(function (comment, i) {
            let lvl_Copy = document.getElementById('lvl-1').cloneNode(true);

            // User Name
            lvl_Copy.querySelector('cite > span').innerHTML = comment.author;

            // Comment text
            lvl_Copy.querySelector('p').innerHTML = comment.comment_body;

            // Comment ID
            lvl_Copy.setAttribute('data-comment-id', comment.id);

            // Comment lvl
            lvl_Copy.setAttribute('data-lvl-comment', 1);

            // Append element
            lvl_Copy.id = `lvl-1-${i}`;
            lvl_Copy.style.display = 'block';
            commentsElement.appendChild(lvl_Copy);

            // Reply
            lvl_Copy.querySelector('.btn-link').id = `btn-create-comment-reply-${comment.id}`;
            document.getElementById(`btn-create-comment-reply-${comment.id}`).addEventListener('click', createReplyComment);

            // Comments lvl 2
            comment.related_comment.forEach(function (comment) {
                let lvl_Copy_2 = document.getElementById('lvl-1').cloneNode(true);

                // User Name
                lvl_Copy_2.querySelector('cite > span').innerHTML = comment.author;

                // Comment text
                lvl_Copy_2.querySelector('p').innerHTML = comment.comment_body;

                // Comment lvl
                lvl_Copy_2.setAttribute('data-lvl-comment', 2);

                // Reply remove
                lvl_Copy_2.querySelector('.btn-link').remove();

                lvl_Copy_2.id = `lvl-2-${i}`;
                lvl_Copy_2.style.display = 'block';
                lvl_Copy_2.style.margin = '2rem 40px 30px 0';
                lvl_Copy.appendChild(lvl_Copy_2);
            })
        })
    } else {
        let lvl_Copy = document.getElementById('lvl-1').cloneNode(true);

        if(!comments.is_child) {
            // User Name
            lvl_Copy.querySelector('cite > span').innerHTML = comments.author;

            // Comment text
            lvl_Copy.querySelector('p').innerHTML = comments.comment_body;

            // Comment ID
            lvl_Copy.setAttribute('data-comment-id', comments.id);

            // Comment lvl
            lvl_Copy.setAttribute('data-lvl-comment', 1);

            // Append element
            lvl_Copy.id = `lvl-1-${comments.id}`;
            lvl_Copy.style.display = 'block';
            commentsElement.appendChild(lvl_Copy);

            // Reply
            lvl_Copy.querySelector('.btn-link').id = `btn-create-comment-reply-${comments.id}`;
            document.getElementById(`btn-create-comment-reply-${comments.id}`).addEventListener('click', createReplyComment);
        } else {
            // User Name
            lvl_Copy.querySelector('cite > span').innerHTML = comments.author;

            // Comment text
            lvl_Copy.querySelector('p').innerHTML = comments.comment_body;

            // Comment ID
            lvl_Copy.setAttribute('data-comment-id', comments.id);

            // Comment lvl
            lvl_Copy.setAttribute('data-lvl-comment', 2);

            // Append element
            lvl_Copy.id = `lvl-1-${comments.id}`;
            lvl_Copy.style.display = 'block';
            lvl_Copy.style.margin = '2rem 40px 30px 0';
            commentsElement.querySelectorAll('blockquote').forEach((blockquote) => {
                if (blockquote.getAttribute('data-comment-id') === String(comments.parent)) blockquote.appendChild(lvl_Copy);
            });

            // Reply
            // Reply remove
            lvl_Copy.querySelector('.btn-link').remove();
            
        }


    }
}
