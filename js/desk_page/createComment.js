
document.getElementById('btn-create-comment').addEventListener('click', createComment.bind(null, 'createComment'));


function createComment(action, obj) {
    let objCreate;

    if (action === 'createComment') {
        objCreate = {
            comment_body: document.getElementById('input-task-comment').value
        };
    } else if (action === 'replyComment') {
        objCreate = obj;
    }

    // Request for create comments
    let csrftoken = getCookie('csrftoken');
    let option = {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(objCreate)
    };
    request(`http://127.0.0.1:8000/api-desks/${getCookie('desk_id')}/columns/${getCookie('column_id')}/tasks/${getCookie('task_id')}/comments/create/`, option, callBackCommentsCreate);

    function callBackCommentsCreate(result) {
        result.json()
            .then((resolve) => {
                return resolve
            })
            .then((result) => {
                buildingComents(result);
                document.forms.formCreateComment.reset();
            })
    }
}

// Reply Comment

function createReplyComment() {
    // Show/Hide Form reply
    this.previousElementSibling.classList.toggle('active');
    this.classList.add('hide');

    let n = 0;
    this.previousElementSibling.querySelector('button').addEventListener('click', () => {
        n ++;
        if(n >= 2) return;
        let objCreate = {
            comment_body: this.previousElementSibling.querySelector('input').value,
            is_child: true,
            parent: this.parentElement.getAttribute('data-comment-id')
        };
        createComment('replyComment', objCreate);
        this.previousElementSibling.classList.toggle('active');
        this.classList.remove('hide');
    });
}
