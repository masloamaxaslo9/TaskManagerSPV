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
            let allComents = modalElement.querySelectorAll('blockquote');
            allComents.forEach(function (commentBlock, i) {
                if (i === 0) return;
                document.getElementById('comments').removeChild(commentBlock);
            })
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
    // ...

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

                console.log(comment);
                // User Name
                lvl_Copy_2.querySelector('cite > span').innerHTML = comment.author;

                // Comment text
                lvl_Copy_2.querySelector('p').innerHTML = comment.comment_body;

                // Reply
                lvl_Copy.querySelector('.btn-link').id = `btn-create-comment-reply-${comment.id}`;





                lvl_Copy_2.id = `lvl-2-${i}`;
                lvl_Copy_2.style.display = 'block';
                lvl_Copy.appendChild(lvl_Copy_2);
                console.log(comment);
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

            // Append element
            lvl_Copy.id = `lvl-1-${comments.id}`;
            lvl_Copy.style.display = 'block';
            lvl_Copy.style.margin = '2rem 40px 30px 0';
            commentsElement.querySelectorAll('blockquote').forEach((blockquote, i) => {
                console.log(blockquote);
                console.log(blockquote.getAttribute('data-comment-id'));
                if (blockquote.getAttribute('data-comment-id') === String(comments.parent)) blockquote.appendChild(lvl_Copy);
            });

            // Reply
            // lvl_Copy.querySelector('.btn-link').id = `btn-create-comment-reply-${comments.id}`;
            // document.getElementById(`btn-create-comment-reply-${comments.id}`).addEventListener('click', createReplyComment);

            console.log(comments);
            console.log(lvl_Copy);
        }


    }
}