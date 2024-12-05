// TODO: Add any JavaScript here to make your page fancy :)

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('task-form');
    console.log("form element:", form)
    if (form) {
        console.log('form passed')
        form.addEventListener('submit', async (event) => {
            console.log("submit event fired");
            event.preventDefault();
            const taskInput = document.getElementById('task-input');
            const task = taskInput.value.trim();
            console.log(task);
            if (task) {
                try {
                    console.log("task passed")
                    const response = await fetch('/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `task=${encodeURIComponent(task)}`,
                    })
                    if (response.ok) {
                        taskInput.value = '';
                        window.location.reload();
                    }
                    else {
                        console.error('Failed to add task');
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    }

    const deleteForm = document.querySelectorAll('form[action="/delete"]');
    deleteForm.forEach((form) => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const id = formData.get('id');
            const response = await fetch('/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `id=${encodeURIComponent(id)}`,
            });
            if (response.ok) {
                window.location.reload();
            }
            else {
                console.error('Failed to delete task');
            }
        });
    });
});


