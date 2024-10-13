const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const logoutButton = document.getElementById('logout-button');

async function loadTasks() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/tasks', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.error('Erro ao carregar tarefas:', response.status);
        const errorText = await response.text();
        console.error('Detalhes do erro:', errorText);
        return;
    }

    const tasks = await response.json();

    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.status === 'completed' ? 'completed' : 'pending'}`;
        li.textContent = task.title;

        const completeButton = document.createElement('button');
        completeButton.innerHTML = task.status === 'pending'
            ? '<span class="check-icon">&#x25CB;</span>'
            : '<span class="check-icon">&#x2713;</span>';

        completeButton.className = 'complete-button';
        completeButton.addEventListener('click', async () => {
            const newStatus = task.status === 'pending' ? 'completed' : 'pending';
            await updateTaskStatus(task.id, newStatus);
            loadTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', async () => {
            await deleteTask(task.id);
            loadTasks();
        });

        li.insertBefore(completeButton, li.firstChild);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

async function updateTaskStatus(id, status) {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
  });

  if (!response.ok) {
      console.error('Erro ao atualizar tarefa:', response.status);
      const errorText = await response.text();
      console.error('Detalhes do erro:', errorText);
  }
}


async function deleteTask(id) {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

async function addTask(title) {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title })
    });

    if (response.ok) {
        loadTasks();
    } else {
        console.error('Erro ao adicionar tarefa');
    }
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/front/pages/login.html';
}

taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = taskTitleInput.value.trim();

    if (title) {
        await addTask(title);
        taskTitleInput.value = '';
    } else {
        alert('Por favor, insira um título para a tarefa.');
    }
});

// Escuta o evento de clique no botão de logout
logoutButton.addEventListener('click', logout);

// Chama a função para carregar as tarefas assim que a página for carregada
loadTasks();
