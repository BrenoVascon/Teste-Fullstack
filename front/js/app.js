const taskList = document.getElementById('task-list'); // Certifique-se que o ID está correto
const taskForm = document.getElementById('task-form'); // Formulário de adição de tarefa
const taskTitleInput = document.getElementById('task-title'); // Campo de input da tarefa
const logoutButton = document.getElementById('logout-button'); // Botão de logout

async function loadTasks() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/api/tasks', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const tasks = await response.json();

  taskList.innerHTML = ''; // Limpa a lista antes de carregar novas tarefas

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.status === 'completed' ? 'completed' : 'pending'}`; // Adiciona a classe correta
    li.textContent = task.title;

    // Botão para marcar como concluída
    const completeButton = document.createElement('button');
    completeButton.textContent = task.status === 'pending' ? 'Marcar como completa' : 'Marcar como pendente';
    completeButton.addEventListener('click', async () => {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      await updateTaskStatus(task.id, newStatus);
      loadTasks(); // Recarrega as tarefas
    });

    // Botão para deletar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.addEventListener('click', async () => {
      await deleteTask(task.id);
      loadTasks(); // Recarrega as tarefas
    });

    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

async function updateTaskStatus(id, status) {
  const token = localStorage.getItem('token');
  await fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status }) // Sending status to update
  });
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

// Função para adicionar uma nova tarefa
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
        // Tarefa adicionada com sucesso, recarrega a lista de tarefas
        loadTasks();
    } else {
        console.error('Erro ao adicionar tarefa');
    }
}

// Função de logout
function logout() {
    localStorage.removeItem('token');
    window.location.href = '/front/pages/login.html';
}

// Escuta o evento de envio do formulário para adicionar nova tarefa
taskForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página

    const title = taskTitleInput.value.trim(); // Pega o valor do input

    if (title) {
        await addTask(title); // Adiciona a tarefa
        taskTitleInput.value = ''; // Limpa o campo de input
    } else {
        alert('Por favor, insira um título para a tarefa.');
    }
});

// Escuta o evento de clique no botão de logout
logoutButton.addEventListener('click', logout);

// Chama a função para carregar as tarefas assim que a página for carregada
loadTasks();
