const taskList = document.getElementById('task-list'); // Certifique-se que o ID está correto
const taskForm = document.getElementById('task-form'); // Formulário de adição de tarefa
const taskTitleInput = document.getElementById('task-title'); // Campo de input da tarefa
const logoutButton = document.getElementById('logout-button'); // Botão de logout

// Função para carregar as tarefas
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

    // Botão para marcar como concluída com ícone
    const completeButton = document.createElement('button');
    completeButton.innerHTML = task.status === 'pending'
      ? '<span class="check-icon">&#x25CB;</span>'  // Círculo vazio para pendente
      : '<span class="check-icon">&#x2713;</span>'; // Checkmark para completo

    completeButton.className = 'complete-button'; // Adiciona a classe de estilo
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

    li.insertBefore(completeButton, li.firstChild); // Insere o botão de completar antes do texto da tarefa
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Função para atualizar o status da tarefa
async function updateTaskStatus(id, status) {
  const token = localStorage.getItem('token');
  await fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status })
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
